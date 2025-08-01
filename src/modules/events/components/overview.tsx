"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import EventFormModal from "@/modules/events/components/event-form-modal";
import EventCard from "@/modules/events/components/event-card";
import EventViewModal from "@/modules/events/components/event-view-modal";
import { useEvents } from "@/modules/events/hooks/use-events";
import { Event, CreateEventData } from "@/types/event";

export const Overview = () => {
  const {
    events,
    createEvent,
    updateEvent,
    deleteEvent,
    isLoading,
    fetchEvents,
  } = useEvents();
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");

  // Fetch events on mount and after changes
  useEffect(() => {
    fetchEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddEvent = () => {
    setModalMode("create");
    setSelectedEvent(null);
    setIsFormModalOpen(true);
  };

  const handleEditEvent = (event: Event) => {
    setModalMode("edit");
    setSelectedEvent(event);
    setIsFormModalOpen(true);
  };

  const handleViewEvent = (event: Event) => {
    setSelectedEvent(event);
    setIsViewModalOpen(true);
  };

  const handleDeleteEvent = async (eventId: string) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await deleteEvent(eventId);
        await fetchEvents();
      } catch (error) {
        console.error("Failed to delete event:", error);
      }
    }
  };

  const handleFormSubmit = async (data: CreateEventData) => {
    try {
      if (modalMode === "create") {
        await createEvent(data);
      } else if (selectedEvent) {
        await updateEvent(selectedEvent.id, data);
      }
      await fetchEvents();
    } catch (error) {
      console.error("Failed to save event:", error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Events
          </h1>
          <p className="text-gray-600 mt-1">
            Never miss another important event again.
          </p>
        </div>
        <Button
          onClick={handleAddEvent}
          className="bg-blue-600 hover:bg-blue-700 text-white"
          disabled={isLoading}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Event
        </Button>
      </div>

      {/* Events Grid */}
      {events.length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <div className="text-gray-500 mb-2">No events found</div>
          <div className="text-sm text-gray-400 mb-4">
            Create your first event to get started
          </div>
          <Button
            onClick={handleAddEvent}
            variant="outline"
            className="text-blue-600 border-blue-600 hover:bg-blue-50"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Your First Event
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onView={handleViewEvent}
              onEdit={handleEditEvent}
              onDelete={handleDeleteEvent}
            />
          ))}
        </div>
      )}

      {/* Event Form Modal */}
      <EventFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSubmit={handleFormSubmit}
        event={selectedEvent}
        mode={modalMode}
      />

      {/* Event View Modal */}
      <EventViewModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        event={selectedEvent}
      />
    </div>
  );
};
