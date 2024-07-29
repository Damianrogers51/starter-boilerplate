import Image from "next/image"
import Link from "next/link"

import { SelectBrand } from "@/db/schema"

export default function Brands(props: {
  brands: Array<SelectBrand>
}) {
  return (
    props.brands.map((brand, index) => (
      <div key={brand.id} className="leading-[1.2] space-y-2 transition-opacity animate-slide-up" style={{
        animationDelay: `${index * .75}s`
      }}>
        <Link href={brand.website} target="_blank" className="block relative w-full aspect-[4/3] group">
          <Image
            src={brand.images[0]}
            alt={`Cover image for ${brand.name}`}
            className="object-cover object-center"
            fill />

          <Image
            src={brand.images[1]}
            alt={`Product image for ${brand.name}`}
            className="absolute top-0 left-0 object-cover object-center group-hover:opacity-100 opacity-0 transition duration-200 z-10" 
            fill />
        </Link>

        <div className="flex items-center space-x-2">
          <div>
            {brand.thumbnail.length != 0 && (
              <Image
                src={brand.thumbnail}
                alt={`Thumbnail image for ${brand}`}
                className="rounded-full"
                width={36}
                height={36} /> 
            )}
            {brand.thumbnail.length == 0 && (
              <div 
                className="flex items-center justify-center size-[31.2px] backdrop-brightness-105 font-medium text-xs rounded-full select-none">
                  {brand.name[0].toUpperCase()}
              </div>
            )}
          </div>

          <div className="w-full">
            <div className="w-full flex">
              <h3 className="grow font-medium tracking-[-.5px]"> {brand.name} </h3>
              <span className="font-light tracking-[-1px] opacity-80"> {brand.followers} K </span>
            </div>

            <Link
              href={`https://instagram.com/${brand.instagram}`}
              target="_blank" className="font-light tracking-[-.5px] opacity-80"> 
                @{brand.instagram}
            </Link>
          </div>
        </div>
      </div>
    ))
  )
}