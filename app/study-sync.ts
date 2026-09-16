type TimedSnapshot = { updatedAt: number };

export function prepareLocalSnapshot<Snapshot extends TimedSnapshot>(
  current: Snapshot, previous: Snapshot | null, initialUpdatedAt = 0, now = Date.now(),
): Snapshot {
  if (!previous) return { ...current, updatedAt: initialUpdatedAt };
  const unchanged = JSON.stringify({ ...current, updatedAt: 0 }) === JSON.stringify({ ...previous, updatedAt: 0 });
  return { ...current, updatedAt: unchanged ? previous.updatedAt : now };
}

export async function readRemoteSnapshot<Snapshot extends TimedSnapshot>(
  readLocal: () => Snapshot | null,
  fetcher: typeof fetch = fetch,
): Promise<Snapshot | null> {
  const response = await fetcher("/api/study-state", { cache: "no-store" });
  if (!response.ok) throw new Error("云端记录暂时无法读取，本机记录已保留，暂不上传以免覆盖。请重试同步。");
  const remote = await response.json() as { state?: Snapshot | null; updatedAt?: number | null };
  if (remote.state && typeof remote.state !== "object") throw new Error("云端记录格式异常，已暂停同步。");
  const remoteTime = remote.updatedAt ?? remote.state?.updatedAt ?? 0;
  return remote.state && remoteTime > (readLocal()?.updatedAt ?? 0)
    ? { ...remote.state, updatedAt: remoteTime }
    : null;
}
