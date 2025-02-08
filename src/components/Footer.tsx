import React from 'react';
import { FaFacebook, FaGithub, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#F0F0F0] w-full py-12 relative ">
      <div className="container mx-auto px-4">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Info */}
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-4">SHOP.CO</h2>
            <p className="text-sm text-center md:text-left mb-4">
              We have clothes that suit your style and which you are proud to wear. From women to men.
            </p>
            {/* Social Icons */}
            <div className="flex space-x-4">
              <a href="#" aria-label="Instagram">
                <FaInstagram className="text-xl hover:text-gray-700" />
              </a>
              <a href="#" aria-label="GitHub">
                <FaGithub className="text-xl hover:text-gray-700" />
              </a>
              <a href="#" aria-label="Twitter">
                <FaTwitter className="text-xl hover:text-gray-700" />
              </a>
              <a href="#" aria-label="Facebook">
                <FaFacebook className="text-xl hover:text-gray-700" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            {/* Company */}
            <ul className="space-y-2">
              <h2 className="text-lg font-semibold">Company</h2>
              <li><a href="#" className="text-sm hover:text-gray-700">About Us</a></li>
              <li><a href="#" className="text-sm hover:text-gray-700">Our Services</a></li>
              <li><a href="#" className="text-sm hover:text-gray-700">Privacy Policy</a></li>
              <li><a href="#" className="text-sm hover:text-gray-700">Terms & Conditions</a></li>
            </ul>

            {/* Support */}
            <ul className="space-y-2">
              <h2 className="text-lg font-semibold">Support</h2>
              <li><a href="#" className="text-sm hover:text-gray-700">FAQ</a></li>
              <li><a href="#" className="text-sm hover:text-gray-700">Contact Us</a></li>
              <li><a href="#" className="text-sm hover:text-gray-700">Shipping</a></li>
              <li><a href="#" className="text-sm hover:text-gray-700">Returns</a></li>
            </ul>

            {/* Community */}
            <ul className="space-y-2">
              <h2 className="text-lg font-semibold">Community</h2>
              <li><a href="#" className="text-sm hover:text-gray-700">Blog</a></li>
              <li><a href="#" className="text-sm hover:text-gray-700">Forums</a></li>
              <li><a href="#" className="text-sm hover:text-gray-700">Events</a></li>
              <li><a href="#" className="text-sm hover:text-gray-700">Partners</a></li>
            </ul>

            {/* Legal */}
            <ul className="space-y-2">
              <h2 className="text-lg font-semibold">Legal</h2>
              <li><a href="#" className="text-sm hover:text-gray-700">Privacy</a></li>
              <li><a href="#" className="text-sm hover:text-gray-700">Terms</a></li>
              <li><a href="#" className="text-sm hover:text-gray-700">Cookies</a></li>
              <li><a href="#" className="text-sm hover:text-gray-700">Licenses</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t pt-8 text-center">
          <p className="text-sm">© 2022 Shop.CO. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;