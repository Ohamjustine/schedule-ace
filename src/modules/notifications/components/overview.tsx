"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import NotificationFormModal from "./notification-form-modal";
import NotificationsTable from "./notifications-table";
import NotificationViewModal from "./notifications-view-modal";
import { useNotifications } from "../hooks/use-notifications";
import { UserNotification, CreateNotificationData } from "@/types/notification";

export const Overview = () => {
  const {
    notifications,
    createNotification,
    updateNotification,
    toggleNotificationStatus,
    deleteNotification,
    isLoading,
    fetchNotifications,
  } = useNotifications();
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] =
    useState<UserNotification | null>(null);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");

  // Fetch notifications on mount and after changes
  useEffect(() => {
    fetchNotifications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddNotification = () => {
    setModalMode("create");
    setSelectedNotification(null);
    setIsFormModalOpen(true);
  };

  const handleEditNotification = (notification: UserNotification) => {
    setModalMode("edit");
    setSelectedNotification(notification);
    setIsFormModalOpen(true);
  };

  const handleViewNotification = (notification: UserNotification) => {
    setSelectedNotification(notification);
    setIsViewModalOpen(true);
  };

  const handleDeleteNotification = async (notificationId: string) => {
    if (window.confirm("Are you sure you want to delete this notification?")) {
      try {
        await deleteNotification(notificationId);
        await fetchNotifications();
      } catch (error) {
        console.error("Failed to delete notification:", error);
      }
    }
  };

  const handleToggleStatus = async (notificationId: string) => {
    try {
      await toggleNotificationStatus(notificationId);
      await fetchNotifications();
    } catch (error) {
      console.error("Failed to toggle notification status:", error);
    }
  };

  const handleFormSubmit = async (data: CreateNotificationData) => {
    try {
      if (modalMode === "create") {
        await createNotification(data);
      } else if (selectedNotification) {
        await updateNotification(selectedNotification.id, data);
      }
      await fetchNotifications();
    } catch (error) {
      console.error("Failed to save notification:", error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Notifications
          </h1>
          <p className="text-gray-600 mt-1">
            Manage your notification reminders
          </p>
        </div>
        <Button
          onClick={handleAddNotification}
          className="bg-blue-600 hover:bg-blue-700 text-white"
          disabled={isLoading}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Notification
        </Button>
      </div>

      {/* Notifications Table */}
      <NotificationsTable
        notifications={notifications}
        onView={handleViewNotification}
        onEdit={handleEditNotification}
        onDelete={handleDeleteNotification}
        onToggleStatus={handleToggleStatus}
      />

      {/* Notification Form Modal */}
      <NotificationFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSubmit={handleFormSubmit}
        notification={selectedNotification}
        mode={modalMode}
      />

      {/* Notification View Modal */}
      <NotificationViewModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        notification={selectedNotification}
      />
    </div>
  );
};
