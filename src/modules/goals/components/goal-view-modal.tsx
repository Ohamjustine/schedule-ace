"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Goal, GoalProgress } from "@/types/goals";
import { format } from "date-fns";
import { Target, Calendar, FileText, TrendingUp } from "lucide-react";

interface GoalViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  goal: Goal | null;
}

export default function GoalViewModal({
  isOpen,
  onClose,
  goal,
}: GoalViewModalProps) {
  if (!goal) return null;

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "EEEE, MMMM dd, yyyy");
    } catch {
      return dateString;
    }
  };

  const getProgressColor = (progress: GoalProgress) => {
    switch (progress) {
      case "not_started":
        return "text-gray-600";
      case "in_progress":
        return "text-blue-600";
      case "completed":
        return "text-green-600";
      case "on_hold":
        return "text-yellow-600";
      default:
        return "text-gray-600";
    }
  };

  const getProgressText = (progress: GoalProgress) => {
    switch (progress) {
      case "not_started":
        return "Not Started";
      case "in_progress":
        return "In Progress";
      case "completed":
        return "Completed";
      case "on_hold":
        return "On Hold";
      default:
        return progress;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Goal Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Title */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {goal.title}
            </h3>
          </div>

          {/* Progress */}
          <div className="flex items-center gap-3">
            <TrendingUp className="h-5 w-5 text-gray-400" />
            <div>
              <span className="text-sm text-gray-500">Progress</span>
              <p className={`font-medium ${getProgressColor(goal.progress)}`}>
                {getProgressText(goal.progress)}
              </p>
            </div>
          </div>

          {/* Description */}
          {goal.description && (
            <div className="flex items-start gap-3">
              <FileText className="h-5 w-5 text-gray-400 mt-0.5" />
              <div className="flex-1">
                <span className="text-sm text-gray-500">Description</span>
                <p className="font-medium text-gray-900 whitespace-pre-wrap">
                  {goal.description}
                </p>
              </div>
            </div>
          )}

          {/* Created Date */}
          <div className="flex items-center gap-3">
            <Calendar className="h-5 w-5 text-gray-400" />
            <div>
              <span className="text-sm text-gray-500">Created</span>
              <p className="font-medium text-gray-900">
                {formatDate(goal.createdAt)}
              </p>
            </div>
          </div>

          {/* Updated Date */}
          {goal.updatedAt !== goal.createdAt && (
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-gray-400" />
              <div>
                <span className="text-sm text-gray-500">Last Updated</span>
                <p className="font-medium text-gray-900">
                  {formatDate(goal.updatedAt)}
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