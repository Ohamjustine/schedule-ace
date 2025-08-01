"use client";

import React from "react";
import { Event } from "@/types/event";
import { format } from "date-fns";
import { MoreHorizontal, Eye, Edit, Trash2, Calendar, Clock } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface EventCardProps {
  event: Event;
  onView: (event: Event) => void;
  onEdit: (event: Event) => void;
  onDelete: (eventId: string) => void;
}

export default function EventCard({ event, onView, onEdit, onDelete }: EventCardProps) {
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMM dd, yyyy");
    } catch {
      return dateString;
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all duration-200 group">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 flex-1 mr-2">
          {event.name}
        </h3>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => onView(event)}
              className="cursor-pointer"
            >
              <Eye className="mr-2 h-4 w-4" />
              View
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onEdit(event)}
              className="cursor-pointer"
            >
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onDelete(event.id)}
              className="cursor-pointer text-red-600 focus:text-red-600"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Content */}
      <div className="mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
          <Calendar className="h-4 w-4" />
          <span>{formatDate(event.date)}</span>
          <Clock className="h-4 w-4 ml-4" />
          <span>{event.time}</span>
        </div>
        <p className="text-gray-600 text-sm leading-relaxed mt-2">
          {event.note}
        </p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500">
          {formatDate(event.updatedAt)}
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onView(event)}
          className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 text-xs"
        >
          View details
        </Button>
      </div>
    </div>
  );
}