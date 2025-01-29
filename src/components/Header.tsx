import Link from 'next/link'
import React from 'react'
import { CiSearch } from "react-icons/ci";
import { FaShoppingCart } from 'react-icons/fa';
import { RiAccountCircleLine } from "react-icons/ri";
import { SheetSide } from './sheet';
import { NavigationMenuDemo } from './NavigationMenu';

const Header = () => {
  return (
    <header className="w-full h-[60px] bg-white flex justify-between items-center  ">
        {/*Left */}
      <div className='flex justify-center items-center'>
      <SheetSide/>
        <Link href={"/"}><h1 className=' text-2xl sm:text-3xl font-extrabold pl-5'>SHOP.CO</h1></Link>
      </div>
      {/*Navbar*/}
      <ul className='hidden md:block ' >
        <li className='space-x-5 flex items-center'>
        <Link href={"/"}><NavigationMenuDemo/></Link>
        <Link href={"/"}>On Sale</Link>
        <Link href={"/"}>New Arrival</Link>
        <Link href={"/"}>Brands</Link>
        </li>
      </ul>
      {/* Search Input */}
      
      <div className='flex justify-start items-center w-[330px] h-[40px] rounded-[62px] bg-gray-400 shadow-sm relative'>
        <CiSearch className='text-xl absolute left-3'/>
        <input placeholder='search items...' className='w-full pl-10 outline-none h-full rounded-[62px]'></input>
      </div>
      

      {/* Cart */}
      <div className='flex items-center mr-7 space-x-5'>
      <CiSearch className='text-2xl ml-2 md:hidden font-semibold'/>
        <FaShoppingCart className='text-2xl'/>
        <RiAccountCircleLine className='text-2xl'/>
      </div>
    </header>
  )
}

export default Header