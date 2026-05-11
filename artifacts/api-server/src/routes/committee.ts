import { Router, type IRouter } from "express";
import { eq, asc } from "drizzle-orm";
import { db, committeeMembersTable } from "@workspace/db";
import {
  CreateCommitteeMemberBody,
  UpdateCommitteeMemberBody,
  UpdateCommitteeMemberParams,
  DeleteCommitteeMemberParams,
  UpdateCommitteeMemberResponse as CommitteeMemberSchema,
  ListCommitteeMembersResponse,
} from "@workspace/api-zod";
import { requireAdmin } from "../lib/auth";
import { serializeRow, serializeRows } from "../lib/serialize";

const router: IRouter = Router();

router.get("/committee-members", async (_req, res): Promise<void> => {
  const rows = await db
    .select()
    .from(committeeMembersTable)
    .orderBy(asc(committeeMembersTable.sortOrder), asc(committeeMembersTable.id));
  res.json(ListCommitteeMembersResponse.parse(serializeRows(rows)));
});

router.post("/committee-members", requireAdmin, async (req, res): Promise<void> => {
  const parsed = CreateCommitteeMemberBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [row] = await db
    .insert(committeeMembersTable)
    .values({
      nameEn: parsed.data.nameEn,
      nameTe: parsed.data.nameTe ?? "",
      nameHi: parsed.data.nameHi ?? "",
      roleEn: parsed.data.roleEn,
      roleTe: parsed.data.roleTe ?? "",
      roleHi: parsed.data.roleHi ?? "",
      groupKey: parsed.data.groupKey,
      sortOrder: parsed.data.sortOrder ?? 0,
    })
    .returning();
  res.status(201).json(CommitteeMemberSchema.parse(serializeRow(row)));
});

router.patch("/committee-members/:id", requireAdmin, async (req, res): Promise<void> => {
  const params = UpdateCommitteeMemberParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const parsed = UpdateCommitteeMemberBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [row] = await db
    .update(committeeMembersTable)
    .set(parsed.data)
    .where(eq(committeeMembersTable.id, params.data.id))
    .returning();
  if (!row) {
    res.status(404).json({ error: "Member not found" });
    return;
  }
  res.json(CommitteeMemberSchema.parse(serializeRow(row)));
});

router.delete("/committee-members/:id", requireAdmin, async (req, res): Promise<void> => {
  const params = DeleteCommitteeMemberParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const [row] = await db
    .delete(committeeMembersTable)
    .where(eq(committeeMembersTable.id, params.data.id))
    .returning();
  if (!row) {
    res.status(404).json({ error: "Member not found" });
    return;
  }
  res.sendStatus(204);
});

export default router;
