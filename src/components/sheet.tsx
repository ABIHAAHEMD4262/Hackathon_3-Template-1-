"use client"
import { SlMenu } from "react-icons/sl";
import { Button } from "@/components/ui/button"
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { NavigationMenuDemo } from "./NavigationMenu";

const SHEET_SIDES = [ "left"] as const

type SheetSide = (typeof SHEET_SIDES)[number]

export function SheetSide() {
  return (
    <div className="grid  gap-2">
      {SHEET_SIDES.map((side) => (
        <Sheet key={side}>
          <SheetTrigger asChild className="md:hidden">
            <Button className="bg-white text-black">
                <SlMenu/>
          </Button>
          </SheetTrigger>
          <SheetContent side={side}>
            <SheetHeader>
              <SheetTitle>SHOP.CO</SheetTitle>
            </SheetHeader>
            <ul className='' >
        <li className='grid grid-cols-1 gap-y-4'>
        <Link href={"/"}><NavigationMenuDemo/></Link>
        <Link href={"/"}>On Sale</Link>
        <Link href={"/"}>New Arrival</Link>
        <Link href={"/"}>Brands</Link>
        </li>
      </ul>
          </SheetContent>
        </Sheet>
      ))}
    </div>
  )
}
