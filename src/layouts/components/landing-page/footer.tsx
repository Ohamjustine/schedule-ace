import React, { Fragment } from "react";
import Image from "next/image";
import NewsletterBanner from "./newsletter-banner";
import CTABanner from "./cta-banner";
import Link from "next/link";

export default function Footer() {
  return (
    <Fragment>
      <CTABanner />
      <NewsletterBanner />
      <footer className="w-full flex flex-col items-center border p-4 bg-white">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between py-4 gap-4 w-[90%] md:w-[85%]">
          {/* Left: Logo */}
          <div className="flex justify-center items-center">
            <Image
              src="/assets/logo.png"
              alt="Schedule Ace Logo"
              width={200}
              height={250}
            />
          </div>

          {/* Nav Links */}
          <div className="flex flex-col items-center md:items-start justify-center gap-4 text-sm text-gray-700 ">
            <Link href="/about-us" className="underline">
              About Us
            </Link>
            <Link href="/contact-us" className="underline">
              Contact Us
            </Link>
            <Link href="/features" className="underline">
              Features
            </Link>
            <Link href="/how-it-works" className="underline">
              How it works
            </Link>
          </div>

          {/* Socials as text links */}
          <div className="flex flex-col items-center md:items-start  justify-center gap-4 text-sm text-gray-700 ">
            <a href="#" className="underline">
              Facebook
            </a>
            <a href="#" className="underline">
              Instagram
            </a>
            <a href="#" className="underline">
              Email
            </a>
            <a href="#" className="underline">
              LinkedIn
            </a>
          </div>

          <div className="flex flex-col items-center md:items-start  justify-center gap-4 text-sm text-gray-700 ">
            <Link href="/privacy-policy" className="underline">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="underline">
              Terms & Conditions
            </Link>
          </div>
        </div>

        {/* Bottom: Copyright */}
        <div className="w-full font-semibold flex border-t pt-4 justify-center mt-4 text-sm text-gray-600">
          Copyright <span className="inline-block align-middle mx-1">©</span>
          2025 Schedule Ace.
        </div>
      </footer>
    </Fragment>
  );
}
