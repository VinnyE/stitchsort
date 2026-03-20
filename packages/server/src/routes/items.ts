import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { nanoid } from "nanoid";
import { z } from "zod";
import { db } from "../db/client.js";
import { items } from "../db/schema.js";
import {
  deleteStoredFile,
  getStoredFile,
  storeUploadedFile,
} from "../services/storage.js";

const itemsRoutes = new Hono();

const createItemSchema = z.object({
  title: z.string().trim().min(1).max(200),
  notes: z.string().trim().max(10_000).optional().default(""),
});

itemsRoutes.get("/", async (c) => {
  const rows = await db.select().from(items);
  rows.sort((left, right) => right.createdAt.localeCompare(left.createdAt));
  return c.json(rows);
});

itemsRoutes.post("/", async (c) => {
  const formData = await c.req.formData();
  const parsed = createItemSchema.safeParse({
    title: formData.get("title"),
    notes: formData.get("notes"),
  });

  if (!parsed.success) {
    return c.json({ error: "Title is required" }, 400);
  }

  const upload = formData.get("file");
  const id = nanoid();
  let fileKey: string | null = null;
  let fileName: string | null = null;
  let fileType: string | null = null;

  if (upload instanceof File && upload.size > 0) {
    fileName = upload.name || "upload.bin";
    fileType = upload.type || "application/octet-stream";
    fileKey = await storeUploadedFile({
      namespace: "items",
      objectId: id,
      fileName,
      contentType: fileType,
      buffer: Buffer.from(await upload.arrayBuffer()),
    });
  }

  const now = new Date().toISOString();
  const record = {
    id,
    title: parsed.data.title,
    notes: parsed.data.notes || null,
    fileKey,
    fileName,
    fileType,
    createdAt: now,
    updatedAt: now,
  };

  await db.insert(items).values(record);

  return c.json(record, 201);
});

itemsRoutes.get("/:id/file", async (c) => {
  const id = c.req.param("id");
  const [item] = await db.select().from(items).where(eq(items.id, id)).limit(1);

  if (!item || !item.fileKey) {
    return c.json({ error: "File not found" }, 404);
  }

  const body = await getStoredFile(item.fileKey);
  return c.newResponse(Uint8Array.from(body), 200, {
    "Content-Type": item.fileType || "application/octet-stream",
    "Content-Disposition": `attachment; filename="${item.fileName || "download.bin"}"`,
  });
});

itemsRoutes.delete("/:id", async (c) => {
  const id = c.req.param("id");
  const [item] = await db.select().from(items).where(eq(items.id, id)).limit(1);

  if (!item) {
    return c.json({ error: "Item not found" }, 404);
  }

  if (item.fileKey) {
    await deleteStoredFile(item.fileKey);
  }

  await db.delete(items).where(eq(items.id, id));
  return c.json({ ok: true });
});

export { itemsRoutes };
