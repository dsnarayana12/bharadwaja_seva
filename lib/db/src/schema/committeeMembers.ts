import {
  pgTable,
  text,
  serial,
  integer,
  timestamp,
} from "drizzle-orm/pg-core";

export const committeeMembersTable = pgTable("committee_members", {
  id: serial("id").primaryKey(),
  nameEn: text("name_en").notNull(),
  nameTe: text("name_te").notNull().default(""),
  nameHi: text("name_hi").notNull().default(""),
  roleEn: text("role_en").notNull(),
  roleTe: text("role_te").notNull().default(""),
  roleHi: text("role_hi").notNull().default(""),
  groupKey: text("group_key").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export type CommitteeMember = typeof committeeMembersTable.$inferSelect;
