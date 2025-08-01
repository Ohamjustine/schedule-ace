"use client";

import { useState } from "react";
import { UserNotification, CreateNotificationData } from "@/types/notification";
import axiosClient from "@/lib/axios-client";

// Helper to map API notification to local UserNotification type
const mapApiNotificationToNotification = (
  apiNotification: any
): UserNotification => ({
  id: apiNotification._id,
  title: apiNotification.title,
  description: apiNotification.description,
  time: apiNotification.time,
  date: apiNotification.date,
  notificationInterval: apiNotification.notificationInterval,
  isActive: apiNotification.isActive,
  user: apiNotification.user,
  createdAt: apiNotification.createdAt,
  updatedAt: apiNotification.updatedAt,
});

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<UserNotification[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all notifications
  const fetchNotifications = async (params?: {
    isActive?: boolean;
    date?: string;
  }) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axiosClient.get("/user-notifications", { params });
      const apiNotifications = response.data.data || [];
      setNotifications(apiNotifications.map(mapApiNotificationToNotification));
      return apiNotifications.map(mapApiNotificationToNotification);
    } catch (err) {
      setError("Failed to fetch notifications");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Create a new notification
  const createNotification = async (
    notificationData: CreateNotificationData
  ): Promise<UserNotification> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axiosClient.post(
        "/user-notifications",
        notificationData
      );
      const apiNotification = response.data.data;
      const newNotification = mapApiNotificationToNotification(apiNotification);
      setNotifications((prev) => [newNotification, ...prev]);
      return newNotification;
    } catch (err) {
      setError("Failed to create notification");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Update a notification
  const updateNotification = async (
    notificationId: string,
    notificationData: Partial<CreateNotificationData>
  ): Promise<UserNotification> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axiosClient.put(
        `/user-notifications/${notificationId}`,
        notificationData
      );
      const apiNotification = response.data.data;
      const updatedNotification =
        mapApiNotificationToNotification(apiNotification);
      setNotifications((prev) =>
        prev.map((notification) =>
          notification.id === notificationId
            ? updatedNotification
            : notification
        )
      );
      return updatedNotification;
    } catch (err) {
      setError("Failed to update notification");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle notification status
  const toggleNotificationStatus = async (
    notificationId: string
  ): Promise<UserNotification> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axiosClient.put(
        `/user-notifications/${notificationId}/toggle-status`
      );
      const apiNotification = response.data.data;
      const updatedNotification =
        mapApiNotificationToNotification(apiNotification);
      setNotifications((prev) =>
        prev.map((notification) =>
          notification.id === notificationId
            ? updatedNotification
            : notification
        )
      );
      return updatedNotification;
    } catch (err) {
      setError("Failed to toggle notification status");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Delete a notification
  const deleteNotification = async (notificationId: string): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      await axiosClient.delete(`/user-notifications/${notificationId}`);
      setNotifications((prev) =>
        prev.filter((notification) => notification.id !== notificationId)
      );
    } catch (err) {
      setError("Failed to delete notification");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Get a single notification by id
  const getNotificationById = async (
    notificationId: string
  ): Promise<UserNotification | undefined> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axiosClient.get(
        `/user-notifications/${notificationId}`
      );
      const apiNotification = response.data.data;
      return mapApiNotificationToNotification(apiNotification);
    } catch (err) {
      setError("Failed to fetch notification");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    notifications,
    isLoading,
    error,
    fetchNotifications,
    createNotification,
    updateNotification,
    toggleNotificationStatus,
    deleteNotification,
    getNotificationById,
  };
};
