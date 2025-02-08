import { client } from "@/sanity/lib/client";
import { Product } from "../../../../types/products";
import { groq } from "next-sanity";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

// Fetch product based on slug
async function getProduct(slug: string): Promise<Product> {
  return client.fetch(
    groq`*[_type == "products" && slug.current == $slug][0]{
      _id,
      name,
      price,
      discountPercent,
      image,
      description,
      category,
      colors,
      sizes,
      new,
      slug
    }`,
    { slug }
  );
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  if (!slug) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500 text-lg font-semibold">
          Slug is missing. Please ensure the URL is correct.
        </p>
      </div>
    );
  }

  const product = await getProduct(slug);

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500 text-lg font-semibold">Product not found!</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {/* Image Section */}
        <div className="relative aspect-square rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
          {product.image && (
            <Image
              src={urlFor(product.image).url()}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          )}
        </div>

        {/* Product Details Section */}
        <div className="space-y-6">
          {/* Product Name */}
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">
            {product.name}
          </h1>

          {/* Price and Discount */}
          <div className="flex items-center space-x-4">
            {product.discountPercent && (
              <span className="text-lg text-gray-500 line-through">
                ${(product.price + (product.price * product.discountPercent) / 100).toFixed(2)}
              </span>
            )}
            <span className="text-3xl font-bold text-blue-600">
              ${product.price.toFixed(2)}
            </span>
            {product.discountPercent && (
              <span className="text-sm bg-red-100 text-red-600 px-2 py-1 rounded-full">
                {product.discountPercent}% OFF
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-gray-700 leading-relaxed">{product.description}</p>

          {/* Category */}
          <p className="text-gray-600">
            <span className="font-semibold">Category:</span> {product.category}
          </p>

          {/* New Tag */}
          {product.new && (
            <span className="inline-block px-3 py-1 text-sm font-semibold text-white bg-green-500 rounded-full">
              New Arrival
            </span>
          )}

          {/* Available Colors */}
          {product.colors?.length > 0 && (
            <div>
              <p className="font-semibold text-lg text-gray-800 mt-6">
                Available Colors:
              </p>
              <div className="flex gap-3 mt-3">
                {product.colors.map((color: string) => (
                  <div
                    key={color}
                    className="w-10 h-10 rounded-full border-2 border-gray-200 hover:border-blue-500 transition-all duration-200 cursor-pointer"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Available Sizes */}
          {product.sizes?.length > 0 && (
            <div>
              <p className="font-semibold text-lg text-gray-800 mt-6">
                Choose Size:
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                {product.sizes.map((size: string) => (
                  <span
                    key={size}
                    className="px-4 py-2 border border-gray-300 bg-gray-100 rounded-full cursor-pointer hover:bg-blue-500 hover:text-white transition-all duration-200"
                  >
                    {size}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Add to Cart Button */}
          <Link href={'/cart'}>
            <button className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-200 ease-in-out mt-8">
              View Checkout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}