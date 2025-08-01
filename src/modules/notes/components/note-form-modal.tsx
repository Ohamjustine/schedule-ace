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
import { CreateNoteData, Note } from "@/types/note";

interface NoteFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateNoteData) => void;
  note?: Note | null;
  mode: "create" | "edit";
}

export default function NoteFormModal({
  isOpen,
  onClose,
  onSubmit,
  note,
  mode,
}: NoteFormModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateNoteData>({
    defaultValues: note
      ? {
          title: note.title,
          content: note.content,
        }
      : {
          title: "",
          content: "",
        },
  });

  useEffect(() => {
    if (note && mode === "edit") {
      reset({
        title: note.title,
        content: note.content,
      });
    } else if (mode === "create") {
      reset({
        title: "",
        content: "",
      });
    }
  }, [note, mode, reset]);

  const handleFormSubmit = (data: CreateNoteData) => {
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
            {mode === "create" ? "Add New Note" : "Edit Note"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Enter note title"
              {...register("title", { required: "Title is required" })}
            />
            {errors.title && (
              <span className="text-sm text-red-500">
                {errors.title.message}
              </span>
            )}
          </div>

          {/* Content */}
          <div className="space-y-2">
            <Label htmlFor="content">Note</Label>
            <Textarea
              id="content"
              placeholder="Write your note here..."
              rows={8}
              {...register("content", { required: "Note content is required" })}
            />
            {errors.content && (
              <span className="text-sm text-red-500">
                {errors.content.message}
              </span>
            )}
          </div>

          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              {mode === "create" ? "Add Note" : "Update Note"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
