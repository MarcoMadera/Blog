import NotesContext, { NotesContextProviderProps } from "context/NotesContext";
import { useContext } from "react";

export default function useNotePopups(): NotesContextProviderProps {
  const context = useContext(NotesContext);
  if (context === undefined) {
    throw new Error("useNotePopups must be used within a NotePopupsProvider");
  }

  return context;
}
