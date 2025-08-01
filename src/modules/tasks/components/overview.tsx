"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import TaskFormModal from "@/modules/tasks/components/task-form-modal";
import TasksTable from "@/modules/tasks/components/tasks-table";
import TaskViewModal from "@/modules/tasks/components/task-view-modal";
import { useTasks } from "@/modules/tasks/hooks/use-tasks";
import { Task, CreateTaskData } from "@/types/task";

export const Overview = () => {
  const { tasks, createTask, updateTask, deleteTask, isLoading, fetchTasks } =
    useTasks();
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");

  // Fetch tasks on mount and after changes
  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddTask = () => {
    setModalMode("create");
    setSelectedTask(null);
    setIsFormModalOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setModalMode("edit");
    setSelectedTask(task);
    setIsFormModalOpen(true);
  };

  const handleViewTask = (task: Task) => {
    setSelectedTask(task);
    setIsViewModalOpen(true);
  };

  const handleDeleteTask = async (taskId: string) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await deleteTask(taskId);
        await fetchTasks();
      } catch (error) {
        console.error("Failed to delete task:", error);
      }
    }
  };

  const handleFormSubmit = async (data: CreateTaskData) => {
    try {
      if (modalMode === "create") {
        await createTask(data);
      } else if (selectedTask) {
        await updateTask(selectedTask.id, data);
      }
      await fetchTasks();
    } catch (error) {
      console.error("Failed to save task:", error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Tasks
          </h1>
          <p className="text-gray-600 mt-1">
            Manage your academic and personal tasks
          </p>
        </div>
        <Button
          onClick={handleAddTask}
          className="bg-blue-600 hover:bg-blue-700 text-white"
          disabled={isLoading}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Task
        </Button>
      </div>

      {/* Tasks Table */}
      <TasksTable
        tasks={tasks}
        onView={handleViewTask}
        onEdit={handleEditTask}
        onDelete={handleDeleteTask}
      />

      {/* Task Form Modal */}
      <TaskFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSubmit={handleFormSubmit}
        task={selectedTask}
        mode={modalMode}
      />

      {/* Task View Modal */}
      <TaskViewModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        task={selectedTask}
      />
    </div>
  );
};
