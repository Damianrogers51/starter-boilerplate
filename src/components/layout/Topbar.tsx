import Link from "next/link";
import { FaSquareTwitter } from "react-icons/fa6";
import Icon from "./Icon";

export default function TopBar() {
  return (
    <div className="flex fixed top-0 left-0 right-0 px-4 py-2 bg-[rgb(245,245,245)] z-40">
      <div className="flex w-3/6">
        <Link href="/" className="text-xl font-medium tracking-[-1px]"> antholog-e </Link>
      </div>

      <div className="flex w-3/6 justify-end">
        <Icon>
          <FaSquareTwitter size={30} className="absolute rounded-xl z-50"/> 
        </Icon>
      </div>
    </div>
  )
}