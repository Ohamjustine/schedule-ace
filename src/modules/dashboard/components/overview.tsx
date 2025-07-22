"use client";

import React from "react";
import { useAuth } from "@/modules/auth/hooks/use-auth";

export default function Overview() {
  const { user } = useAuth();


  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          Welcome {user?.firstname || "User"},
        </h1>
      </div>

      {/* Top Row - Daily Task Overview and Upcoming Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Task Overview */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Daily Task Overview
            </h2>
            <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
              2
            </span>
          </div>
          <div className="space-y-3">
            <div className="text-sm text-gray-600 font-medium">
              Task for today
            </div>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                Finish 2 Chapters
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                Do assignments and submit before 6pm
              </li>
            </ul>
          </div>
        </div>

        {/* Upcoming Tasks/Deadline */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Upcoming Tasks/Deadline
          </h2>
          <div className="text-sm text-gray-600">
            <div className="font-medium mb-2">Next 3 days</div>
            <div className="text-gray-500">No upcoming deadlines</div>
          </div>
        </div>
      </div>

      {/* Middle Row - Quick Add, Goals, Notifications */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Quick Add */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Quick Add
          </h2>
          <div className="flex flex-wrap gap-2">
            <button className="bg-orange-100 hover:bg-orange-200 text-orange-800 px-3 py-2 rounded-lg text-sm font-medium transition-colors">
              +Task
            </button>
            <button className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-3 py-2 rounded-lg text-sm font-medium transition-colors">
              📅 Event
            </button>
            <button className="bg-green-100 hover:bg-green-200 text-green-800 px-3 py-2 rounded-lg text-sm font-medium transition-colors">
              📝 Note
            </button>
          </div>
        </div>

        {/* Goals */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Goals</h2>
          <div className="space-y-3">
            <div className="text-sm text-gray-600">5 Goals added</div>
            <div className="flex gap-2">
              <span className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-medium">
                +Add
              </span>
              <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-medium">
                View
              </span>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Notifications
            </h2>
            <span className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-medium">
              +Add
            </span>
          </div>
          <div className="text-sm text-gray-500">No new notifications</div>
        </div>
      </div>

      {/* Bottom Row - Productivity Insights */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Productivity Insights
        </h2>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            Number of tasks completed weekly
          </li>
          <li className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            Productive Days
          </li>
          <li className="flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            Average time spent on tasks
          </li>
        </ul>
      </div>
    </div>
  );
}
