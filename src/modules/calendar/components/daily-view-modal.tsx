"use client";

import { useState, useEffect } from "react";
import {
  CalendarTask,
  CalendarEvent,
  CalendarNotification,
} from "@/types/calendar";
import { useCalendar } from "../hooks/use-calendar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface DailyViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: string | null;
}

export const DailyViewModal = ({
  isOpen,
  onClose,
  selectedDate,
}: DailyViewModalProps) => {
  const { fetchDateData } = useCalendar();
  const [dayData, setDayData] = useState<{
    tasks: CalendarTask[];
    events: CalendarEvent[];
    notifications: CalendarNotification[];
    summary: {
      totalTasks: number;
      completedTasks: number;
      totalEvents: number;
      totalNotifications: number;
    };
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen && selectedDate) {
      const loadDayData = async () => {
        setIsLoading(true);
        const data = await fetchDateData(selectedDate);
        if (data) {
          setDayData(data);
        }
        setIsLoading(false);
      };
      loadDayData();
    } else {
      // Reset data when modal closes
      setDayData(null);
      setIsLoading(false);
    }
  }, [isOpen, selectedDate, fetchDateData]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (timeString: string) => {
    const date = new Date(`2000-01-01T${timeString}`);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const getStatusColor = (isCompleted: boolean) => {
    return isCompleted ? "text-green-600" : "text-yellow-600";
  };

  const getStatusText = (isCompleted: boolean) => {
    return isCompleted ? "Completed" : "Pending";
  };

  if (!selectedDate) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {formatDate(selectedDate)}
          </DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="flex items-center justify-center h-32">
            <div className="text-lg">Loading daily view...</div>
          </div>
        ) : dayData ? (
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-xl font-bold text-blue-600">
                  {dayData.summary.totalTasks}
                </div>
                <div className="text-sm text-gray-600">Total Tasks</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-xl font-bold text-green-600">
                  {dayData.summary.completedTasks}
                </div>
                <div className="text-sm text-gray-600">Completed</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="text-xl font-bold text-purple-600">
                  {dayData.summary.totalEvents}
                </div>
                <div className="text-sm text-gray-600">Events</div>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <div className="text-xl font-bold text-orange-600">
                  {dayData.summary.totalNotifications}
                </div>
                <div className="text-sm text-gray-600">Notifications</div>
              </div>
            </div>

            {/* Tasks Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
                Tasks ({dayData.tasks.length})
              </h3>
              {dayData.tasks.length > 0 ? (
                <div className="space-y-3">
                  {dayData.tasks.map((task, idx) => (
                    <div
                      key={idx}
                      className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">
                            {task.title}
                          </h4>
                          <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                            <span>Category: {task.category}</span>
                            <span>
                              Time: {formatTime(task.startTime)} -{" "}
                              {formatTime(task.endTime)}
                            </span>
                            <span
                              className={`font-medium ${getStatusColor(
                                task.isCompleted
                              )}`}
                            >
                              {getStatusText(task.isCompleted)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-gray-500 text-center py-8">
                  No tasks scheduled for this day
                </div>
              )}
            </div>

            {/* Events Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
                Events ({dayData.events.length})
              </h3>
              {dayData.events.length > 0 ? (
                <div className="space-y-3">
                  {dayData.events.map((event, idx) => (
                    <div
                      key={idx}
                      className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">
                            {event.name}
                          </h4>
                          <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                            <span>Time: {formatTime(event.time)}</span>
                          </div>
                          {event.note && (
                            <p className="mt-2 text-sm text-gray-700">
                              {event.note}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-gray-500 text-center py-8">
                  No events scheduled for this day
                </div>
              )}
            </div>

            {/* Notifications Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
                Notifications ({dayData.notifications.length})
              </h3>
              {dayData.notifications.length > 0 ? (
                <div className="space-y-3">
                  {dayData.notifications.map((notification, idx) => (
                    <div
                      key={idx}
                      className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">
                            {notification.title}
                          </h4>
                          <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                            <span>Time: {formatTime(notification.time)}</span>
                            <span>Interval: {notification.interval}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-gray-500 text-center py-8">
                  No notifications scheduled for this day
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No data available for this date
          </div>
        )}

        <div className="flex justify-end pt-4 border-t">
          <Button onClick={onClose} variant="outline">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
