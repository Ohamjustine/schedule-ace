"use client";

import { useState } from "react";
import { Event, CreateEventData } from "@/types/event";
import axiosClient from "@/lib/axios-client";

// Helper to map API event to local Event type
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapApiEventToEvent = (apiEvent: any): Event => ({
  id: apiEvent._id,
  name: apiEvent.name,
  date: apiEvent.date,
  time: apiEvent.time,
  note: apiEvent.note,
  timeToNotify: apiEvent.timeToNotify,
  notificationSent: apiEvent.notificationSent,
  user: apiEvent.user,
  createdAt: apiEvent.createdAt,
  updatedAt: apiEvent.updatedAt,
});

export const useEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all events
  const fetchEvents = async (params?: {
    date?: string;
    month?: number;
    year?: number;
  }) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axiosClient.get("/events", { params });
      const apiEvents = response.data.data || [];
      setEvents(apiEvents.map(mapApiEventToEvent));
      return apiEvents.map(mapApiEventToEvent);
    } catch (err) {
      setError("Failed to fetch events");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Create a new event
  const createEvent = async (eventData: CreateEventData): Promise<Event> => {
    setIsLoading(true);
    setError(null);
    try {
      const payload = {
        name: eventData.name,
        date: eventData.date,
        time: eventData.time,
        note: eventData.note,
        timeToNotify: eventData.timeToNotify,
      };
      const response = await axiosClient.post("/events", payload);
      const apiEvent = response.data.data;
      const newEvent = mapApiEventToEvent(apiEvent);
      setEvents((prev) => [newEvent, ...prev]);
      return newEvent;
    } catch (err) {
      setError("Failed to create event");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Update an event
  const updateEvent = async (
    eventId: string,
    eventData: Partial<CreateEventData>
  ): Promise<Event> => {
    setIsLoading(true);
    setError(null);
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const payload: any = {};
      if (eventData.name !== undefined) payload.name = eventData.name;
      if (eventData.date !== undefined) payload.date = eventData.date;
      if (eventData.time !== undefined) payload.time = eventData.time;
      if (eventData.note !== undefined) payload.note = eventData.note;
      if (eventData.timeToNotify !== undefined)
        payload.timeToNotify = eventData.timeToNotify;
      const response = await axiosClient.put(`/events/${eventId}`, payload);
      const apiEvent = response.data.data;
      const updatedEvent = mapApiEventToEvent(apiEvent);
      setEvents((prev) =>
        prev.map((event) => (event.id === eventId ? updatedEvent : event))
      );
      return updatedEvent;
    } catch (err) {
      setError("Failed to update event");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Delete an event
  const deleteEvent = async (eventId: string): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      await axiosClient.delete(`/events/${eventId}`);
      setEvents((prev) => prev.filter((event) => event.id !== eventId));
    } catch (err) {
      setError("Failed to delete event");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Get a single event by id (from API)
  const getEventById = async (eventId: string): Promise<Event | undefined> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axiosClient.get(`/events/${eventId}`);
      const apiEvent = response.data.data;
      return mapApiEventToEvent(apiEvent);
    } catch (err) {
      setError("Failed to fetch event");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    events,
    isLoading,
    error,
    fetchEvents,
    createEvent,
    updateEvent,
    deleteEvent,
    getEventById,
  };
};
