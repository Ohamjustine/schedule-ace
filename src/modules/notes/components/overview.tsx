"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import NoteFormModal from "@/modules/notes/components/note-form-modal";
import NoteCard from "@/modules/notes/components/note-card";
import NoteViewModal from "@/modules/notes/components/note-view-modal";
import { useNotes } from "@/modules/notes/hooks/use-notes";
import { Note, CreateNoteData } from "@/types/note";

export const Overview = () => {
  const { notes, createNote, updateNote, deleteNote, isLoading, fetchNotes } =
    useNotes();
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");

  // Fetch notes on mount and after changes
  useEffect(() => {
    fetchNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddNote = () => {
    setModalMode("create");
    setSelectedNote(null);
    setIsFormModalOpen(true);
  };

  const handleEditNote = (note: Note) => {
    setModalMode("edit");
    setSelectedNote(note);
    setIsFormModalOpen(true);
  };

  const handleViewNote = (note: Note) => {
    setSelectedNote(note);
    setIsViewModalOpen(true);
  };

  const handleDeleteNote = async (noteId: string) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      try {
        await deleteNote(noteId);
        await fetchNotes();
      } catch (error) {
        console.error("Failed to delete note:", error);
      }
    }
  };

  const handleFormSubmit = async (data: CreateNoteData) => {
    try {
      if (modalMode === "create") {
        await createNote(data);
      } else if (selectedNote) {
        await updateNote(selectedNote.id, data);
      }
      await fetchNotes();
    } catch (error) {
      console.error("Failed to save note:", error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Notes
          </h1>
          <p className="text-gray-600 mt-1">Capture your thoughts and ideas</p>
        </div>
        <Button
          onClick={handleAddNote}
          className="bg-blue-600 hover:bg-blue-700 text-white"
          disabled={isLoading}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Note
        </Button>
      </div>

      {/* Notes Grid */}
      {notes.length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <div className="text-gray-500 mb-2">No notes found</div>
          <div className="text-sm text-gray-400 mb-4">
            Create your first note to get started
          </div>
          <Button
            onClick={handleAddNote}
            variant="outline"
            className="text-blue-600 border-blue-600 hover:bg-blue-50"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Your First Note
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onView={handleViewNote}
              onEdit={handleEditNote}
              onDelete={handleDeleteNote}
            />
          ))}
        </div>
      )}

      {/* Note Form Modal */}
      <NoteFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSubmit={handleFormSubmit}
        note={selectedNote}
        mode={modalMode}
      />

      {/* Note View Modal */}
      <NoteViewModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        note={selectedNote}
      />
    </div>
  );
};
