import { eq } from "drizzle-orm";

import { getDb } from "../../../../db";
import { sessions, userPasswords } from "../../../../db/schema";
import {
  emailServiceReady,
  getSessionUser,
  hashSessionToken,
  passwordServiceReady,
  readCookie,
  SESSION_COOKIE,
  sessionCookie,
} from "../../_lib/auth";

export async function GET(request: Request) {
  try {
    const user = await getSessionUser(request);
    let passwordConfigured = passwordServiceReady();
    let hasPassword = false;
    if (passwordConfigured) {
      try {
        const [credential] = await getDb().select({ userId: userPasswords.userId })
          .from(userPasswords).where(eq(userPasswords.userId, user?.id ?? "")).limit(1);
        hasPassword = Boolean(credential);
      } catch {
        passwordConfigured = false;
      }
    }
    return Response.json({
      configured: emailServiceReady(),
      passwordConfigured,
      user: user ? { email: user.email, hasPassword } : null,
    }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return Response.json({ configured: emailServiceReady(), passwordConfigured: false, user: null },
      { headers: { "Cache-Control": "no-store" } });
  }
}

export async function DELETE(request: Request) {
  try {
    const token = readCookie(request, SESSION_COOKIE);
    if (token) {
      await getDb().delete(sessions).where(eq(sessions.tokenHash, await hashSessionToken(token)));
    }
  } catch {
    // Clearing the browser cookie is still useful if storage is temporarily unavailable.
  }
  return Response.json(
    { ok: true },
    { headers: { "Set-Cookie": sessionCookie("", 0) } },
  );
}
