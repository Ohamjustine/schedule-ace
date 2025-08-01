"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Note } from "@/types/note";
import { format } from "date-fns";
import { Calendar, FileText } from "lucide-react";

interface NoteViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  note: Note | null;
}

export default function NoteViewModal({
  isOpen,
  onClose,
  note,
}: NoteViewModalProps) {
  if (!note) return null;

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "EEEE, MMMM dd, yyyy 'at' h:mm a");
    } catch {
      return dateString;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold pr-8">
            {note.title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Metadata */}
          <div className="flex items-center gap-6 text-sm text-gray-500 border-b pb-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Created: {formatDate(note.createdAt)}</span>
            </div>
            {note.updatedAt !== note.createdAt && (
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span>Updated: {formatDate(note.updatedAt)}</span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="prose prose-sm max-w-none">
            <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
              {note.content}
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t">
          <Button onClick={onClose} variant="outline">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}