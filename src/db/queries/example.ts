import { db } from ".."
import {
  item,
  InsertItem,
  SelectItem, 
} from "../schema"

/** Example Queries */
export async function getItems(): Promise<Array<SelectItem>> {
  return await db.select().from(item)
}

export async function createItem(data: InsertItem): Promise<SelectItem> {
  return (await db.insert(item).values(data).returning())[0]
}