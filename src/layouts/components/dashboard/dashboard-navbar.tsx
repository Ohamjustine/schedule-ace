import React from "react";
import { useAuth } from "@/modules/auth/hooks/use-auth";

export default function DashboardNavbar({
  onMenuClick,
}: {
  onMenuClick?: () => void;
}) {
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="w-full h-16 md:h-20 flex items-center justify-between px-4 md:px-6 bg-white border-b border-gray-200 shadow-sm">
      {/* Left: Mobile menu button and title */}
      <div className="flex items-center gap-4">
        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          onClick={onMenuClick}
        >
          <svg
            className="w-6 h-6 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Page title - hidden on mobile when logo is in sidebar */}
        <h1 className="text-xl md:text-2xl font-semibold text-gray-800">
          Dashboard
        </h1>
      </div>

      {/* Right: User info and logout */}
      <div className="flex items-center gap-3 md:gap-4">
        {/* User greeting - hidden on small screens */}
        {user && (
          <span className="hidden sm:block text-sm md:text-base text-gray-600">
            Welcome, {user.firstname}
          </span>
        )}

        {/* Logout button */}
        <button
          onClick={handleLogout}
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 md:px-4 md:py-2 rounded-lg font-medium text-sm md:text-base transition-colors"
        >
          Log Out
        </button>

        {/* User avatar */}
        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-blue-100 flex items-center justify-center">
          <span className="text-blue-600 font-semibold text-sm md:text-base">
            {user?.firstname?.charAt(0) || "U"}
          </span>
        </div>
      </div>
    </header>
  );
}
