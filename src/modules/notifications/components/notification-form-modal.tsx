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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CreateNotificationData,
  UserNotification,
  NotificationInterval,
} from "@/types/notification";
import { Textarea } from "@/components/ui/textarea";

interface NotificationFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateNotificationData) => void;
  notification?: UserNotification | null;
  mode: "create" | "edit";
}

export default function NotificationFormModal({
  isOpen,
  onClose,
  onSubmit,
  notification,
  mode,
}: NotificationFormModalProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<CreateNotificationData>({
    defaultValues: notification
      ? {
          title: notification.title,
          description: notification.description,
          time: notification.time,
          date: notification.date,
          notificationInterval: notification.notificationInterval,
        }
      : {
          title: "",
          description: "",
          time: "",
          date: "",
          notificationInterval: "once" as NotificationInterval,
        },
  });

  const watchedInterval = watch("notificationInterval");

  React.useEffect(() => {
    if (notification && mode === "edit") {
      reset({
        title: notification.title,
        time: notification.time,
        date: notification.date,
        notificationInterval: notification.notificationInterval,
      });
    } else if (mode === "create") {
      reset({
        title: "",
        time: "",
        date: "",
        notificationInterval: "once",
      });
    }
  }, [notification, mode, reset]);

  const handleFormSubmit = (data: CreateNotificationData) => {
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
            {mode === "create" ? "Add New Notification" : "Edit Notification"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Enter notification title"
              {...register("title", { required: "Title is required" })}
            />
            {errors.title && (
              <span className="text-sm text-red-500">
                {errors.title.message}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Description</Label>
            <Textarea
              id="description"
              placeholder="Write notification details here..."
              rows={4}
              {...register("description", {
                required: "Description is required",
              })}
            />

            {errors.title && (
              <span className="text-sm text-red-500">
                {errors.title.message}
              </span>
            )}
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                {...register("date", { required: "Date is required" })}
              />
              {errors.date && (
                <span className="text-sm text-red-500">
                  {errors.date.message}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                type="time"
                {...register("time", { required: "Time is required" })}
              />
              {errors.time && (
                <span className="text-sm text-red-500">
                  {errors.time.message}
                </span>
              )}
            </div>
          </div>

          {/* Notification Interval */}
          <div className="space-y-2">
            <Label htmlFor="notificationInterval">Notification Interval</Label>
            <Select
              value={watchedInterval}
              onValueChange={(value: NotificationInterval) =>
                setValue("notificationInterval", value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select interval" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="once">Once</SelectItem>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              {mode === "create" ? "Add Notification" : "Update Notification"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
