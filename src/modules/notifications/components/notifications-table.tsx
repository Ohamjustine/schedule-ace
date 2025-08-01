"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { MoreHorizontal, Eye, Edit, Trash2 } from "lucide-react";
import { UserNotification, NotificationInterval } from "@/types/notification";
import { format } from "date-fns";

interface NotificationsTableProps {
  notifications: UserNotification[];
  onView: (notification: UserNotification) => void;
  onEdit: (notification: UserNotification) => void;
  onDelete: (notificationId: string) => void;
  onToggleStatus: (notificationId: string) => void;
}

export default function NotificationsTable({
  notifications,
  onView,
  onEdit,
  onDelete,
  onToggleStatus,
}: NotificationsTableProps) {
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMM dd, yyyy");
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

  const getIntervalBadge = (interval: NotificationInterval) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    switch (interval) {
      case "once":
        return `${baseClasses} bg-gray-100 text-gray-800`;
      case "daily":
        return `${baseClasses} bg-blue-100 text-blue-800`;
      case "weekly":
        return `${baseClasses} bg-green-100 text-green-800`;
      case "monthly":
        return `${baseClasses} bg-purple-100 text-purple-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const getIntervalText = (interval: NotificationInterval) => {
    return interval.charAt(0).toUpperCase() + interval.slice(1);
  };

  if (notifications?.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
        <div className="text-gray-500 mb-2">No notifications found</div>
        <div className="text-sm text-gray-400">
          Create your first notification to get started
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="font-semibold">Title</TableHead>
            <TableHead className="font-semibold">Date</TableHead>
            <TableHead className="font-semibold">Time</TableHead>
            <TableHead className="font-semibold">Interval</TableHead>
            <TableHead className="font-semibold">Status</TableHead>
            <TableHead className="font-semibold text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {notifications?.map((notification) => (
            <TableRow key={notification.id} className="hover:bg-gray-50">
              <TableCell className="font-medium">
                {notification.title}
              </TableCell>
              <TableCell>{formatDate(notification.date)}</TableCell>
              <TableCell>{formatTime(notification.time)}</TableCell>
              <TableCell>
                <span
                  className={getIntervalBadge(
                    notification.notificationInterval
                  )}
                >
                  {getIntervalText(notification.notificationInterval)}
                </span>
              </TableCell>
              <TableCell>
                <Switch
                  checked={notification.isActive}
                  onCheckedChange={() => onToggleStatus(notification.id)}
                />
              </TableCell>
              <TableCell className="text-center">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => onView(notification)}
                      className="cursor-pointer"
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => onEdit(notification)}
                      className="cursor-pointer"
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => onDelete(notification.id)}
                      className="cursor-pointer text-red-600 focus:text-red-600"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
