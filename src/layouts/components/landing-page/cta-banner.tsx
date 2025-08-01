import Link from "next/link";
import React from "react";

export default function CTABanner() {
  return (
    <div className=" ">
      <div className="w-[90%] md:max-w-[65%] rounded-md py-8 my-8 md:py-12 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto text-center">
        <h2 className="text-xl md:text-3xl font-bold text-white mb-2">
          Ready to take control of your schedule?
        </h2>
        <p className="text-sm md:text-lg text-blue-100 mb-6 max-w-2xl mx-auto">
          Start using Schedule Ace today - It&apos;s Free!
        </p>
        <Link href="/sign-up">
          <button className="bg-white text-blue-600 font-semibold px-6 py-2 rounded-full hover:bg-gray-100 transition-all duration-300 cursor-pointer shadow-xl transform hover:-translate-y-1">
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
}
