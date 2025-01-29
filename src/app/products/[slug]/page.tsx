import { client } from "@/sanity/lib/client";
import { Product } from "../../../../types/products";
import { groq } from "next-sanity";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";


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
  const { slug } =await params;

  if (!slug) {
    return <p>Slug is missing. Please ensure the URL is correct.</p>;
  }

  const product = await getProduct(slug);

  if (!product) {
    return <p>Product not found!</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 mt-9">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Image Section */}
        <div className="aspect-square">
          {product.image && (
            <Image
              src={urlFor(product.image).url()}
              alt={product.name}
              width={500}
              height={500}
              className="rounded-lg shadow-md"
            />
          )}
        </div>

        {/* Product Details Section */}
        <div className="space-y-4">
          {/* Product Name */}
          <h1 className="text-4xl font-extrabold">{product.name}</h1>

          
          {/* Price and Discount */}
          <div className="flex items-center space-x-4">
            {product.discountPercent && (
              <span className="text-lg font-medium text-gray-500 line-through">
                ${(product.price + (product.price * product.discountPercent) / 100).toFixed(2)}
              </span>
            )}
            <span className="text-2xl font-semibold text-blue-600">
              ${product.price.toFixed(2)}
            </span>
            {product.discountPercent && (
              <span className="text-sm text-red-500">
                {product.discountPercent}% OFF
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-gray-800">{product.description}</p>

          {/* Category */}
          <p className="text-gray-600">
            <span className="font-medium">Category:</span> {product.category}
          </p>

          {/* New Tag */}
          {product.new && (
            <span className="inline-block px-3 py-1 text-sm font-semibold text-white bg-green-500 rounded-full">
              New
            </span>
          )}

          {/* Available Colors */}
          {product.colors?.length > 0 && (
            <div>
              <p className="font-semibold text-lg text-gray-700 mt-4">
                Available Colors:
              </p>
              <div className="flex gap-1 mt-3">
                {product.colors.map((color: string) => (
                  <div
                    key={color}
                    className="w-9 h-9 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Available Sizes */}
          {product.sizes?.length > 0 && (
            <div>
              <p className="font-semibold text-lg text-gray-700">Choose Size:</p>
              <div className="flex space-x-2 mt-2 gap-2">
                {product.sizes.map((size: string) => (
                  <span
                    key={size}
                    className="px-9 py-2 border border-gray-300 bg-gray-300 rounded-full cursor-pointer hover:bg-black hover:text-white"
                  >
                    {size}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Add to Cart Button */}
          <button className="mt-6 px-14 py-3 bg-black text-white text-lg rounded-full hover:bg-gray-700 transition">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
