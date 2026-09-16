import { and, eq } from "drizzle-orm";

import { getDb } from "../../../../db";
import { loginCodes, users } from "../../../../db/schema";
import {
  createSession,
  hashLoginCode,
  isAllowedEmail,
  normalizeEmail,
} from "../../_lib/auth";

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as {
      requestId?: string;
      email?: string;
      code?: string;
    };
    const requestId = payload.requestId?.trim() ?? "";
    const email = normalizeEmail(payload.email ?? "");
    const code = payload.code?.trim() ?? "";
    if (!requestId || !/^\d{6}$/.test(code)) {
      return Response.json({ error: "请输入邮件中的 6 位验证码。" }, { status: 400 });
    }
    if (!isAllowedEmail(email)) {
      return Response.json({ error: "此邮箱暂不支持登录。" }, { status: 403 });
    }

    const db = getDb();
    const [record] = await db
      .select()
      .from(loginCodes)
      .where(and(eq(loginCodes.id, requestId), eq(loginCodes.email, email)))
      .limit(1);
    const now = Date.now();
    if (!record || record.consumedAt || record.expiresAt <= now || record.attempts >= 5) {
      return Response.json({ error: "验证码已失效，请重新获取。" }, { status: 400 });
    }

    const submittedHash = await hashLoginCode(requestId, email, code);
    await db
      .update(loginCodes)
      .set({ attempts: record.attempts + 1 })
      .where(eq(loginCodes.id, requestId));
    if (submittedHash !== record.codeHash) {
      return Response.json({ error: "验证码不正确。" }, { status: 400 });
    }

    let [user] = await db.select().from(users).where(eq(users.email, email)).limit(1);
    if (!user) {
      const id = crypto.randomUUID();
      await db.insert(users).values({ id, email, createdAt: now });
      user = { id, email, createdAt: now };
    }

    const cookie = await createSession(user.id);
    await db.update(loginCodes).set({ consumedAt: now }).where(eq(loginCodes.id, requestId));

    return Response.json(
      { user: { email: user.email } },
      { headers: { "Set-Cookie": cookie, "Cache-Control": "no-store" } },
    );
  } catch {
    return Response.json({ error: "暂时无法登录，请稍后重试。" }, { status: 500 });
  }
}
