import { pgTable, text, integer, timestamp, customType } from "drizzle-orm/pg-core";

const bytea = customType<{ data: Buffer; default: false }>({
  dataType() {
    return "bytea";
  },
});

export const photosTable = pgTable("photos", {
  id: text("id").primaryKey(),
  mimeType: text("mime_type").notNull(),
  byteSize: integer("byte_size").notNull(),
  bytes: bytea("bytes").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type Photo = typeof photosTable.$inferSelect;
