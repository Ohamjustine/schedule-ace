"use client";

import React, { useEffect, useMemo } from "react";
import { useAuth } from "@/modules/auth/hooks/use-auth";
import { useTasks } from "@/modules/tasks/hooks/use-tasks";
import { useNotes } from "@/modules/notes/hooks/use-notes";
import { useGoals } from "@/modules/goals/hooks/use-goals";
import { useNotifications } from "@/modules/notifications/hooks/use-notifications";
import { useEvents } from "@/modules/events/hooks/use-events";
import TaskFormModal from "@/modules/tasks/components/task-form-modal";
import NoteFormModal from "@/modules/notes/components/note-form-modal";
import GoalFormModal from "@/modules/goals/components/goal-form-modal";
import NotificationFormModal from "@/modules/notifications/components/notification-form-modal";
import EventFormModal from "@/modules/events/components/event-form-modal";
import { CreateTaskData, Task } from "@/types/task";
import { CreateNoteData } from "@/types/note";
import { CreateGoalData } from "@/types/goals";
import { CreateNotificationData } from "@/types/notification";
import { CreateEventData } from "@/types/event";
import {
  format,
  isToday,
  isAfter,
  isBefore,
  addDays,
  parseISO,
} from "date-fns";
import Link from "next/link";

export default function Overview() {
  const { user } = useAuth();
  const {
    tasks,
    createTask,
    isLoading: isTaskLoading,
    fetchTasks,
  } = useTasks();
  const { createNote, isLoading: isNoteLoading } = useNotes();
  const {
    goals,
    createGoal,
    fetchGoals,
    isLoading: isGoalLoading,
  } = useGoals();
  const {
    notifications,
    createNotification,
    fetchNotifications,
    isLoading: isNotificationLoading,
  } = useNotifications();
  const { createEvent, isLoading: isEventLoading } = useEvents();

  const [isTaskModalOpen, setIsTaskModalOpen] = React.useState(false);
  const [isNoteModalOpen, setIsNoteModalOpen] = React.useState(false);
  const [isGoalModalOpen, setIsGoalModalOpen] = React.useState(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] =
    React.useState(false);
  const [isEventModalOpen, setIsEventModalOpen] = React.useState(false);

  // Fetch data on mount
  useEffect(() => {
    fetchTasks();
    fetchGoals();
    fetchNotifications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Memoized filtered tasks
  const todayTasks = useMemo(
    () =>
      tasks.filter((task) => {
        // task.date is "YYYY-MM-DD"
        try {
          return isToday(parseISO(task.date));
        } catch {
          return false;
        }
      }),
    [tasks]
  );

  const upcomingTasks = useMemo(
    () =>
      tasks
        .filter((task) => {
          try {
            const taskDate = parseISO(task.date);
            const now = new Date();
            const inNext3Days =
              isAfter(taskDate, now) && isBefore(taskDate, addDays(now, 4)); // next 3 days (exclusive today)
            return inNext3Days;
          } catch {
            return false;
          }
        })
        .sort((a, b) => a.date.localeCompare(b.date)),
    [tasks]
  );

  const handleQuickAddTask = () => setIsTaskModalOpen(true);
  const handleQuickAddNote = () => setIsNoteModalOpen(true);
  const handleQuickAddGoal = () => setIsGoalModalOpen(true);
  const handleQuickAddNotification = () => setIsNotificationModalOpen(true);
  const handleQuickAddEvent = () => setIsEventModalOpen(true);

  const handleTaskFormSubmit = async (data: CreateTaskData) => {
    try {
      await createTask(data);
      await fetchTasks();
    } catch (e) {
      // Optionally handle error
    }
  };

  const handleNoteFormSubmit = async (data: CreateNoteData) => {
    try {
      await createNote(data);
    } catch (e) {
      // Optionally handle error
    }
  };

  const handleGoalFormSubmit = async (data: CreateGoalData) => {
    try {
      await createGoal(data);
      await fetchGoals();
    } catch (e) {
      // Optionally handle error
    }
  };

  const handleNotificationFormSubmit = async (data: CreateNotificationData) => {
    try {
      await createNotification(data);
      await fetchNotifications();
    } catch (e) {
      // Optionally handle error
    }
  };

  const handleEventFormSubmit = async (data: CreateEventData) => {
    try {
      await createEvent(data);
    } catch (e) {
      // Optionally handle error
    }
  };

  // Helper to format time
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
              {todayTasks.length}
            </span>
          </div>
          <div className="space-y-3">
            <div className="text-sm text-gray-600 font-medium">
              Task for today
            </div>
            {todayTasks.length === 0 ? (
              <div className="text-gray-400 text-sm italic">
                No tasks for today
              </div>
            ) : (
              <ul className="space-y-2 text-sm text-gray-700">
                {todayTasks.map((task) => (
                  <li key={task.id} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="font-medium">{task.title}</span>
                    <span className="text-xs text-gray-400 ml-2">
                      {formatTime(task.startTime)} - {formatTime(task.endTime)}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Upcoming Tasks/Deadline */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Upcoming Tasks/Deadline
          </h2>
          <div className="text-sm text-gray-600">
            <div className="font-medium mb-2">Next 3 days</div>
            {upcomingTasks.length === 0 ? (
              <div className="text-gray-500">No upcoming deadlines</div>
            ) : (
              <ul className="space-y-2">
                {upcomingTasks.map((task) => (
                  <li key={task.id} className="flex flex-col gap-0.5">
                    <span className="font-medium text-gray-900">
                      {task.title}
                    </span>
                    <span className="text-xs text-gray-500">
                      {format(parseISO(task.date), "EEE, MMM dd")} &middot;{" "}
                      {formatTime(task.startTime)} - {formatTime(task.endTime)}
                    </span>
                  </li>
                ))}
              </ul>
            )}
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
            <button
              className="bg-orange-100 hover:bg-orange-200 text-orange-800 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
              onClick={handleQuickAddTask}
              disabled={isTaskLoading}
            >
              +Task
            </button>
            <button
              className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
              onClick={handleQuickAddEvent}
              disabled={isEventLoading}
            >
              📅 Event
            </button>
            <button
              className="bg-green-100 hover:bg-green-200 text-green-800 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
              onClick={handleQuickAddNote}
              disabled={isNoteLoading}
            >
              📝 Note
            </button>
          </div>
        </div>

        {/* Goals */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Goals</h2>
          <div className="space-y-3">
            <div className="text-sm text-gray-600">
              {goals.length} Goals added
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleQuickAddGoal}
                disabled={isGoalLoading}
                className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium transition-colors"
              >
                +Add
              </button>
              <Link
                href="/dashboard/goals"
                className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded text-xs font-medium transition-colors inline-block"
              >
                View
              </Link>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Notifications
            </h2>
            <button
              onClick={handleQuickAddNotification}
              disabled={isNotificationLoading}
              className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium transition-colors"
            >
              +Add
            </button>
          </div>
          <div className="text-sm text-gray-500">
            {notifications.filter((n) => n.isActive).length} active
            notifications
          </div>
          <div className="w-full flex items-center justify-end">
            <Link
              href="/dashboard/notifications"
              className="bg-green-500 hover:bg-green-600 text-white mt-3 px-2 py-1 rounded text-xs font-medium transition-colors inline-block"
            >
              View
            </Link>
          </div>
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

      {/* Quick Add Task Modal */}
      <TaskFormModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        onSubmit={handleTaskFormSubmit}
        mode="create"
      />

      {/* Quick Add Note Modal */}
      <NoteFormModal
        isOpen={isNoteModalOpen}
        onClose={() => setIsNoteModalOpen(false)}
        onSubmit={handleNoteFormSubmit}
        mode="create"
      />

      {/* Quick Add Goal Modal */}
      <GoalFormModal
        isOpen={isGoalModalOpen}
        onClose={() => setIsGoalModalOpen(false)}
        onSubmit={handleGoalFormSubmit}
        mode="create"
      />

      {/* Quick Add Notification Modal */}
      <NotificationFormModal
        isOpen={isNotificationModalOpen}
        onClose={() => setIsNotificationModalOpen(false)}
        onSubmit={handleNotificationFormSubmit}
        mode="create"
      />

      {/* Quick Add Event Modal */}
      <EventFormModal
        isOpen={isEventModalOpen}
        onClose={() => setIsEventModalOpen(false)}
        onSubmit={handleEventFormSubmit}
        mode="create"
      />
    </div>
  );
}
