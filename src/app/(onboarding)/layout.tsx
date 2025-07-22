import React, { ReactNode } from "react";

export default function OnboardingLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#E7F0FD] flex items-center justify-center relative">
      {/* Left Illustration */}
      <div className="hidden md:block absolute left-8 top-24">
        <img
          src="/assets/illustrations/auth_1.png"
          alt="illustration left"
          className="w-56"
        />
      </div>
      {/* Right Illustration */}
      <div className="hidden md:block absolute right-8 bottom-12">
        <img
          src="/assets/illustrations/auth_2.png"
          alt="illustration right"
          className="w-64"
        />
      </div>
      <div className="w-full flex items-center justify-center z-10">
        {children}
      </div>
    </div>
  );
}
