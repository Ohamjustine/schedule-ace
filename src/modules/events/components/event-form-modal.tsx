"use client";

import React, { useState, useEffect } from "react";
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
import { CreateEventData, Event } from "@/types/event";

interface EventFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateEventData) => void;
  event?: Event | null;
  mode: "create" | "edit";
}

export default function EventFormModal({
  isOpen,
  onClose,
  onSubmit,
  event,
  mode,
}: EventFormModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateEventData>({
    defaultValues: event
      ? {
          name: event.name,
          date: event.date ? event.date.slice(0, 10) : "",
          time: event.time,
          note: event.note,
          timeToNotify: event.timeToNotify,
        }
      : {
          name: "",
          date: "",
          time: "",
          note: "",
          timeToNotify: 30,
        },
  });

  useEffect(() => {
    if (event && mode === "edit") {
      reset({
        name: event.name,
        date: event.date ? event.date.slice(0, 10) : "",
        time: event.time,
        note: event.note,
        timeToNotify: event.timeToNotify,
      });
    } else if (mode === "create") {
      reset({
        name: "",
        date: "",
        time: "",
        note: "",
        timeToNotify: 30,
      });
    }
  }, [event, mode, reset]);

  const handleFormSubmit = (data: CreateEventData) => {
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
            {mode === "create" ? "Add New Event" : "Edit Event"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Event Name</Label>
            <Input
              id="name"
              placeholder="Enter event name"
              {...register("name", { required: "Event name is required" })}
            />
            {errors.name && (
              <span className="text-sm text-red-500">
                {errors.name.message}
              </span>
            )}
          </div>

          {/* Date */}
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

          {/* Time */}
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

          {/* Note */}
          <div className="space-y-2">
            <Label htmlFor="note">Note</Label>
            <Textarea
              id="note"
              placeholder="Write event details here..."
              rows={4}
              {...register("note")}
            />
          </div>

          {/* Time to Notify */}
          <div className="space-y-2">
            <Label htmlFor="timeToNotify">Minutes Before Notification</Label>
            <Input
              id="timeToNotify"
              type="number"
              min={0}
              {...register("timeToNotify", { valueAsNumber: true })}
            />
          </div>

          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              {mode === "create" ? "Add Event" : "Update Event"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
