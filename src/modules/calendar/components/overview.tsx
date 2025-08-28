"use client";

import { useState } from "react";
import { useCalendar } from "../hooks/use-calendar";
import { CalendarDayData } from "@/types/calendar";
import { DailyViewModal } from "./daily-view-modal";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const Overview = () => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [isDailyViewOpen, setIsDailyViewOpen] = useState(false);

  const {
    calendarData,
    loading,
    error,
    currentMonth,
    currentYear,
    navigateMonth,
  } = useCalendar();

  const handleDayClick = (dateKey: string) => {
    setSelectedDate(dateKey);
    setIsDailyViewOpen(true);
  };

  const closeDailyView = () => {
    setIsDailyViewOpen(false);
    setSelectedDate(null);
  };

  const goToToday = () => {
    const today = new Date();
    const todayString = `${today.getFullYear()}-${String(
      today.getMonth() + 1
    ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
    setSelectedDate(todayString);
    setIsDailyViewOpen(true);
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentMonth === today.getMonth() + 1 &&
      currentYear === today.getFullYear()
    );
  };

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month - 1, 1).getDay();
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="p-2"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateKey = `${currentYear}-${String(currentMonth).padStart(
        2,
        "0"
      )}-${String(day).padStart(2, "0")}`;
      const dayData = calendarData?.calendar[dateKey];

      days.push(
        <div
          key={day}
          className={`p-2 border border-gray-200 min-h-[100px] bg-white hover:bg-gray-50 cursor-pointer transition-colors ${
            dayData &&
            (dayData.tasks.length > 0 ||
              dayData.events.length > 0 ||
              dayData.notifications.length > 0)
              ? "ring-2 ring-blue-200 hover:ring-blue-300"
              : ""
          }`}
          onClick={() => handleDayClick(dateKey)}
        >
          <div
            className={`font-semibold text-sm mb-1 ${
              isToday(day)
                ? "bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mx-auto"
                : ""
            }`}
          >
            {day}
          </div>
          {dayData && (
            <div className="space-y-1">
              {dayData.tasks.slice(0, 2).map((task) => (
                <div
                  key={task.id}
                  className="text-xs bg-blue-100 text-blue-800 px-1 py-0.5 rounded truncate"
                >
                  {task.title}
                </div>
              ))}
              {dayData.events.slice(0, 2).map((event) => (
                <div
                  key={event.id}
                  className="text-xs bg-green-100 text-green-800 px-1 py-0.5 rounded truncate"
                >
                  {event.name}
                </div>
              ))}
              {dayData.tasks.length + dayData.events.length > 4 && (
                <div className="text-xs text-gray-500">
                  +{dayData.tasks.length + dayData.events.length - 4} more
                </div>
              )}
              {(dayData.tasks.length > 0 ||
                dayData.events.length > 0 ||
                dayData.notifications.length > 0) && (
                <div className="text-xs text-blue-600 font-medium mt-1">
                  Click to view details
                </div>
              )}
            </div>
          )}
        </div>
      );
    }

    return days;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading calendar...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="p3 md:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Calendar</h1>
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigateMonth("prev")}
            className="px-3 py-1 bg-blue-500 text-white hover:bg-blue-600 rounded transition-colors"
          >
            ←
          </button>
          <span className="text-lg font-semibold">
            {MONTHS[currentMonth - 1]} {currentYear}
          </span>
          <button
            onClick={() => navigateMonth("next")}
            className="px-3 py-1 bg-blue-500 text-white hover:bg-blue-600 rounded transition-colors"
          >
            →
          </button>
          <button
            onClick={goToToday}
            className="px-4 py-1 bg-green-500 text-white hover:bg-green-600 rounded transition-colors text-sm"
          >
            Today
          </button>
        </div>
      </div>

      {/* Summary */}
      {calendarData?.summary && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">
              {calendarData.summary.totalTasks}
            </div>
            <div className="text-sm text-gray-600">Total Tasks</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {calendarData.summary.completedTasks}
            </div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">
              {calendarData.summary.totalEvents}
            </div>
            <div className="text-sm text-gray-600">Events</div>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">
              {calendarData.summary.totalNotifications}
            </div>
            <div className="text-sm text-gray-600">Notifications</div>
          </div>
        </div>
      )}

      {/* Calendar Instructions */}
      <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-800">
          💡 <strong>Tip:</strong> Click on any day to view detailed information
          about tasks, events, and notifications for that day.
        </p>
      </div>

      {/* Calendar Grid */}
      <div className="bg-white rounded-lg shadow">
        {/* Days of week header */}
        <div className="grid grid-cols-7 border-b">
          {DAYS.map((day) => (
            <div
              key={day}
              className="p-3 text-center font-semibold text-gray-600 bg-gray-50"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar days */}
        <div className="hidden md:grid grid-cols-7">{renderCalendarDays()}</div>
        <div className="w-full block md:hidden overflow-x-auto">
          <div className="grid grid-cols-7 min-w-[700px]">
            {renderCalendarDays()}
          </div>
        </div>
      </div>

      {/* Daily View Modal */}
      <DailyViewModal
        isOpen={isDailyViewOpen}
        onClose={closeDailyView}
        selectedDate={selectedDate}
      />
    </div>
  );
};
