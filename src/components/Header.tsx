"use client"; // Required for client-side interactions

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { CiSearch } from "react-icons/ci";
import { FaShoppingCart } from 'react-icons/fa';
import { RiAccountCircleLine } from "react-icons/ri";
import { SheetSide } from './sheet';
import { client } from "@/sanity/lib/client"; // Import your sanity client

interface Product {
  _id: string;
  name: string;
  slug: { current: string };
}

const Header = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  // Fetch products from Sanity
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const query = `*[_type == "products"]{ _id, name, slug }`;
        const data: Product[] = await client.fetch(query);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on search term
  useEffect(() => {
    if (!searchTerm) {
      setFilteredProducts([]);
      return;
    }

    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  return (
    <header className="w-full h-[60px] bg-white flex justify-between items-center">
      {/* Left */}
      <div className='flex justify-center items-center'>
        <SheetSide />
        <Link href={"/"}>
          <h1 className='text-2xl sm:text-3xl font-extrabold pl-5'>SHOP.CO</h1>
        </Link>
      </div>

      {/* Navbar */}
      <ul className='hidden md:block'>
        <li className='space-x-5 flex items-center'>
          <Link href={"/shop"}>Shop</Link>
          <Link href={"/#top-selling"}>Top Selling</Link>
          <Link href={"/#new-arrival"}>New Arrival</Link>
          <Link href={"/shop"}>Brands</Link>
        </li>
      </ul>

      {/* Search Input */}
      <div className='relative flex justify-start items-center w-[330px] h-[40px] rounded-[62px] bg-white shadow-sm'>
        <CiSearch className='text-xl absolute left-3 text-black' />
        <input
          type="text"
          placeholder='Search items...'
          className='w-full pl-10 outline-none h-full rounded-[62px] bg-transparent'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        {/* Dropdown Search Results */}
        {filteredProducts.length > 0 && (
          <div className="absolute top-12 left-0 w-full bg-white shadow-md rounded-lg z-50">
            {filteredProducts.map((product) => (
              <Link key={product._id} href={`/products/${product.slug.current}`}>
                <div className="p-2 hover:bg-gray-200 cursor-pointer">
                  {product.name}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Cart */}
      <div className='flex items-center mr-7 space-x-5'>
        <CiSearch className='text-2xl ml-2 md:hidden font-semibold' />
        <Link href={'/cart'}><FaShoppingCart className='text-2xl' /></Link>
        <RiAccountCircleLine className='text-2xl' />
      </div>
    </header>
  );
};

export default Header;
