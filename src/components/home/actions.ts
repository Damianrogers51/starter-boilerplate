import { brands, items } from "@/db/localdb";

export function getBrandsAction() {
  return brands.filter((brand) => brand.display);
}

export function getItemsAction(tag: "baggy_denim"|"basics"|"boxy_hoodies") {
  console.log(tag)
  
  return (
    items.filter((item) => item.tags.includes(tag))
      .map((item) => {
        const brand = brands.find((brand) => brand.id == item.brand)!
        return ({...item, brandData: brand})
      })
  )
}