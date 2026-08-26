import { desc, eq } from "drizzle-orm";

import { getDb } from "../../../../db";
import { loginCodes } from "../../../../db/schema";
import {
  emailServiceReady,
  hashLoginCode,
  isAllowedEmail,
  isEmail,
  normalizeEmail,
  randomDigits,
  runtimeConfig,
} from "../../_lib/auth";

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as { email?: string };
    const email = normalizeEmail(payload.email ?? "");
    if (!isEmail(email)) {
      return Response.json({ error: "请输入有效邮箱地址。" }, { status: 400 });
    }
    if (!emailServiceReady()) {
      return Response.json(
        { error: "邮件服务尚未配置；目前可继续使用本机模式。", code: "EMAIL_NOT_CONFIGURED" },
        { status: 503 },
      );
    }

    const config = runtimeConfig();
    if (!isAllowedEmail(email)) {
      return Response.json({ error: "该邮箱没有此个人应用的访问权限。" }, { status: 403 });
    }

    const now = Date.now();
    const [recent] = await getDb()
      .select({ createdAt: loginCodes.createdAt })
      .from(loginCodes)
      .where(eq(loginCodes.email, email))
      .orderBy(desc(loginCodes.createdAt))
      .limit(1);
    if (recent && recent.createdAt > now - 60_000) {
      return Response.json({ error: "请等待一分钟后再获取验证码。" }, { status: 429 });
    }

    const requestId = crypto.randomUUID();
    const code = randomDigits();
    const codeHash = await hashLoginCode(requestId, email, code);
    await getDb().insert(loginCodes).values({
      id: requestId,
      email,
      codeHash,
      expiresAt: now + 10 * 60_000,
      attempts: 0,
      createdAt: now,
    });

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.RESEND_API_KEY}`,
        "Content-Type": "application/json",
        "Idempotency-Key": `login-${requestId}`,
      },
      body: JSON.stringify({
        from: config.EMAIL_FROM,
        to: [email],
        subject: "真题句读登录验证码",
        text: `你的登录验证码是 ${code}。验证码 10 分钟内有效，请勿转发。`,
        html: `<div style="font-family:system-ui,sans-serif;max-width:480px;margin:auto;padding:28px"><h2 style="color:#1c5555">真题句读</h2><p>你的登录验证码是：</p><p style="font-size:32px;font-weight:700;letter-spacing:8px;color:#176b68">${code}</p><p style="color:#667">验证码 10 分钟内有效，请勿转发。</p></div>`,
      }),
    });

    if (!emailResponse.ok) {
      await getDb().delete(loginCodes).where(eq(loginCodes.id, requestId));
      return Response.json({ error: "验证码发送失败，请稍后再试。" }, { status: 502 });
    }

    return Response.json({ requestId, expiresIn: 600 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected error";
    return Response.json({ error: `暂时无法发送验证码：${message}` }, { status: 500 });
  }
}
