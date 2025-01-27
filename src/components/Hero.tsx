import React from 'react'
import Image from 'next/image'

const Hero = () => {
  return (
   <main className="w-full h-full md:h-[500px] flex flex-col md:flex-row justify-between items-start bg-white">
    {/* Left */}
    <div className="w-full md:w-1/2 mt-3 md:mt-[200px] text-center md:text-left items-center md:ml-[50px]">
        <h1 className="text-3xl md:text-6xl font-extrabold text-black">
        FIND CLOTHES THAT MATCH YOUR STYLE
        </h1>
        <p className="text-base md:text-lg text-black mt-3">
        Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.
        </p>
      <button className='bg-black py-3 px-6 rounded-full text-lg text-white mt-4 hover:bg-gray-700 transition duration-300 w-[210px] h-[54px]'>
          Shop Now
      </button>
    </div>
    {/* Right */}
    <div className='relative'>
        <Image src='/images/HeroImage.png' alt='hero image'  width={600} height={663}  className=" mr-4"/>
        <Image src='/icons/star.png' alt='star' width={56}  height={56} className=' absolute left-[-10] top-[300px] animate-bounce'/>
        <Image src='/icons/star.png' alt='star' width={104}  height={104} className=' absolute  top-[50px] right-[30px] animate-bounce'/>
    </div>
   </main>
  )
}

export default Hero;