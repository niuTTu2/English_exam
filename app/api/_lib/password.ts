export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_MAX_LENGTH = 128;
export const PASSWORD_ITERATIONS = 100_000;

export class PasswordResetRequiredError extends Error {
  constructor() {
    super("请先通过邮箱验证码登录，再重新设置密码。");
    this.name = "PasswordResetRequiredError";
  }
}

export function isValidPassword(value: unknown): value is string {
  return typeof value === "string" && value.length >= PASSWORD_MIN_LENGTH && value.length <= PASSWORD_MAX_LENGTH;
}

function toHex(bytes: Uint8Array) {
  return Array.from(bytes, (value) => value.toString(16).padStart(2, "0")).join("");
}

async function derivePassword(password: string, salt: Uint8Array<ArrayBuffer>, iterations = PASSWORD_ITERATIONS) {
  const key = await crypto.subtle.importKey(
    "raw", new TextEncoder().encode(password), "PBKDF2", false, ["deriveBits"],
  );
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", hash: "SHA-256", salt, iterations }, key, 256,
  );
  return toHex(new Uint8Array(bits));
}

export async function hashPassword(password: string) {
  if (!isValidPassword(password)) throw new Error("密码长度须为 8—128 个字符。");
  const salt = crypto.getRandomValues(new Uint8Array(16));
  return `pbkdf2-sha256$${PASSWORD_ITERATIONS}$${toHex(salt)}$${await derivePassword(password, salt)}`;
}

export async function verifyPassword(password: string, encoded: string) {
  if (!isValidPassword(password)) return false;
  const match = /^pbkdf2-sha256\$(100000|600000)\$([a-f0-9]{32})\$([a-f0-9]{64})$/.exec(encoded);
  if (!match) return false;
  const iterations = Number(match[1]);
  const salt = Uint8Array.from(match[2].match(/.{2}/g) ?? [], (pair) => parseInt(pair, 16));
  let candidate: string;
  try {
    candidate = await derivePassword(password, salt, iterations);
  } catch (error) {
    if (iterations !== PASSWORD_ITERATIONS && error instanceof Error && error.name === "NotSupportedError") {
      throw new PasswordResetRequiredError();
    }
    throw error;
  }
  let difference = 0;
  for (let index = 0; index < candidate.length; index += 1) {
    difference |= candidate.charCodeAt(index) ^ match[3].charCodeAt(index);
  }
  return difference === 0;
}
