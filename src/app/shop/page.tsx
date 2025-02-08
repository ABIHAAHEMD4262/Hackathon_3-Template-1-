"use client";
import React, { useState, useEffect } from "react";
import { Product } from "../../../types/products";
import { addToCart, getAllProducts } from "../actions/action";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import Swal from "sweetalert2";


const ShopPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<string>("");
  const [priceRange, setPriceRange] = useState<number>(100);
  const [size, setSize] = useState<string>("");

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getAllProducts();
      setProducts(data);
      setFilteredProducts(data);
    };
    fetchProducts();
  }, []);

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    Swal.fire({
      position: "top-right",
      icon: "success",
      title: `${product.name} added to cart`,
      showConfirmButton: false,
      timer: 1000,
    });
    addToCart(product);
  };

  useEffect(() => {
    if (!category && !size && priceRange === 100) {
      setFilteredProducts(products);
      return;
    }
    let filtered = products;
    if (category) {
      filtered = filtered.filter((product) => product.category.toLowerCase() === category.toLowerCase());
    }
    if (size) {
      filtered = filtered.filter((product) => product.sizes.includes(size));
    }
    filtered = filtered.filter((product) => product.price <= priceRange);
    setFilteredProducts(filtered);
  }, [category, priceRange, size, products]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
      {/* Sidebar Filters */}
      <div className="bg-white p-6 shadow-lg rounded-lg">
        <h2 className="text-xl font-bold mb-4">Filters</h2>

        {/* Categories */}
        <h3 className="font-semibold mb-2">Category</h3>
        <select
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border border-gray-300 px-3 py-2 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All</option>
          <option value="Shirt">Shirt</option>
          <option value="T-Shirt">T-Shirt</option>
          <option value="Jeans">Jeans</option>
          <option value="Short">Short</option>
          <option value="Hoodie">Hoodie</option>
        </select>

        {/* Price Filter */}
        <h3 className="font-semibold mb-2">Max Price: ${priceRange}</h3>
        <input
          type="range"
          min="10"
          max="500"
          value={priceRange}
          onChange={(e) => setPriceRange(Number(e.target.value))}
          className="w-full mb-4"
        />

        {/* Size Filter */}
        <h3 className="font-semibold mb-2">Size</h3>
        <select
          onChange={(e) => setSize(e.target.value)}
          className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All</option>
          <option value="S">Small</option>
          <option value="M">Medium</option>
          <option value="L">Large</option>
          <option value="XL">XL</option>
        </select>
      </div>

      {/* Product Grid */}
      <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div key={product._id} className="bg-white p-4 shadow-md rounded-lg transition-transform transform hover:scale-105">
           <Link href={`/products/${product.slug.current}`}>

              {product.image && (
                <Image
                  src={urlFor(product.image).url()}
                  className="w-full h-48 object-cover rounded-lg"
                  alt={product.name}
                  width={500}
                  height={500}
                />
              )}
            </Link>
            <h3 className="mt-3 text-lg font-semibold">{product.name}</h3>
            {product.discountPercent ? (
              <>
                <p className="text-gray-500 line-through">${product.price}</p>
                <p className="text-red-500">Now: ${product.price - (product.price * product.discountPercent) / 100}</p>
              </>
            ) : (
              <p className="text-gray-500">${product.price}</p>
            )}
            
            <Link href={`/products/${product.slug.current}`}>
              <button className="bg-black text-white font-semibold w-full py-3 rounded-lg shadow-md hover:shadow-lg hover:scale-110 transition-transform duration-200 ease-in-out mt-3" onClick={(e) => handleAddToCart(e, product)}>
                Add To Cart
              </button>
            </Link>   
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopPage;
