"use client";

import React, { useState } from "react";
import DashboardNavbar from "./dashboard-navbar";
import DashboardSidebar from "./dashboard-sidebar";

export const DashboardLayoutWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Sidebar - Fixed */}
      <aside className="hidden md:block fixed top-0 left-0 w-64 h-screen bg-white border-r border-gray-200 shadow-sm z-40">
        <DashboardSidebar />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setSidebarOpen(false)}
          />
          {/* Sidebar */}
          <aside className="absolute left-0 top-0 h-full w-64 bg-white shadow-xl animate-slide-in">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <img
                src="/assets/logo.png"
                alt="Schedule Ace Logo"
                className="w-32"
              />
              <button
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                onClick={() => setSidebarOpen(false)}
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
            <div className="pt-4">
              <DashboardSidebar />
            </div>
          </aside>
        </div>
      )}

      {/* Main Content Area */}
      <div className="md:ml-64">
        {/* Fixed Navbar */}
        <div className="fixed top-0 left-0 md:left-64 right-0 z-30">
          <DashboardNavbar onMenuClick={() => setSidebarOpen(true)} />
        </div>

        {/* Page Content */}
        <main className="pt-16 md:pt-22 p-4 md:p-6 min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
};
