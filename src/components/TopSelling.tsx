"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Product } from "../../types/products";
import { client } from "@/sanity/lib/client";
import {  selling } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import { addToCart } from "@/app/actions/action";
import Swal from 'sweetalert2'


const NewArrival = () => {
  const [product, setProduct] = useState<Product[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    async function fetchProduct() {
      const fetchedProduct: Product[] = await client.fetch(selling);
      setProduct(fetchedProduct);
    }
    fetchProduct();
  }, []);

  const handleAddToCart = (e: React.MouseEvent, product:Product)=>{
    e.preventDefault()
    Swal.fire({
      position:"top-right",
      icon: "success",
      title: `${product.name} added to cart`,
      showConfirmButton : false,
      timer : 1000
    })
    addToCart(product)
  }

  if (!isClient) return null; // Avoid rendering on the server

  return (
    <div id='top-selling' className="max-w-7xl mx-auto px-4 py-8"> {/* Changed to max-w-7xl */}
      <h1 className="text-4xl font-extrabold mb-6 md:mt-10 text-center">
        TOP SELLING
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-9">
        {product.map((product) => (
          <div
            key={product._id}
            className="border rounded-lg shadow-md p-4 hover:shadow-lg transition duration-200"
          >
             <Link href={`/products/${product.slug.current}`}>
            {product.image ? (
              <Image
                src={urlFor(product.image).url()}
                alt={product.name}
                width={400}
                height={300} // Adjusted height for better aspect ratio
                className="w-full h-80 object-cover rounded-md" // Adjusted height
              />
            ) : (
              <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded-md">
                <span>No Image</span>
              </div>
            )}
            <h1 className="text-lg font-bold mt-4">{product.name}</h1>
            <p className="mt-2 font-bold">{product.price}<span className="text-gray-400 font-bold line-through ml-2">{product.discountPercent}</span></p>
            </Link>
            <Link href={`/products/${product.slug.current}`}>
            <button className="bg-black text-white font-semibold w-full py-3 rounded-lg shadow-md hover:shadow-lg hover:scale-110 transition-transform duration-200 ease-in-out mt-3" onClick={(e) => handleAddToCart(e, product)}>
                Add To Cart
              </button>
            </Link>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-7">
        <Link href={'/shop'}>
        <button className="py-4 w-48 rounded-full px-7 bg-white border shadow-sm hover:bg-gray-100 transition duration-200">
          View All
        </button>
        </Link>
       
      </div>
    </div>
  );
};

export default NewArrival;