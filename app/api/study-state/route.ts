import { and, eq, sql } from "drizzle-orm";

import { getDb } from "../../../db";
import { studyStates } from "../../../db/schema";
import { getSessionUser, isSameOrigin } from "../_lib/auth";
import { hasStudyRecords, isStudySnapshot } from "../../study-sync";
import { preserveTrainingRecords } from "../../learning-model";

function reply(body: unknown, status = 200) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

export async function GET(request: Request) {
  try {
  const user = await getSessionUser(request);
  if (!user) return reply({ error: "请先登录。" }, 401);

  const [state] = await getDb()
    .select({ payload: studyStates.payload, updatedAt: studyStates.updatedAt })
    .from(studyStates)
    .where(eq(studyStates.userId, user.id))
    .limit(1);
  return reply({ state: state ? JSON.parse(state.payload) : null, updatedAt: state?.updatedAt ?? null, accountEmail: user.email });
  } catch {
    return reply({ error: "云端记录暂时无法读取，已暂停同步，请保留本机记录。" }, 503);
  }
}

export async function PUT(request: Request) {
  if (!isSameOrigin(request)) return reply({ error: "请从本站同步学习记录。" }, 403);
  try {
  const user = await getSessionUser(request);
  if (!user) return reply({ error: "登录已过期，本机记录已保留，请重新登录。" }, 401);

  const payload = await request.json().catch(() => null) as { state?: unknown; expectedUpdatedAt?: unknown; accountEmail?: unknown } | null;
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) return reply({ error: "学习记录格式不正确，未写入云端。" }, 400);
  if (!("expectedUpdatedAt" in payload)) return reply({ error: "当前页面版本过旧，已阻止覆盖云端记录。请刷新页面后重新登录。" }, 428);
  if (payload.accountEmail !== user.email) return reply({ error: "登录账号已变化，已停止上传，请刷新后重新登录。" }, 409);
  if (!isStudySnapshot(payload.state) || !(payload.expectedUpdatedAt === null || (Number.isSafeInteger(payload.expectedUpdatedAt) && Number(payload.expectedUpdatedAt) >= 0 && Number(payload.expectedUpdatedAt) < Number.MAX_SAFE_INTEGER))) {
    return reply({ error: "学习记录或同步版本不正确，未写入云端。" }, 400);
  }
  const db = getDb();
  const backupReady = await db.get(sql`SELECT name FROM sqlite_master WHERE type = 'trigger' AND name = 'preserve_study_state'`);
  if (!backupReady) return reply({ error: "云端备份保护尚未就绪，已暂停上传，本机记录已保留。" }, 503);
  const [existing] = await db.select().from(studyStates).where(eq(studyStates.userId, user.id)).limit(1);
  if ((existing?.updatedAt ?? null) !== payload.expectedUpdatedAt) return reply({ error: "云端记录已在其他设备更新，已停止覆盖。请重试同步以合并记录。" }, 409);
  const safeState = preserveTrainingRecords(existing ? JSON.parse(existing.payload) : {}, payload.state);
  const serialized = JSON.stringify(safeState);
  if (serialized.length > 500_000) return reply({ error: "学习记录过大，请先导出备份后精简笔记。" }, 413);
  if (existing && hasStudyRecords(JSON.parse(existing.payload)) && !hasStudyRecords(payload.state)) {
    return reply({ error: "已阻止空白记录覆盖已有学习数据，请保留备份并重试同步。" }, 409);
  }
  const updatedAt = Math.max(Date.now(), Number(payload.expectedUpdatedAt ?? 0) + 1);
  const saved = existing
    ? await db.update(studyStates).set({ payload: serialized, updatedAt })
      .where(and(eq(studyStates.userId, user.id), eq(studyStates.updatedAt, payload.expectedUpdatedAt as number)))
      .returning({ updatedAt: studyStates.updatedAt })
    : await db.insert(studyStates).values({ userId: user.id, payload: serialized, updatedAt }).onConflictDoNothing().returning({ updatedAt: studyStates.updatedAt });
  if (!saved.length) return reply({ error: "云端版本已变化，本次未覆盖，请重试同步。" }, 409);
  return reply({ ok: true, updatedAt });
  } catch {
    return reply({ error: "云端保存暂不可用，本机记录已保留，请重试同步。" }, 503);
  }
}
