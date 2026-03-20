import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const items = sqliteTable("items", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  notes: text("notes"),
  fileKey: text("file_key"),
  fileName: text("file_name"),
  fileType: text("file_type"),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
});
