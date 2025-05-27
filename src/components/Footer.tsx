import { Link } from 'lucide-react';
import React from 'react';


const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-800">
    {/* Newsletter */}
    <div className="bg-black text-white py-10 px-4 rounded-lg mx-4 mt-10 md:mx-16 lg:mx-32">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <h2 className="text-2xl md:text-3xl font-extrabold text-center md:text-left">
          STAY UP TO DATE ABOUT OUR LATEST OFFERS
        </h2>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-2 rounded-full text-black w-64"
          />
          <button className="bg-white text-black px-6 py-2 rounded-full font-semibold hover:bg-gray-200 transition">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  
    {/* Main Footer */}
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
      {/* SHOP.CO */}
      <div>
        <h3 className="text-2xl font-bold mb-4">SHOP.CO</h3>
        <p className="text-sm mb-4">
          We have clothes that suit your style and which you are proud to wear. From women to men.
        </p>
        <div className="flex space-x-4 text-lg">
          <Link href="#"><i className="fab fa-instagram"></i></Link>
          <Link href="#"><i className="fab fa-github"></i></Link>
          <Link href="#"><i className="fab fa-twitter"></i></Link>
          <Link href="#"><i className="fab fa-facebook"></i></Link>
        </div>
      </div>
  
      {/* Company */}
      <div>
        <h4 className="font-bold mb-3">Company</h4>
        <ul className="space-y-2 text-sm">
          <li>About Us</li>
          <li>Our Services</li>
          <li>Privacy Policy</li>
          <li>Terms & Conditions</li>
        </ul>
      </div>
  
      {/* Support */}
      <div>
        <h4 className="font-bold mb-3">Support</h4>
        <ul className="space-y-2 text-sm">
          <li>FAQ</li>
          <li>Contact Us</li>
          <li>Shipping</li>
          <li>Returns</li>
        </ul>
      </div>
  
      {/* Community */}
      <div>
        <h4 className="font-bold mb-3">Community</h4>
        <ul className="space-y-2 text-sm">
          <li>Blog</li>
          <li>Forums</li>
          <li>Events</li>
          <li>Partners</li>
        </ul>
      </div>
    </div>
  
    {/* Bottom */}
    <div className="border-t text-center text-sm py-4 text-gray-500">
      © 2025 Shop.CO. All rights reserved.
    </div>
  </footer>
  
  );
};

export default Footer;