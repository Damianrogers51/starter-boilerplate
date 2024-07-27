import Link from "next/link";

export default function FilterLink(props: {
  href: string
  children: React.ReactNode
}) {
  return (
    <Link href={props.href} className="relative group font-medium tracking-[-.5px]">
      {props.children}

      <div className="h-[2px]">
        <div className="h-full bg-black hidden group-hover:block animate-slide"/>
      </div>
    </Link>
  )
}