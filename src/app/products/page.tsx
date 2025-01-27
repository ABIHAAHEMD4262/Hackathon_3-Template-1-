"use client";
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { Product } from '../../../types/products'
import { client } from '@/sanity/lib/client'
import { four } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image';

const Products = () => {
    const [product, setProduct] = useState<Product[]>([])
    useEffect(()=>{
        async function fetchproduct(){
            const fetchedProduct:Product[]=await client.fetch(four)
            setProduct(fetchedProduct)
        }
        fetchproduct()
    },[])
  return (
    <div className='max-w-6xl mx-auto px-4 py-8 '>
        <h1 className='text-4xl font-extrabold mb-6 md:mt-10 text-center'>NEW ARRIVALS</h1>
        <div className='grid grid-col-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-9'>
        {product.map((product)=>(
            <div key={product._id} className='border rounded-lg shadow-md p-4 hover:shadow-lg transition duration-200 '>
                 {product.image && (
                    <Image
                    src={urlFor(product.image).url()}
                    alt='image'
                    width={200}
                    height={200}
                    className='w-full h-64 object-cover rounded-md'
                    />
                )}
                <h1 className='text-lg font-semibold mt-4'>{product.name}</h1>
                <div className='flex items-center gap-2'>
                    <span className='text-lg font-bold text-red-500'>${(product.price || 0).toFixed(2)}</span>
                    <span className='text-sm text-black line-through'>${((product.price || 0) * 5).toFixed(2)}</span>
                </div>
            </div>
        ))}
        </div>
                <button className='py-4 w-48  rounded-full px-7 bg-white border shadow-sm ml-[180px] mt-7 md:ml-[450px]'>View All</button>
    </div>
  )
}

export default Products