"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

export default function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="w-full h-16 md:h-20 fixed z-30 top-0 shadow flex justify-center items-center bg-white">
      <nav className="flex items-center justify-between w-[90%] md:max-w-[85%]">
        <Link href="/">
          <Image
            src="/assets/logo.png"
            alt="Logo"
            className="w-[120px] md:w-[150px]"
            width={150}
            height={100}
          />
        </Link>
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-gray-700 hover:text-blue-500">
            Home
          </Link>
          <Link href="/features" className="text-gray-700 hover:text-blue-500">
            Features
          </Link>
          <Link
            href="/how-it-works"
            className="text-gray-700 hover:text-blue-500"
          >
            How it works
          </Link>

          <Link
            href="/testimonials"
            className="text-gray-700 hover:text-blue-500"
          >
            Testimonials
          </Link>
          <Link href="/about-us" className="text-gray-700 hover:text-blue-500">
            About Us
          </Link>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-4 text-sm cursor-pointer">
          <Link href="/login">Log In</Link>
          <Link
            href="/sign-up"
            className="bg-blue-500 hover:bg-blue-600 translate-0.5 text-white rounded-full px-4 py-2"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleSidebar}
          className="md:hidden flex flex-col justify-center items-center w-8 h-8"
        >
          <span
            className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 ${
              isSidebarOpen ? "rotate-45 translate-y-1.5" : ""
            }`}
          ></span>
          <span
            className={`block w-6 h-0.5 bg-gray-700 my-1 transition-all duration-300 ${
              isSidebarOpen ? "opacity-0" : ""
            }`}
          ></span>
          <span
            className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 ${
              isSidebarOpen ? "-rotate-45 -translate-y-1.5" : ""
            }`}
          ></span>
        </button>
      </nav>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 z-40 md:hidden ${
          isSidebarOpen ? "block" : "hidden"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black opacity-50"
          onClick={closeSidebar}
        ></div>

        {/* Sidebar */}
        <div
          className={`absolute right-0 top-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ${
            isSidebarOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full">
            {/* Sidebar Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <Image
                src="/assets/logo.png"
                alt="Logo"
                width={120}
                className="w-[100px]"
                height={60}
              />
              <button
                onClick={closeSidebar}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Sidebar Navigation */}
            <div className="flex-1 p-4">
              <div className="flex flex-col space-y-4 text-sm">
                <Link
                  href="/features"
                  className="text-gray-700 hover:text-blue-500 py-2 px-4 rounded-md hover:bg-gray-50"
                  onClick={closeSidebar}
                >
                  Features
                </Link>
                <Link
                  href="/how-it-works"
                  className="text-gray-700 hover:text-blue-500 py-2 px-4 rounded-md hover:bg-gray-50"
                  onClick={closeSidebar}
                >
                  How it works
                </Link>
                <Link
                  href="/contact-us"
                  className="text-gray-700 hover:text-blue-500 py-2 px-4 rounded-md hover:bg-gray-50"
                  onClick={closeSidebar}
                >
                  Contact
                </Link>
                <Link
                  href="/testimonials"
                  className="text-gray-700 hover:text-blue-500 py-2 px-4 rounded-md hover:bg-gray-50"
                  onClick={closeSidebar}
                >
                  Testimonials
                </Link>
                <Link
                  href="/about-us"
                  className="text-gray-700 hover:text-blue-500 py-2 px-4 rounded-md hover:bg-gray-50"
                  onClick={closeSidebar}
                >
                  About Us
                </Link>
              </div>
            </div>

            {/* Sidebar Footer */}
            <div className="p-4 border-t text-sm">
              <div className="flex flex-col space-y-3">
                <Link href="/login">
                  <button className="w-full py-2 px-4  text-gray-700 bg-gray-50 hover:text-blue-500">
                    Log In
                  </button>
                </Link>
                <Link href="/sign-up">
                  <button className="w-full bg-[#337AFF] text-white rounded-md px-4 py-2 hover:bg-blue-600 transition-colors">
                    Sign Up
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
