"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useGoals } from "../hooks/use-goals";
import { Goal, CreateGoalData, GoalProgress } from "@/types/goals";
import GoalFormModal from "./goal-form-modal";
import GoalsTable from "./goals-table";
import GoalViewModal from "./goal-view-modal";

export const Overview = () => {
  const {
    goals,
    createGoal,
    updateGoal,
    updateGoalProgress,
    deleteGoal,
    isLoading,
    fetchGoals,
  } = useGoals();
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");

  // Fetch goals on mount and after changes
  useEffect(() => {
    fetchGoals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddGoal = () => {
    setModalMode("create");
    setSelectedGoal(null);
    setIsFormModalOpen(true);
  };

  const handleEditGoal = (goal: Goal) => {
    setModalMode("edit");
    setSelectedGoal(goal);
    setIsFormModalOpen(true);
  };

  const handleViewGoal = (goal: Goal) => {
    setSelectedGoal(goal);
    setIsViewModalOpen(true);
  };

  const handleDeleteGoal = async (goalId: string) => {
    if (window.confirm("Are you sure you want to delete this goal?")) {
      try {
        await deleteGoal(goalId);
        await fetchGoals();
      } catch (error) {
        console.error("Failed to delete goal:", error);
      }
    }
  };

  const handleProgressChange = async (
    goalId: string,
    progress: GoalProgress
  ) => {
    try {
      await updateGoalProgress(goalId, progress);
      await fetchGoals();
    } catch (error) {
      console.error("Failed to update goal progress:", error);
    }
  };

  const handleFormSubmit = async (data: CreateGoalData) => {
    try {
      if (modalMode === "create") {
        await createGoal(data);
      } else if (selectedGoal) {
        await updateGoal(selectedGoal.id, data);
      }
      await fetchGoals();
    } catch (error) {
      console.error("Failed to save goal:", error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Goals
          </h1>
          <p className="text-gray-600 mt-1">
            Track and manage your personal goals
          </p>
        </div>
        <Button
          onClick={handleAddGoal}
          className="bg-blue-600 hover:bg-blue-700 text-white"
          disabled={isLoading}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Goal
        </Button>
      </div>

      {/* Goals Table */}
      <GoalsTable
        goals={goals}
        onView={handleViewGoal}
        onEdit={handleEditGoal}
        onDelete={handleDeleteGoal}
        onProgressChange={handleProgressChange}
      />

      {/* Goal Form Modal */}
      <GoalFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSubmit={handleFormSubmit}
        goal={selectedGoal}
        mode={modalMode}
      />

      {/* Goal View Modal */}
      <GoalViewModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        goal={selectedGoal}
      />
    </div>
  );
};
