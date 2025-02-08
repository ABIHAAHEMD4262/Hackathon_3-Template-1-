"use client";
import React, { useEffect, useState } from "react";
import { Product } from "../../../types/products";
import { getCartItems, removeCartItem, updateCartQuantity } from "../actions/action";
import Swal from "sweetalert2";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { useRouter } from "next/navigation";


const CartPage = () => {
  const [cartItem, setCartItems] = useState<Product[]>([]);
  const [voucher, setVoucher] = useState<string>(""); // Voucher Code State
  const [voucherDiscount, setVoucherDiscount] = useState<number>(0); // Discount Amount

  useEffect(() => {
    setCartItems(getCartItems());
  }, []);

  const handleRemove = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this item!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        removeCartItem(id);
        setCartItems(getCartItems());
        Swal.fire("Removed!", "Item has been removed.", "success");
      }
    });
  };

  const handleQuantityChange = (id: string, quantity: number) => {
    updateCartQuantity(id, quantity);
    setCartItems(getCartItems());
  };

  const handleIncrement = (id: string) => {
    const product = cartItem.find((item) => item._id === id);
    if (product) handleQuantityChange(id, product.inventory + 1);
  };

  const handleDecrement = (id: string) => {
    const product = cartItem.find((item) => item._id === id);
    if (product && product.inventory > 1) handleQuantityChange(id, product.inventory - 1);
  };

  // ✅ Calculate Total Price with Discount
  const calculatedTotal = () => {
    const total = cartItem.reduce((total, item) => {
      const discountAmount = (item.price * item.inventory * (item.discountPercent || 0)) / 100;
      return total + item.price * item.inventory - discountAmount;
    }, 0);
    return total - voucherDiscount;
  };

  const calculatedDiscount = () => {
    return cartItem.reduce((total, item) => {
      return total + (item.price * item.inventory * (item.discountPercent || 0)) / 100;
    }, 0);
  };

  const applyVoucher = () => {
    // Define valid vouchers
    const vouchers: { [key: string]: number } = {
      "DISCOUNT10": 10, // $10 Discount
      "SAVE20": 20, // $20 Discount
      "WINTER30": 30, // $30 Discount
    };

    if (voucher in vouchers) {
      setVoucherDiscount(vouchers[voucher]);
      Swal.fire("Success!", `Voucher Applied: -$${vouchers[voucher]}`, "success");
    } else {
      setVoucherDiscount(0);
      Swal.fire("Invalid!", "This voucher code is not valid.", "error");
    }
  };

  const router = useRouter();
  const handledProceed = () => {
    Swal.fire({
      title: "Proceed to checkout?",
      text: "Please review your cart before checkout",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, proceed!",
    }).then((result) => {
      if (result.isConfirmed) {
        router.push("/api/checkout"); // Redirect to the Checkout Page
      }
    });
  };

  return (
   
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-center mb-6">Shopping Cart</h1>

        {cartItem.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">Your cart is empty.</p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items List */}
            <div className="lg:col-span-2 space-y-6">
              {cartItem.map((item) => (
                <div key={item._id} className="flex items-center bg-white p-5 shadow-md rounded-lg">
                  {/* Product Image */}
                  {item.image && (
                    <Image
                      src={urlFor(item.image).url()}
                      className="w-24 h-24 object-cover rounded-lg"
                      alt={item.name}
                      width={96}
                      height={96}
                    />
                  )}
                  {/* Product Details */}
                  <div className="ml-5 flex-1">
                    <h2 className="text-lg font-semibold">{item.name}</h2>
                    <p className="text-gray-500">
                      ${item.price.toFixed(2)}{" "}
                      {item.discountPercent ? (
                        <span className="text-red-500 ml-2">-{item.discountPercent}% Off</span>
                      ) : null}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => handleDecrement(item._id)}
                      className="w-8 h-8 bg-gray-300 hover:bg-gray-400 text-black rounded-full flex justify-center items-center"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="text-lg font-medium">{item.inventory}</span>
                    <button
                      onClick={() => handleIncrement(item._id)}
                      className="w-8 h-8 bg-gray-300 hover:bg-gray-400 text-black rounded-full flex justify-center items-center"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => handleRemove(item._id)}
                    className="ml-6 text-red-500 hover:text-red-700"
                    aria-label="Remove item"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="bg-white p-6 shadow-lg rounded-lg">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              <div className="flex justify-between text-gray-600 mb-2">
                <span>Subtotal:</span>
                <span>${(calculatedTotal() + calculatedDiscount() + voucherDiscount).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600 mb-2">
                <span>Discount:</span>
                <span className="text-red-500">-${calculatedDiscount().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600 mb-2">
                <span>Voucher Discount:</span>
                <span className="text-green-500">-${voucherDiscount.toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-300 my-2"></div>
              <div className="flex justify-between text-lg font-semibold">
                <span>Total:</span>
                <span>${calculatedTotal().toFixed(2)}</span>
              </div>

              {/* Voucher Input */}
              <div className="mt-4 flex">
                <input
                  type="text"
                  placeholder="Enter Voucher Code"
                  className="border p-2 w-full rounded-l-md"
                  value={voucher}
                  onChange={(e) => setVoucher(e.target.value)}
                />
                <button
                  onClick={applyVoucher}
                  className="bg-black text-white px-4 py-2 rounded-r-md"
                >
                  Apply
                </button>
              </div>

              <button onClick={handledProceed} className="w-full mt-4 bg-black text-white py-3 rounded-lg">
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>

  );
};

export default CartPage;
