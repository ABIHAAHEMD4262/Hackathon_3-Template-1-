"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Product } from "../../types/products";
import { client } from "@/sanity/lib/client";
import { selling } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";


const TopSelling = () => {
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

  if (!isClient) return null; // Avoid rendering on the server

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-extrabold mb-6 md:mt-10 text-center">
        TOP SELLING
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-9">
        {product.map((product) => (
          <div
            key={product._id}
            className="border rounded-lg shadow-md p-4 hover:shadow-lg transition duration-200"
          >
          
            {product.image ? (
              <Image
                src={urlFor(product.image).url()}
                alt={product.name}
                width={400}
                height={200}
                className="w-full h-64 object-cover rounded-md"
              />
            ) : (
              <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded-md">
                <span>No Image</span>
              </div>
            )}
            <h1 className="text-lg font-bold mt-4">{product.name}</h1>
            <p className="mt-2 font-bold">{product.price}<span className="text-gray-400 font-bold line-through ml-2">{product.discountPercent}</span></p>
           
            
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-7">
        <button className="py-4 w-48 rounded-full px-7 bg-white border shadow-sm">
          View All
        </button>
      </div>
    </div>
  );
};

export default TopSelling;
