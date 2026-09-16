export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_MAX_LENGTH = 128;
export const PASSWORD_ITERATIONS = 600_000;

export function isValidPassword(value: unknown): value is string {
  return typeof value === "string" && value.length >= PASSWORD_MIN_LENGTH && value.length <= PASSWORD_MAX_LENGTH;
}

function toHex(bytes: Uint8Array) {
  return Array.from(bytes, (value) => value.toString(16).padStart(2, "0")).join("");
}

async function derivePassword(password: string, salt: Uint8Array<ArrayBuffer>) {
  const key = await crypto.subtle.importKey(
    "raw", new TextEncoder().encode(password), "PBKDF2", false, ["deriveBits"],
  );
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", hash: "SHA-256", salt, iterations: PASSWORD_ITERATIONS }, key, 256,
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
  const match = /^pbkdf2-sha256\$600000\$([a-f0-9]{32})\$([a-f0-9]{64})$/.exec(encoded);
  if (!match) return false;
  const salt = Uint8Array.from(match[1].match(/.{2}/g) ?? [], (pair) => parseInt(pair, 16));
  const candidate = await derivePassword(password, salt);
  let difference = 0;
  for (let index = 0; index < candidate.length; index += 1) {
    difference |= candidate.charCodeAt(index) ^ match[2].charCodeAt(index);
  }
  return difference === 0;
}
