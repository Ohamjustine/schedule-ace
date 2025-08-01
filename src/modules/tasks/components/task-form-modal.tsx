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
import { CreateTaskData, Task, TaskCategory } from "@/types/task";

interface TaskFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateTaskData) => void;
  task?: Task | null;
  mode: "create" | "edit";
}

export default function TaskFormModal({
  isOpen,
  onClose,
  onSubmit,
  task,
  mode,
}: TaskFormModalProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<CreateTaskData>({
    defaultValues: task
      ? {
          title: task.title,
          category: task.category,
          date: task.date,
          startTime: task.startTime,
          endTime: task.endTime,
          timerBreak: task.timerBreak || "",
          notification: task.notification || "",
          notes: task.notes || "",
        }
      : {
          title: "",
          category: "academic" as TaskCategory,
          date: "",
          startTime: "",
          endTime: "",
          timerBreak: "",
          notification: "",
          notes: "",
        },
  });

  const watchedCategory = watch("category");

  React.useEffect(() => {
    if (task && mode === "edit") {
      reset({
        title: task.title,
        category: task.category,
        date: task.date,
        startTime: task.startTime,
        endTime: task.endTime,
        timerBreak: task.timerBreak || "",
        notification: task.notification || "",
        notes: task.notes || "",
      });
    } else if (mode === "create") {
      reset({
        title: "",
        category: "academic",
        date: "",
        startTime: "",
        endTime: "",
        timerBreak: "",
        notification: "",
        notes: "",
      });
    }
  }, [task, mode, reset]);

  const handleFormSubmit = (data: CreateTaskData) => {
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
            {mode === "create" ? "Add New Task" : "Edit Task"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Enter Title"
              {...register("title", { required: "Title is required" })}
            />
            {errors.title && (
              <span className="text-sm text-red-500">{errors.title.message}</span>
            )}
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category">Select Category</Label>
            <Select
              value={watchedCategory}
              onValueChange={(value: TaskCategory) => setValue("category", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="academic">Academic</SelectItem>
                <SelectItem value="personal">Personal</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Date */}
          <div className="space-y-2">
            <Label htmlFor="date">Choose Day</Label>
            <Input
              id="date"
              type="date"
              {...register("date", { required: "Date is required" })}
            />
            {errors.date && (
              <span className="text-sm text-red-500">{errors.date.message}</span>
            )}
          </div>

          {/* Time Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startTime">Start Time</Label>
              <Input
                id="startTime"
                type="time"
                {...register("startTime", { required: "Start time is required" })}
              />
              {errors.startTime && (
                <span className="text-sm text-red-500">
                  {errors.startTime.message}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="endTime">End Time</Label>
              <Input
                id="endTime"
                type="time"
                {...register("endTime", { required: "End time is required" })}
              />
              {errors.endTime && (
                <span className="text-sm text-red-500">
                  {errors.endTime.message}
                </span>
              )}
            </div>
          </div>

          {/* Timer Break and Notification */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="timerBreak">Choose Timer Break</Label>
              <Select
                value={watch("timerBreak") || ""}
                onValueChange={(value) => setValue("timerBreak", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose timer break" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 minutes</SelectItem>
                  <SelectItem value="10">10 minutes</SelectItem>
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="30">30 minutes</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notification">Notification</Label>
              <Select
                value={watch("notification") || ""}
                onValueChange={(value) => setValue("notification", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Notification" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5min">5 minutes before</SelectItem>
                  <SelectItem value="10min">10 minutes before</SelectItem>
                  <SelectItem value="15min">15 minutes before</SelectItem>
                  <SelectItem value="30min">30 minutes before</SelectItem>
                  <SelectItem value="1hour">1 hour before</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              placeholder="Add Note"
              rows={3}
              {...register("notes")}
            />
          </div>

          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              {mode === "create" ? "Add Task" : "Update Task"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}