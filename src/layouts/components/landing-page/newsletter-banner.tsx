"use client";

import React, { useState } from "react";

export default function NewsletterBanner() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      // Here you would typically send the email to your backend
      console.log("Subscribing email:", email);
      setIsSubscribed(true);
      setEmail("");
      // Reset the success message after 3 seconds
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <div className="bg-[#E7F0FD] py-8 md:py-12">
      <div className="w-[90%] md:max-w-[80%] mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          Subscribe to our newsletter
        </h2>
        <p className="text-base text-gray-600 mb-6 max-w-xl mx-auto">
          Subscribe to our newsletter for the latest features, tips, and updates
          to help you stay organized and productive.
        </p>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              required
            />
            <button
              type="submit"
              className="bg-[#337AFF] text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300 cursor-pointer text-sm"
            >
              Subscribe
            </button>
          </div>

          {isSubscribed && (
            <p className="text-green-600 mt-3 text-xs">
              Thank you for subscribing! We&apos;ll keep you updated.
            </p>
          )}
        </form>

        <p className="text-xs text-gray-500 mt-3">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </div>
  );
}
