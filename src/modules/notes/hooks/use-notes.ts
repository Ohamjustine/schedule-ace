"use client";

import { useState } from "react";
import { Note, CreateNoteData } from "@/types/note";
import axiosClient, { ApiError } from "@/lib/axios-client";

// Helper to map API note to local Note type
const mapApiNoteToNote = (apiNote: any): Note => ({
  id: apiNote._id,
  title: apiNote.title,
  content: apiNote.note, // API uses 'note', local uses 'content'
  createdAt: apiNote.createdAt,
  updatedAt: apiNote.updatedAt,
});

export const useNotes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all notes
  const fetchNotes = async (params?: { search?: string }) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axiosClient.get("/notes", { params });
      const apiNotes = response.data.data || [];
      setNotes(apiNotes.map(mapApiNoteToNote));
      return apiNotes.map(mapApiNoteToNote);
    } catch (err) {
      setError("Failed to fetch notes");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Create a new note
  const createNote = async (noteData: CreateNoteData): Promise<Note> => {
    setIsLoading(true);
    setError(null);
    try {
      const payload = {
        title: noteData.title,
        note: noteData.content,
      };
      const response = await axiosClient.post("/notes", payload);
      const apiNote = response.data.data;
      const newNote = mapApiNoteToNote(apiNote);
      setNotes((prev) => [newNote, ...prev]);
      return newNote;
    } catch (err) {
      setError("Failed to create note");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Update a note
  const updateNote = async (
    noteId: string,
    noteData: Partial<CreateNoteData>
  ): Promise<Note> => {
    setIsLoading(true);
    setError(null);
    try {
      const payload: any = {};
      if (noteData.title !== undefined) payload.title = noteData.title;
      if (noteData.content !== undefined) payload.note = noteData.content;
      const response = await axiosClient.put(`/notes/${noteId}`, payload);
      const apiNote = response.data.data;
      const updatedNote = mapApiNoteToNote(apiNote);
      setNotes((prev) =>
        prev.map((note) => (note.id === noteId ? updatedNote : note))
      );
      return updatedNote;
    } catch (err) {
      setError("Failed to update note");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Delete a note
  const deleteNote = async (noteId: string): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      await axiosClient.delete(`/notes/${noteId}`);
      setNotes((prev) => prev.filter((note) => note.id !== noteId));
    } catch (err) {
      setError("Failed to delete note");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Get a single note by id (from API)
  const getNoteById = async (noteId: string): Promise<Note | undefined> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axiosClient.get(`/notes/${noteId}`);
      const apiNote = response.data.data;
      return mapApiNoteToNote(apiNote);
    } catch (err) {
      setError("Failed to fetch note");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    notes,
    isLoading,
    error,
    fetchNotes,
    createNote,
    updateNote,
    deleteNote,
    getNoteById,
  };
};