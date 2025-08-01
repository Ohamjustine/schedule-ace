"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Task } from "@/types/task";
import { format } from "date-fns";
import { Calendar, Clock, Tag, Bell, FileText } from "lucide-react";

interface TaskViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task | null;
}

export default function TaskViewModal({
  isOpen,
  onClose,
  task,
}: TaskViewModalProps) {
  if (!task) return null;

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

  const getCategoryColor = (category: string) => {
    return category === "academic" ? "text-blue-600" : "text-green-600";
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Task Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Title */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {task.title}
            </h3>
          </div>

          {/* Category */}
          <div className="flex items-center gap-3">
            <Tag className="h-5 w-5 text-gray-400" />
            <div>
              <span className="text-sm text-gray-500">Category</span>
              <p className={`font-medium ${getCategoryColor(task.category)}`}>
                {task.category.charAt(0).toUpperCase() + task.category.slice(1)}
              </p>
            </div>
          </div>

          {/* Date */}
          <div className="flex items-center gap-3">
            <Calendar className="h-5 w-5 text-gray-400" />
            <div>
              <span className="text-sm text-gray-500">Date</span>
              <p className="font-medium text-gray-900">
                {formatDate(task.date)}
              </p>
            </div>
          </div>

          {/* Time */}
          <div className="flex items-center gap-3">
            <Clock className="h-5 w-5 text-gray-400" />
            <div>
              <span className="text-sm text-gray-500">Time</span>
              <p className="font-medium text-gray-900">
                {formatTime(task.startTime)} - {formatTime(task.endTime)}
              </p>
            </div>
          </div>

          {/* Timer Break */}
          {task.timerBreak && (
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-gray-400" />
              <div>
                <span className="text-sm text-gray-500">Timer Break</span>
                <p className="font-medium text-gray-900">
                  {task.timerBreak} minutes
                </p>
              </div>
            </div>
          )}

          {/* Notification */}
          {task.notification && (
            <div className="flex items-center gap-3">
              <Bell className="h-5 w-5 text-gray-400" />
              <div>
                <span className="text-sm text-gray-500">Notification</span>
                <p className="font-medium text-gray-900">
                  {task.notification.replace("min", " minutes").replace("hour", " hour")} before
                </p>
              </div>
            </div>
          )}

          {/* Notes */}
          {task.notes && (
            <div className="flex items-start gap-3">
              <FileText className="h-5 w-5 text-gray-400 mt-0.5" />
              <div className="flex-1">
                <span className="text-sm text-gray-500">Notes</span>
                <p className="font-medium text-gray-900 whitespace-pre-wrap">
                  {task.notes}
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