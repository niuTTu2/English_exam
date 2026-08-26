import { eq } from "drizzle-orm";

import { getDb } from "../../../db";
import { studyStates } from "../../../db/schema";
import { getSessionUser } from "../_lib/auth";

export async function GET(request: Request) {
  const user = await getSessionUser(request);
  if (!user) return Response.json({ error: "请先登录。" }, { status: 401 });

  const [state] = await getDb()
    .select({ payload: studyStates.payload, updatedAt: studyStates.updatedAt })
    .from(studyStates)
    .where(eq(studyStates.userId, user.id))
    .limit(1);
  return Response.json({ state: state ? JSON.parse(state.payload) : null, updatedAt: state?.updatedAt ?? null });
}

export async function PUT(request: Request) {
  const user = await getSessionUser(request);
  if (!user) return Response.json({ error: "请先登录。" }, { status: 401 });

  const payload = (await request.json()) as { state?: unknown };
  const serialized = JSON.stringify(payload.state ?? {});
  if (serialized.length > 500_000) {
    return Response.json({ error: "学习记录过大，请精简笔记后重试。" }, { status: 413 });
  }

  const updatedAt = Date.now();
  await getDb()
    .insert(studyStates)
    .values({ userId: user.id, payload: serialized, updatedAt })
    .onConflictDoUpdate({
      target: studyStates.userId,
      set: { payload: serialized, updatedAt },
    });
  return Response.json({ ok: true, updatedAt });
}
