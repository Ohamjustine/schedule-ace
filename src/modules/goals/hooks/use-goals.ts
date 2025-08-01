"use client";

import { useState } from "react";
import { Goal, CreateGoalData, GoalProgress } from "@/types/goals";
import axiosClient from "@/lib/axios-client";

// Helper to map API goal to local Goal type
const mapApiGoalToGoal = (apiGoal: any): Goal => ({
  id: apiGoal._id,
  title: apiGoal.title,
  description: apiGoal.description,
  progress: apiGoal.progress,
  user: apiGoal.user,
  createdAt: apiGoal.createdAt,
  updatedAt: apiGoal.updatedAt,
});

export const useGoals = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all goals
  const fetchGoals = async (params?: { progress?: GoalProgress }) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axiosClient.get("/goals", { params });
      const apiGoals = response.data.data || [];
      setGoals(apiGoals.map(mapApiGoalToGoal));
      return apiGoals.map(mapApiGoalToGoal);
    } catch (err) {
      setError("Failed to fetch goals");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Create a new goal
  const createGoal = async (goalData: CreateGoalData): Promise<Goal> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axiosClient.post("/goals", goalData);
      const apiGoal = response.data.data;
      const newGoal = mapApiGoalToGoal(apiGoal);
      setGoals((prev) => [newGoal, ...prev]);
      return newGoal;
    } catch (err) {
      setError("Failed to create goal");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Update a goal
  const updateGoal = async (
    goalId: string,
    goalData: Partial<CreateGoalData>
  ): Promise<Goal> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axiosClient.put(`/goals/${goalId}`, goalData);
      const apiGoal = response.data.data;
      const updatedGoal = mapApiGoalToGoal(apiGoal);
      setGoals((prev) =>
        prev.map((goal) => (goal.id === goalId ? updatedGoal : goal))
      );
      return updatedGoal;
    } catch (err) {
      setError("Failed to update goal");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Update goal progress
  const updateGoalProgress = async (
    goalId: string,
    progress: GoalProgress
  ): Promise<Goal> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axiosClient.put(`/goals/${goalId}/progress`, {
        progress,
      });
      const apiGoal = response.data.data;
      const updatedGoal = mapApiGoalToGoal(apiGoal);
      setGoals((prev) =>
        prev.map((goal) => (goal.id === goalId ? updatedGoal : goal))
      );
      return updatedGoal;
    } catch (err) {
      setError("Failed to update goal progress");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Delete a goal
  const deleteGoal = async (goalId: string): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      await axiosClient.delete(`/goals/${goalId}`);
      setGoals((prev) => prev.filter((goal) => goal.id !== goalId));
    } catch (err) {
      setError("Failed to delete goal");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Get a single goal by id
  const getGoalById = async (goalId: string): Promise<Goal | undefined> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axiosClient.get(`/goals/${goalId}`);
      const apiGoal = response.data.data;
      return mapApiGoalToGoal(apiGoal);
    } catch (err) {
      setError("Failed to fetch goal");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    goals,
    isLoading,
    error,
    fetchGoals,
    createGoal,
    updateGoal,
    updateGoalProgress,
    deleteGoal,
    getGoalById,
  };
};
