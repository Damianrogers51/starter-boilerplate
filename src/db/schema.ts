import { 
  pgTable, 
  serial, 
  varchar, 
  integer,
  pgEnum
} from "drizzle-orm/pg-core";

/** Enum of potential item tags. */

export const tagsEnum = pgEnum("tags", [
  "Baggy Jeans",
  "Essentials",
  "Cropped Tees",
]);

/** Contains information pertaining to brands. */

export const brand = pgTable("brand", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 128 }).notNull(),
  instagram: varchar("instagram", { length: 128 }).notNull(),
  website: varchar("website", { length: 256 }).notNull(),
  thumbnail: varchar("thumbnail", { length: 256 }).notNull(),
  images: varchar("images", { length: 256 }).array().notNull(),
})


/** 
 * Contains information pertaining to items.
 * Each item is linked to a brand. 
 */ 

export const item = pgTable("item", {
  id: serial("id").primaryKey(),
  brand: integer("brand_id").notNull().references(() => brand.id).unique().notNull(),
  link: varchar("link", { length: 128 }).notNull(),
  images: varchar("images", { length: 256 }).array().notNull(),
  tags: tagsEnum("tags").array().notNull(),
})
