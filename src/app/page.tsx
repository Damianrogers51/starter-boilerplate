import FilterLink from "@/components/home/FilterLink";
import Brands from "@/components/home/Brands";
import Items from "@/components/home/Items";
import { getBrandsAction, getItemsAction } from "@/components/home/actions";
import { SelectBrand, SelectItem } from "@/db/schema";
import { redirect } from "next/navigation";

export interface SelectItemWithBrand extends SelectItem {
  brandData: SelectBrand
}

export default async function Home({
  searchParams
}: {
  searchParams: { [key: string]: string | undefined }
}) {
  let {brands, items} = parseSearchParams()

  function parseSearchParams() {
    if (!Object.keys(searchParams).length) {
      return { brands: getBrandsAction(), items: undefined }
    }
    else if (searchParams.filter) {
      if ((searchParams.filter == "baggy_denim") ||
          (searchParams.filter == "basics") ||
          (searchParams.filter == "boxy_hoodies")) return { brands: undefined, items: getItemsAction(searchParams.filter) }

      redirect("/")
    }
    else {
      redirect("/")
    }
  }

  return (
    <div className="xl:36 lg:px-24 md:px-12 sm:px-8 px-4 space-y-8 text-sm py-8">
      <div className="flex items-center justify-center h-96">
        <div>
          <h1 className="text-6xl font-medium tracking-[-5px] text-center"> Discover the Best Baggy Jeans </h1>
          <h2 className="text-xl opacity-60 text-center"> Discover the best brands, and affordable alternatives. </h2>
        </div>
      </div>

      <div className="flex justify-center space-x-6">
        <FilterLink href="/"> Brands </FilterLink>
        <FilterLink href="/?filter=baggy_denim"> Baggy Denim </FilterLink>
        <FilterLink href="/?filter=basics"> Basics </FilterLink>
      </div>

      <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-x-6 gap-y-8 size-full">
        {brands && (
          <Brands brands={brands} />
        )}

        {items && (
          <Items items={items} />
        )}
      </div>
    </div>
  )
}
