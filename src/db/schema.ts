import { 
  pgTable,
  serial, 
  varchar, 
  integer,
} from "drizzle-orm/pg-core";

/** Example Scehma */
export const item = pgTable("item", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 128 }).notNull(),
  price: integer("price").notNull(),
  link: varchar("link", { length: 128 }).notNull(),
  images: varchar("images", { length: 1024 }).array().notNull(),
})
export type InsertItem = typeof item.$inferInsert
export type SelectItem = typeof item.$inferSelect