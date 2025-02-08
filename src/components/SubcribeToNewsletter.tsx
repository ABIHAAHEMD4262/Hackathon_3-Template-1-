"use client";
import React, { useState } from "react";


const SubscribeToNewsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    console.log(`Subscribed with email: ${email}`);
  };

  return (
    <main className="w-full flex justify-center items-center px-4 ">
      <div className="w-full md:h-55 max-w-6xl bg-black text-white flex flex-col md:flex-row items-center p-6 md:p-8 rounded-2xl">
        {/* Heading */}
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-center md:text-left mb-4 md:mb-0">
          STAY UP TO DATE ABOUT OUR LATEST OFFERS
        </h1>

        {/* Input & Button */}
        <div className="w-full md:w-auto flex flex-col  items-center md:ml-auto gap-2">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full md:w-[250px] p-2 rounded-full px-5 text-black outline-none"
          />
          <button
            onClick={handleSubscribe}
            className="bg-white text-black py-2 px-6 md:px-12 rounded-full font-semibold"
          >
            Subscribe
          </button>
        </div>
      </div>
    </main>
  );
};

export default SubscribeToNewsletter;
