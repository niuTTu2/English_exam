import { eq } from "drizzle-orm";

import { getDb } from "../../../../db";
import { sessions } from "../../../../db/schema";
import {
  emailServiceReady,
  getSessionUser,
  hashSessionToken,
  readCookie,
  SESSION_COOKIE,
  sessionCookie,
} from "../../_lib/auth";

export async function GET(request: Request) {
  try {
    const user = await getSessionUser(request);
    return Response.json({
      configured: emailServiceReady(),
      user: user ? { email: user.email } : null,
    });
  } catch {
    return Response.json({ configured: emailServiceReady(), user: null });
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
