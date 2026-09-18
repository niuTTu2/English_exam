export type AuthSession = {
  configured: boolean;
  passwordConfigured: boolean;
  passwordUnavailable?: boolean;
  user: { email: string; hasPassword?: boolean } | null;
};

type SessionFailure = "network" | "unavailable" | "invalid" | "timeout";

export class AuthSessionError extends Error {
  readonly code: SessionFailure;

  constructor(code: SessionFailure, message: string) {
    super(message);
    this.name = "AuthSessionError";
    this.code = code;
  }
}

function invalidSession(): never {
  throw new AuthSessionError("invalid", "登录服务返回的信息无法识别，请重试。本机记录已保留。");
}

function parseSession(value: unknown): AuthSession {
  if (!value || typeof value !== "object" || Array.isArray(value)) return invalidSession();
  const session = value as Record<string, unknown>;
  if (typeof session.configured !== "boolean" || typeof session.passwordConfigured !== "boolean"
      || (session.passwordUnavailable !== undefined && typeof session.passwordUnavailable !== "boolean")) {
    return invalidSession();
  }
  if (session.user !== null) {
    if (!session.user || typeof session.user !== "object" || Array.isArray(session.user)) return invalidSession();
    const user = session.user as Record<string, unknown>;
    if (typeof user.email !== "string" || user.email.length > 254
        || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)
        || (user.hasPassword !== undefined && typeof user.hasPassword !== "boolean")) return invalidSession();
  }
  return session as AuthSession;
}

/** Check availability without treating failed requests as an anonymous session. */
export async function readAuthSession({
  signal,
  timeoutMs = 12_000,
  fetcher = fetch,
}: { signal?: AbortSignal; timeoutMs?: number; fetcher?: typeof fetch } = {}): Promise<AuthSession> {
  if (signal?.aborted) throw new DOMException("Session check cancelled", "AbortError");
  const controller = new AbortController();
  let timer: ReturnType<typeof setTimeout> | undefined;
  let cancel: (() => void) | undefined;
  const interrupted = new Promise<never>((_, reject) => {
    cancel = () => {
      reject(new DOMException("Session check cancelled", "AbortError"));
      controller.abort();
    };
    signal?.addEventListener("abort", cancel, { once: true });
    timer = setTimeout(() => {
      reject(new AuthSessionError("timeout", "检查登录服务超时，请检查网络后重试。本机记录已保留。"));
      controller.abort();
    }, timeoutMs);
  });
  try {
    return await Promise.race([
      (async () => {
        const response = await fetcher("/api/auth/session", {
          cache: "no-store", credentials: "same-origin", signal: controller.signal,
        });
        if (!response.ok) throw new AuthSessionError("unavailable", "登录服务暂时无法检查，请稍后重试。本机记录已保留。");
        let value: unknown;
        try { value = await response.json(); } catch { return invalidSession(); }
        return parseSession(value);
      })(),
      interrupted,
    ]);
  } catch (error) {
    if (signal?.aborted) throw new DOMException("Session check cancelled", "AbortError");
    if (error instanceof AuthSessionError) throw error;
    throw new AuthSessionError("network", "暂时无法连接登录服务，请检查网络后重试。本机记录已保留。");
  } finally {
    clearTimeout(timer);
    if (cancel) signal?.removeEventListener("abort", cancel);
  }
}
