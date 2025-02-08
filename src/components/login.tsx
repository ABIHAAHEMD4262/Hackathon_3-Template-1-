"use client";

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

const LogIn = () => {
  return (
    <div className="flex flex-col lg:flex-row w-full h-screen bg-white">
      {/* Left Section - Image */}
      <div
        className="hidden lg:flex lg:w-1/2 bg-cover bg-center relative"
        style={{ backgroundImage: "url('/HeroImage.png')" }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="flex flex-col items-center justify-center w-full h-full text-white p-10 relative">
          <h1 className="text-5xl font-bold">Welcome to SHOP.CO</h1>
          <p className="text-lg mt-2">Discover exclusive deals and latest trends!</p>
        </div>
      </div>

      {/* Right Section - Login Form */}
      <div className="w-full lg:w-1/2 mt-6 flex flex-col justify-center p-8 lg:px-8 bg-white shadow-lg rounded-lg">
        <SignedIn>
          <div className="text-center">
            <UserButton />
            <h1 className="text-3xl font-bold mt-4">Welcome</h1>
            <p className="mt-4 text-lg text-gray-700">
              Use coupon <span className="font-bold text-red-500">SAVE20</span> to get a $50 discount on your first order!
            </p>
          </div>
        </SignedIn>
        <SignedOut>
        <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Login</h1>
        <form>
          <div className="mb-4">
            <label className="block font-medium text-gray-700">Email Address</label>
            <input
              className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:border-red-500"
              type="email"
              placeholder="Enter your email address"
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium text-gray-700">Password</label>
            <div className="relative">
              <input
                className="mt-1 block w-full border border-gray-300 rounded-md p-3 pr-10 focus:outline-none focus:border-red-500"
                type="password"
                placeholder="Enter your password"
              />
              <span className="absolute right-3 top-3 text-gray-500 cursor-pointer">
                👁️ {/* This can be replaced with an actual eye icon */}
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span className="text-gray-700 text-sm">Remember Me</span>
            </label>
            <Link href="#" className="text-sm text-gray-600 hover:text-red-500">
              Forgot Password?
            </Link>
          </div>
        </form>

        <div className="text-center bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-all duration-300 cursor-pointer">
         
            <SignInButton mode="modal" />
         
        </div>

        <p className="text-center mt-4 text-gray-600">
          New here?{" "}
          <Link href="#" className="text-red-500 font-bold hover:underline">
            Create an account
          </Link>
        </p>
        </SignedOut>
      </div> 
    </div>
  );
};

export default LogIn;
