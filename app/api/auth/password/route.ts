import { and, eq, lt, lte, or, sql } from "drizzle-orm";

import { getDb } from "../../../../db";
import { userPasswords, users } from "../../../../db/schema";
import { createSession, getSessionUser, isAllowedEmail, isEmail, isSameOrigin, normalizeEmail, passwordServiceReady } from "../../_lib/auth";
import { hashPassword, isValidPassword, verifyPassword } from "../../_lib/password";

const ATTEMPT_WINDOW = 10 * 60_000;
const MAX_ATTEMPTS = 5;
const LOGIN_ERROR = "邮箱或密码不正确。首次使用或忘记密码，请改用邮箱验证码登录。";

function failure(error: string, status: number, retryAfter?: number) {
  return Response.json({ error }, { status, headers: {
    "Cache-Control": "no-store",
    ...(retryAfter ? { "Retry-After": String(retryAfter) } : {}),
  } });
}

async function readPayload(request: Request): Promise<Record<string, unknown>> {
  const payload: unknown = await request.json().catch(() => null);
  return payload && typeof payload === "object" && !Array.isArray(payload) ? payload as Record<string, unknown> : {};
}

export async function POST(request: Request) {
  if (!isSameOrigin(request)) return failure("请从本站登录页面重试。", 403);
  if (!passwordServiceReady()) return failure("密码服务暂不可用，请稍后重试或使用邮箱验证码。", 503);
  const payload = await readPayload(request);
  if (typeof payload.email !== "string" || payload.email.length > 254 || !isEmail(payload.email.trim()) || !isValidPassword(payload.password)) {
    return failure("请输入有效邮箱和 8—128 个字符的密码。", 400);
  }
  const email = normalizeEmail(payload.email);
  if (!isAllowedEmail(email)) return failure(LOGIN_ERROR, 401);
  try {
    const db = getDb();
    const [credential] = await db.select({ userId: users.id, passwordHash: userPasswords.passwordHash })
      .from(users).innerJoin(userPasswords, eq(userPasswords.userId, users.id))
      .where(eq(users.email, email)).limit(1);
    if (!credential) return failure(LOGIN_ERROR, 401);
    const now = Date.now();
    const cutoff = now - ATTEMPT_WINDOW;
    const [attempt] = await db.update(userPasswords).set({
      failedAttempts: sql`CASE WHEN ${userPasswords.attemptWindowStartedAt} <= ${cutoff} THEN 1 ELSE ${userPasswords.failedAttempts} + 1 END`,
      attemptWindowStartedAt: sql`CASE WHEN ${userPasswords.attemptWindowStartedAt} <= ${cutoff} THEN ${now} ELSE ${userPasswords.attemptWindowStartedAt} END`,
    }).where(and(
      eq(userPasswords.userId, credential.userId),
      eq(userPasswords.passwordHash, credential.passwordHash),
      or(lt(userPasswords.failedAttempts, MAX_ATTEMPTS), lte(userPasswords.attemptWindowStartedAt, cutoff)),
    )).returning({ userId: userPasswords.userId });
    if (!attempt) return failure("尝试次数较多，请 10 分钟后重试，或使用邮箱验证码登录。", 429, 600);
    if (!await verifyPassword(payload.password, credential.passwordHash)) return failure(LOGIN_ERROR, 401);
    const reset = await db.update(userPasswords).set({ failedAttempts: 0, attemptWindowStartedAt: 0 })
      .where(and(eq(userPasswords.userId, credential.userId), eq(userPasswords.passwordHash, credential.passwordHash)))
      .returning({ userId: userPasswords.userId });
    if (reset.length === 0) return failure(LOGIN_ERROR, 401);
    return Response.json({ user: { email, hasPassword: true } }, {
      headers: { "Set-Cookie": await createSession(credential.userId), "Cache-Control": "no-store" },
    });
  } catch {
    return failure("密码登录暂不可用，请稍后重试或使用邮箱验证码。", 503);
  }
}

export async function PUT(request: Request) {
  if (!isSameOrigin(request)) return failure("请从本站账号面板设置密码。", 403);
  if (!passwordServiceReady()) return failure("密码服务暂不可用，请稍后重试。", 503);
  try {
    const user = await getSessionUser(request);
    if (!user) return failure("请先通过邮箱验证码或密码登录。", 401);
    if (!isAllowedEmail(user.email)) return failure("此账号暂不支持设置密码。", 403);
    const payload = await readPayload(request);
    if (!isValidPassword(payload.password)) return failure("密码长度须为 8—128 个字符。", 400);
    if (payload.password !== payload.confirmation) return failure("两次输入的密码不一致。", 400);
    const passwordHash = await hashPassword(payload.password);
    const values = { passwordHash, updatedAt: Date.now(), failedAttempts: 0, attemptWindowStartedAt: 0 };
    await getDb().insert(userPasswords).values({ userId: user.id, ...values })
      .onConflictDoUpdate({ target: userPasswords.userId, set: values });
    return Response.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return failure("暂时无法保存密码，请稍后重试。", 503);
  }
}
