"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Event } from "@/types/event";
import { format } from "date-fns";
import { Calendar, FileText, Clock, Bell } from "lucide-react";

interface EventViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: Event | null;
}

export default function EventViewModal({
  isOpen,
  onClose,
  event,
}: EventViewModalProps) {
  if (!event) return null;

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "EEEE, MMMM dd, yyyy");
    } catch {
      return dateString;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold pr-8">
            {event.name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 border-b pb-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Date: {formatDate(event.date)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>Time: {event.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              <span>Notify: {event.timeToNotify} min before</span>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span>Created: {formatDate(event.createdAt)}</span>
            </div>
            {event.updatedAt !== event.createdAt && (
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span>Updated: {formatDate(event.updatedAt)}</span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="prose prose-sm max-w-none">
            <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
              {event.note}
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