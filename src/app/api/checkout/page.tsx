"use client";
import React, { useEffect, useState } from "react";
import { Product } from "../../../../types/products";
import { getCartItems } from "../../actions/action";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const Checkout = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [discount, setDiscount] = useState<number>(0);
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    zipCode: "",
    city: "",
  });

  const [formErrors, setFormErrors] = useState({
    firstName: false,
    lastName: false,
    email: false,
    phone: false,
    address: false,
    zipCode: false,
    city: false,
  });

  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setCartItems(getCartItems());
  
    // Ensure localStorage discount is applied
    const appliedDiscount = localStorage.getItem("appliedDiscount");
    if (appliedDiscount && !isNaN(Number(appliedDiscount))) {
      setDiscount(Number(appliedDiscount));
    } else {
      setDiscount(0);
    }
  }, []);
  

  const subTotal = cartItems.reduce((total, item) => total + item.price * item.inventory, 0);
  const total = subTotal - discount;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [e.target.id]: e.target.value,
    });
  };

  const validateForm = () => {
    const errors = {
      firstName: !formValues.firstName,
      lastName: !formValues.lastName,
      email: !formValues.email,
      phone: !formValues.phone,
      address: !formValues.address,
      zipCode: !formValues.zipCode,
      city: !formValues.city,
    };
    setFormErrors(errors);
    return Object.values(errors).every((error) => !error);
  };

  const handlePlaceOrder = async () => {
    if (validateForm()) {
      setIsPlacingOrder(true); // Start loading
      try {
        const response = await fetch('/api/createOrder', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            shippingDetails: formValues,
            cartItems: cartItems.map((item) => ({
              _id: item._id, // Product ID
              name: item.name, // Product name
              image: item.image, // Product image
              price: item.price, // Product price
              inventory: item.inventory, // Quantity in the cart
            })),
            total: total,
            discount: discount,
          }),
        });
        if (response.ok) {
          Swal.fire({
            title: 'Order Placed!',
            text: 'Your order has been placed successfully.',
            icon: 'success',
            confirmButtonText: 'Continue Shopping',
          }).then(() => {
            localStorage.removeItem('appliedDiscount'); // Clear discount only after order is placed
            router.push('/');
          });
        }
         else {
          Swal.fire({
            title: 'Error!',
            text: 'Failed to place order. Please try again.',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        }
      } catch (error) {
        console.error('Error placing order:', error);
        Swal.fire({
          title: 'Error!',
          text: 'An error occurred. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      } finally {
        setIsPlacingOrder(false); // Stop loading
      }
    } else {
      Swal.fire({
        title: 'Validation Error',
        text: 'Please fill out all required fields correctly.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
    
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link href="/cart" className="hover:text-gray-900 transition-colors duration-200">
            Cart
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-900 font-medium">Checkout</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Order Summary Section */}
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Order Summary</h2>
            {cartItems.length > 0 ? (
              <div className="space-y-6">
                {cartItems.map((item) => (
                  <div key={item._id} className="flex items-center justify-between group">
                    <div className="flex items-center space-x-4">
                      {item.image && (
                        <div className="relative w-20 h-20 overflow-hidden rounded-lg">
                          <Image
                            src={urlFor(item.image).url()}
                            alt={item.name}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                      )}
                      <div>
                        <h3 className="font-medium text-gray-900">{item.name}</h3>
                        <p className="text-sm text-gray-500">Quantity: {item.inventory}</p>
                      </div>
                    </div>
                    <p className="font-medium text-gray-900">${(item.price * item.inventory).toFixed(2)}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No items in the cart.</p>
            )}

            {/* Order Total */}
            <div className="mt-8 border-t pt-6">
              <div className="flex justify-between text-gray-700 mb-2">
                <span>Subtotal</span>
                <span>${subTotal.toFixed(2)}</span>
              </div>
             
              <div className="flex justify-between text-gray-900 font-bold text-lg mt-4">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Checkout Form Section */}
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Shipping Details</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    value={formValues.firstName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border ${
                      formErrors.firstName ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200`}
                    placeholder="John"
                  />
                  {formErrors.firstName && (
                    <p className="text-sm text-red-500 mt-2">First name is required</p>
                  )}
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    value={formValues.lastName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border ${
                      formErrors.lastName ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200`}
                    placeholder="Doe"
                  />
                  {formErrors.lastName && (
                    <p className="text-sm text-red-500 mt-2">Last name is required</p>
                  )}
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formValues.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border ${
                    formErrors.email ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200`}
                  placeholder="john.doe@example.com"
                />
                {formErrors.email && (
                  <p className="text-sm text-red-500 mt-2">Email is required</p>
                )}
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone
                </label>
                <input
                  type="text"
                  id="phone"
                  value={formValues.phone}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border ${
                    formErrors.phone ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200`}
                  placeholder="+1234567890"
                />
                {formErrors.phone && (
                  <p className="text-sm text-red-500 mt-2">Phone is required</p>
                )}
              </div>
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  value={formValues.address}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border ${
                    formErrors.address ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200`}
                  placeholder="123 Main St"
                />
                {formErrors.address && (
                  <p className="text-sm text-red-500 mt-2">Address is required</p>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    value={formValues.city}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border ${
                      formErrors.city ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200`}
                    placeholder="New York"
                  />
                  {formErrors.city && (
                    <p className="text-sm text-red-500 mt-2">City is required</p>
                  )}
                </div>
                <div>
                  <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-2">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    id="zipCode"
                    value={formValues.zipCode}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border ${
                      formErrors.zipCode ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200`}
                    placeholder="10001"
                  />
                  {formErrors.zipCode && (
                    <p className="text-sm text-red-500 mt-2">ZIP Code is required</p>
                  )}
                </div>
              </div>
              <button
                type="button"
                onClick={handlePlaceOrder}
                disabled={isPlacingOrder}
                className="w-full bg-black text-white py-3 px-6 rounded-lg hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              >
                {isPlacingOrder ? "Placing Order..." : "Place Order"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;