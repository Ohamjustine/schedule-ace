"use client";

import React from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CreateGoalData, Goal, GoalProgress } from "@/types/goals";

interface GoalFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateGoalData) => void;
  goal?: Goal | null;
  mode: "create" | "edit";
}

export default function GoalFormModal({
  isOpen,
  onClose,
  onSubmit,
  goal,
  mode,
}: GoalFormModalProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<CreateGoalData>({
    defaultValues: goal
      ? {
          title: goal.title,
          description: goal.description,
          progress: goal.progress,
        }
      : {
          title: "",
          description: "",
          progress: "not_started" as GoalProgress,
        },
  });

  const watchedProgress = watch("progress");

  React.useEffect(() => {
    if (goal && mode === "edit") {
      reset({
        title: goal.title,
        description: goal.description,
        progress: goal.progress,
      });
    } else if (mode === "create") {
      reset({
        title: "",
        description: "",
        progress: "not_started",
      });
    }
  }, [goal, mode, reset]);

  const handleFormSubmit = (data: CreateGoalData) => {
    onSubmit(data);
    onClose();
    if (mode === "create") {
      reset();
    }
  };

  const handleClose = () => {
    onClose();
    if (mode === "create") {
      reset();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Add New Goal" : "Edit Goal"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Enter goal title"
              {...register("title", { required: "Title is required" })}
            />
            {errors.title && (
              <span className="text-sm text-red-500">
                {errors.title.message}
              </span>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe your goal"
              rows={3}
              {...register("description", { required: "Description is required" })}
            />
            {errors.description && (
              <span className="text-sm text-red-500">
                {errors.description.message}
              </span>
            )}
          </div>

          {/* Progress */}
          <div className="space-y-2">
            <Label htmlFor="progress">Progress Status</Label>
            <Select
              value={watchedProgress}
              onValueChange={(value: GoalProgress) =>
                setValue("progress", value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select progress status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="not_started">Not Started</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="on_hold">On Hold</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              {mode === "create" ? "Add Goal" : "Update Goal"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
