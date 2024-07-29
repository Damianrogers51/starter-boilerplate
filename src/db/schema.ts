import { 
  pgTable,
  pgEnum, 
  serial, 
  varchar, 
  integer,
  boolean,
} from "drizzle-orm/pg-core";

/** Enum of potential item tags. */

export const tagsEnum = pgEnum("tags", [
  "baggy_denim",
  "basics",
  "boxy_hoodies",
]);

/** Contains information pertaining to brands. */

export const brand = pgTable("brand", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 128 }).notNull(),
  value: varchar("value", { length: 128 }).notNull(),
  instagram: varchar("instagram", { length: 128 }).notNull(),
  followers: integer("followers").notNull(),
  website: varchar("website", { length: 256 }).notNull(),
  thumbnail: varchar("thumbnail", { length: 1024 }).notNull(),
  images: varchar("images", { length: 1024 }).array().notNull(),
  display: boolean("display").default(true).notNull()
})
export type InsertBrand = typeof brand.$inferInsert
export type SelectBrand = typeof brand.$inferSelect


/** 
 * Contains information pertaining to items.
 * Each item is linked to a brand. 
 */ 

export const item = pgTable("item", {
  id: serial("id").primaryKey(),
  brand: integer("brand_id").notNull().references(() => brand.id).unique().notNull(),
  name: varchar("name", { length: 128 }).notNull(),
  price: integer("price").notNull(),
  link: varchar("link", { length: 128 }).notNull(),
  images: varchar("images", { length: 1024 }).array().notNull(),
  tags: tagsEnum("tags").array().notNull(),
})
export type InsertItem = typeof item.$inferInsert
export type SelectItem = typeof item.$inferSelect