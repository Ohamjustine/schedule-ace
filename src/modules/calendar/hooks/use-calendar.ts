import { useState, useEffect, useCallback } from "react";
import axiosClient, { ApiError } from "@/lib/axios-client";
import { CalendarResponse, DateResponse, CalendarData } from "@/types/calendar";

export const useCalendar = () => {
  const [calendarData, setCalendarData] = useState<CalendarData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const fetchCalendarData = useCallback(async (month: number, year: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosClient.get<CalendarResponse>(
        `/calendar?month=${month}&year=${year}`
      );
      setCalendarData(response.data.data);
    } catch (error) {
      const errorMessage =
        error instanceof ApiError ? error.message : "Sign up failed";
      setError(errorMessage || "Failed to fetch calendar data");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchDateData = useCallback(async (date: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosClient.get<DateResponse>(
        `/calendar/date/${date}`
      );
      return response.data.data;
    } catch (error) {
      const errorMessage =
        error instanceof ApiError ? error.message : "Failed to fetch date data";
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const navigateMonth = (direction: "prev" | "next") => {
    if (direction === "next") {
      if (currentMonth === 12) {
        setCurrentMonth(1);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    } else {
      if (currentMonth === 1) {
        setCurrentMonth(12);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    }
  };

  useEffect(() => {
    fetchCalendarData(currentMonth, currentYear);
  }, [currentMonth, currentYear, fetchCalendarData]);

  return {
    calendarData,
    loading,
    error,
    currentMonth,
    currentYear,
    fetchCalendarData,
    fetchDateData,
    navigateMonth,
  };
};