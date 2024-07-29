import Image from "next/image"
import Link from "next/link"

import { SelectBrand, SelectItem } from "@/db/schema"

interface SelectItemWithBrand extends SelectItem {
  brandData: SelectBrand
}

export default function Items(props: {
  items: Array<SelectItemWithBrand>
}) {
  return (
    props.items.map((item) => (
      <div key={item.id} className="leading-[1.2] space-y-2">
        <Link href={item.link} target="_blank" className="block relative w-full aspect-[3/4] group">
          <Image
            src={item.images[0]}
            alt={`Product image for ${item.name}`}
            className="object-cover object-center"
            fill />
          <Image
            src={item.images[1]}
            alt={`Product image for ${item.name}`}
            className="absolute top-0 left-0 object-cover object-center group-hover:opacity-100 opacity-0 transition duration-200 z-10" 
            fill />
        </Link>

        <div className="flex items-center space-x-2">
          <div>
            {item.brandData.thumbnail.length != 0 && (
              <Image
                src={item.brandData.thumbnail}
                alt={`Thumbnail image for ${item.brand}`}
                className="rounded-full"
                width={36}
                height={36} /> 
            )}
            {item.brandData.thumbnail.length == 0 && (
              <div 
                className="flex items-center justify-center size-[31.2px] backdrop-brightness-105 font-medium text-xs rounded-full select-none">
                  {item.brandData.name[0].toUpperCase()}
              </div>
            )}
          </div>

          <div className="w-full">
            <div className="w-full flex">
              <h3 className="grow font-medium tracking-[-.5px]"> {item.brandData.name} </h3>
              <span className="font-light tracking-[-1px] opacity-80"> {item.brandData.followers} K </span>
            </div>

            <div className="font-light tracking-[-.5px] opacity-80"> {item.name} </div>
          </div>
        </div>
      </div>
    ))
  )
}