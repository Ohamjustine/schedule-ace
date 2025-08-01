"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { UserNotification, NotificationInterval } from "@/types/notification";
import { format } from "date-fns";
import { Bell, Calendar, Clock, Repeat, ToggleLeft, ToggleRight } from "lucide-react";

interface NotificationViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  notification: UserNotification | null;
}

export default function NotificationViewModal({
  isOpen,
  onClose,
  notification,
}: NotificationViewModalProps) {
  if (!notification) return null;

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "EEEE, MMMM dd, yyyy");
    } catch {
      return dateString;
    }
  };

  const formatTime = (timeString: string) => {
    try {
      const [hours, minutes] = timeString.split(":");
      const date = new Date();
      date.setHours(parseInt(hours), parseInt(minutes));
      return format(date, "h:mm a");
    } catch {
      return timeString;
    }
  };

  const getIntervalText = (interval: NotificationInterval) => {
    return interval.charAt(0).toUpperCase() + interval.slice(1);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Notification Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Title */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {notification.title}
            </h3>
          </div>

          {/* Date */}
          <div className="flex items-center gap-3">
            <Calendar className="h-5 w-5 text-gray-400" />
            <div>
              <span className="text-sm text-gray-500">Date</span>
              <p className="font-medium text-gray-900">
                {formatDate(notification.date)}
              </p>
            </div>
          </div>

          {/* Time */}
          <div className="flex items-center gap-3">
            <Clock className="h-5 w-5 text-gray-400" />
            <div>
              <span className="text-sm text-gray-500">Time</span>
              <p className="font-medium text-gray-900">
                {formatTime(notification.time)}
              </p>
            </div>
          </div>

          {/* Interval */}
          <div className="flex items-center gap-3">
            <Repeat className="h-5 w-5 text-gray-400" />
            <div>
              <span className="text-sm text-gray-500">Interval</span>
              <p className="font-medium text-gray-900">
                {getIntervalText(notification.notificationInterval)}
              </p>
            </div>
          </div>

          {/* Status */}
          <div className="flex items-center gap-3">
            {notification.isActive ? (
              <ToggleRight className="h-5 w-5 text-green-500" />
            ) : (
              <ToggleLeft className="h-5 w-5 text-gray-400" />
            )}
            <div>
              <span className="text-sm text-gray-500">Status</span>
              <p className={`font-medium ${
                notification.isActive ? "text-green-600" : "text-gray-600"
              }`}>
                {notification.isActive ? "Active" : "Inactive"}
              </p>
            </div>
          </div>

          {/* Created Date */}
          <div className="flex items-center gap-3">
            <Calendar className="h-5 w-5 text-gray-400" />
            <div>
              <span className="text-sm text-gray-500">Created</span>
              <p className="font-medium text-gray-900">
                {formatDate(notification.createdAt)}
              </p>
            </div>
          </div>

          {/* Updated Date */}
          {notification.updatedAt !== notification.createdAt && (
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-gray-400" />
              <div>
                <span className="text-sm text-gray-500">Last Updated</span>
                <p className="font-medium text-gray-900">
                  {formatDate(notification.updatedAt)}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end pt-4">
          <Button onClick={onClose} variant="outline">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}