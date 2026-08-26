import { env } from "cloudflare:workers";
import { and, eq, gt } from "drizzle-orm";

import { getDb } from "../../../db";
import { sessions, users } from "../../../db/schema";

type RuntimeConfig = {
  RESEND_API_KEY?: string;
  EMAIL_FROM?: string;
  OWNER_EMAIL?: string;
  ALLOWED_EMAIL_DOMAINS?: string;
  OTP_PEPPER?: string;
};

export const SESSION_COOKIE = "zhenti_session";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 30;

export function runtimeConfig() {
  return env as typeof env & RuntimeConfig;
}

export function emailServiceReady() {
  const config = runtimeConfig();
  return Boolean(
    config.RESEND_API_KEY &&
      config.EMAIL_FROM &&
      (config.OWNER_EMAIL || config.ALLOWED_EMAIL_DOMAINS) &&
      config.OTP_PEPPER,
  );
}

export function normalizeEmail(value: string) {
  return value.trim().toLowerCase();
}

export function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function isAllowedEmail(value: string) {
  const email = normalizeEmail(value);
  const config = runtimeConfig();
  const allowedDomains = (config.ALLOWED_EMAIL_DOMAINS ?? "")
    .split(",")
    .map((domain) => domain.trim().toLowerCase().replace(/^@/, ""))
    .filter(Boolean);

  if (allowedDomains.length > 0) {
    const at = email.lastIndexOf("@");
    const domain = at >= 0 ? email.slice(at + 1) : "";
    return allowedDomains.includes(domain);
  }

  return Boolean(config.OWNER_EMAIL && email === normalizeEmail(config.OWNER_EMAIL));
}

export function randomDigits() {
  const values = new Uint32Array(1);
  crypto.getRandomValues(values);
  return String(values[0] % 1_000_000).padStart(6, "0");
}

export function randomToken(bytes = 32) {
  const values = new Uint8Array(bytes);
  crypto.getRandomValues(values);
  return Array.from(values, (value) => value.toString(16).padStart(2, "0")).join("");
}

export async function digest(value: string) {
  const bytes = new TextEncoder().encode(value);
  const hashed = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(hashed), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

export async function hashLoginCode(requestId: string, email: string, code: string) {
  return digest(`${requestId}:${email}:${code}:${runtimeConfig().OTP_PEPPER ?? ""}`);
}

export async function hashSessionToken(token: string) {
  return digest(`${token}:${runtimeConfig().OTP_PEPPER ?? ""}`);
}

export function readCookie(request: Request, name: string) {
  const cookies = request.headers.get("cookie") ?? "";
  for (const part of cookies.split(";")) {
    const [key, ...rest] = part.trim().split("=");
    if (key === name) return decodeURIComponent(rest.join("="));
  }
  return null;
}

export function sessionCookie(token: string, maxAge = SESSION_MAX_AGE) {
  return `${SESSION_COOKIE}=${encodeURIComponent(token)}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${maxAge}`;
}

export async function getSessionUser(request: Request) {
  const token = readCookie(request, SESSION_COOKIE);
  if (!token) return null;

  const tokenHash = await hashSessionToken(token);
  const now = Date.now();
  const [record] = await getDb()
    .select({ id: users.id, email: users.email, expiresAt: sessions.expiresAt })
    .from(sessions)
    .innerJoin(users, eq(sessions.userId, users.id))
    .where(and(eq(sessions.tokenHash, tokenHash), gt(sessions.expiresAt, now)))
    .limit(1);

  return record ?? null;
}
