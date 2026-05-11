import { pgTable, text, serial, timestamp, date } from "drizzle-orm/pg-core";

export const galleryEventsTable = pgTable("gallery_events", {
  id: serial("id").primaryKey(),
  titleEn: text("title_en").notNull(),
  titleTe: text("title_te").notNull().default(""),
  titleHi: text("title_hi").notNull().default(""),
  descriptionEn: text("description_en").notNull().default(""),
  descriptionTe: text("description_te").notNull().default(""),
  descriptionHi: text("description_hi").notNull().default(""),
  eventDate: date("event_date").notNull(),
  category: text("category").notNull(),
  photoUrls: text("photo_urls").array().notNull().default([]),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export type GalleryEvent = typeof galleryEventsTable.$inferSelect;
