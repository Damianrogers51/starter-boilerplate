import FilterLink from "@/components/home/FilterLink";
import { getBrandsAction } from "@/components/home/actions";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const brands = await getBrandsAction()

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
        <FilterLink href="/"> Baggy Denim </FilterLink>
        <FilterLink href="/"> Basics </FilterLink>
      </div>

      <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-x-6 gap-y-8 size-full">
        {brands.map((brand) => (
          <div key={brand.id} className="leading-[1.2] space-y-2">
            <Link href="https://instagram.com/discontd" target="_blank" className="block relative w-full aspect-[4/3] group">
              <Image src={brand.images[0]} alt={`Cover image for ${brand.name}`} className="object-cover object-center rounded-lg" fill />
              <Image src={brand.images[1]} alt={`Product image for ${brand.name}`} className="absolute top-0 left-0 object-cover object-center group-hover:opacity-100 opacity-0 transition duration-200 rounded-lg z-10" fill />
            </Link>

            <div className="flex items-center space-x-2">
              <div>
              {brand.thumbnail.length != 0 && (
                <Image src={brand.thumbnail} alt={`Thumbnail image for ${brand}`} className="rounded-full" width={36} height={36} /> 
              )}
              {brand.thumbnail.length == 0 && (
                <div className="flex items-center justify-center size-[31.2px] backdrop-brightness-105 font-medium text-xs rounded-full select-none">{brand.name[0].toUpperCase()}</div>
              )}
              </div>

              <div className="w-full">
                <div className="w-full flex">
                  <h3 className="grow font-medium tracking-[-.5px]"> {brand.name} </h3>
                  <span className="font-light tracking-[-1px] opacity-80"> {brand.followers} K </span>
                </div>
                <Link href={`https://instagram.com/${brand.instagram}`} target="_blank" className="font-light tracking-[-.5px] opacity-80"> @{brand.instagram} </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
