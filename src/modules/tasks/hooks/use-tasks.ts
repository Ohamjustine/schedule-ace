"use client";

import { useState } from "react";
import { Task, CreateTaskData } from "@/types/task";
import axiosClient, { ApiError } from "@/lib/axios-client";

// Helper to map API task to local Task type
const mapApiTaskToTask = (apiTask: any): Task => ({
  id: apiTask._id,
  title: apiTask.title,
  category: apiTask.category,
  date: apiTask.date?.slice(0, 10) ?? "",
  startTime: apiTask.startTime,
  endTime: apiTask.endTime,
  timerBreak: "", // Not present in API, keep empty or extend API
  notification: apiTask.timeToNotify ? `${apiTask.timeToNotify}min` : "",
  notes: apiTask.notes ?? "",
  createdAt: apiTask.createdAt,
  updatedAt: apiTask.updatedAt,
  // Optionally: isCompleted, notificationSent, user
});

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all tasks
  const fetchTasks = async (params?: {
    category?: string;
    date?: string;
    completed?: boolean;
  }) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axiosClient.get("/tasks", { params });
      const apiTasks = response.data.data || [];
      setTasks(apiTasks.map(mapApiTaskToTask));
      return apiTasks.map(mapApiTaskToTask);
    } catch (err) {
      setError("Failed to fetch tasks");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Create a new task
  const createTask = async (taskData: CreateTaskData): Promise<Task> => {
    setIsLoading(true);
    setError(null);
    try {
      const payload = {
        ...taskData,
        timeToNotify: taskData.notification
          ? parseInt(
              taskData.notification.replace("min", "").replace("hour", "0")
            ) // crude, adjust as needed
          : undefined,
        notes: taskData.notes,
      };
      delete payload.notification;
      delete payload.timerBreak; // Not supported by API
      const response = await axiosClient.post("/tasks", payload);
      const apiTask = response.data.data;
      const newTask = mapApiTaskToTask(apiTask);
      setTasks((prev) => [newTask, ...prev]);
      return newTask;
    } catch (err) {
      setError("Failed to create task");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Update a task
  const updateTask = async (
    taskId: string,
    taskData: Partial<CreateTaskData>
  ): Promise<Task> => {
    setIsLoading(true);
    setError(null);
    try {
      const payload: any = { ...taskData };
      if (payload.notification) {
        payload.timeToNotify = parseInt(
          payload.notification.replace("min", "").replace("hour", "0")
        );
        delete payload.notification;
      }
      if (payload.timerBreak) delete payload.timerBreak;
      const response = await axiosClient.put(`/tasks/${taskId}`, payload);
      const apiTask = response.data.data;
      const updatedTask = mapApiTaskToTask(apiTask);
      setTasks((prev) =>
        prev.map((task) => (task.id === taskId ? updatedTask : task))
      );
      return updatedTask;
    } catch (err) {
      setError("Failed to update task");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Delete a task
  const deleteTask = async (taskId: string): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      await axiosClient.delete(`/tasks/${taskId}`);
      setTasks((prev) => prev.filter((task) => task.id !== taskId));
    } catch (err) {
      setError("Failed to delete task");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Get a single task by id (from API)
  const getTaskById = async (taskId: string): Promise<Task | undefined> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axiosClient.get(`/tasks/${taskId}`);
      const apiTask = response.data.data;
      return mapApiTaskToTask(apiTask);
    } catch (err) {
      setError("Failed to fetch task");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle completion
  const toggleTaskCompletion = async (taskId: string): Promise<Task> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axiosClient.put(
        `/tasks/${taskId}/toggle-completion`
      );
      const apiTask = response.data.data;
      const updatedTask = mapApiTaskToTask(apiTask);
      setTasks((prev) =>
        prev.map((task) => (task.id === taskId ? updatedTask : task))
      );
      return updatedTask;
    } catch (err) {
      setError("Failed to toggle completion");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    tasks,
    isLoading,
    error,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    getTaskById,
    toggleTaskCompletion,
  };
};