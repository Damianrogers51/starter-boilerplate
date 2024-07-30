import { db } from ".."
import {
  brand,
  InsertBrand,
  SelectBrand 
} from "../schema"

export async function getBrands(): Promise<Array<SelectBrand>> {
  return await db.select().from(brand)
}

export async function createBrand(data: InsertBrand): Promise<SelectBrand> {
  return (await db.insert(brand).values(data).returning())[0]
}