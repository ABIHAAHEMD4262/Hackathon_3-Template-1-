import Link from "next/link";
import React from 'react'
import {  HiX } from 'react-icons/hi';;
const AnnouncementBar = () => {
  return (
   <section className='bg-black flex w-full h-[38px] justify-center items-center relative'>
    <div className=' flex justify-center items-center' >
    <h3 className='text-white text-xs sm:text-sm '>Sign up and get 20% off to your first order.  </h3>
    <Link href={'/login'}><button className='hover:underline text-white ml-3 text-xs sm:text-sm'>Sign Up Now</button></Link>
    </div>
   
    <HiX
          className='text-white cursor-pointer absolute right-[50px] hidden sm:block text-2xl'
      
        />

   </section>
  )
}

export default AnnouncementBar