import {
  useState,
  createContext,
  Dispatch,
  SetStateAction,
  ReactElement,
  PropsWithChildren,
  useMemo,
  useCallback,
} from "react";
import { Note, removeToLocalStorage, saveToLocalStorage } from "utils/notes";

type path = string;

export interface NotesContextProviderProps {
  notes: Record<path, Note[]> | null;
  setNotes: Dispatch<SetStateAction<NotesContextProviderProps["notes"]>>;
  addNote: (path: string, note: Note) => void;
  removeNote: (path: string, id: string) => void;
}

const NotesContext = createContext<NotesContextProviderProps | undefined>(
  undefined
);

export function NotesContextProvider({
  children,
}: PropsWithChildren): ReactElement {
  const [notes, setNotes] = useState<Record<path, Note[]> | null>(null);
  const addNote = useCallback(
    (path: string, note: Note) => {
      const postNotes = notes && notes?.[path];
      const isExist = postNotes && postNotes.find((n) => n.id === note.id);
      if (isExist) {
        const noteIndex = postNotes?.findIndex((n) => n.id === note.id);
        if (noteIndex !== -1) {
          setNotes({
            ...notes,
            [path]: [
              ...notes[path].slice(0, noteIndex),
              note,
              ...notes[path].slice(noteIndex + 1),
            ],
          });
        }
      }

      if (!isExist) {
        setNotes((notes) => {
          if (!notes) return { [path]: [note] };
          return {
            ...notes,
            [path]: [...notes[path], note],
          };
        });
      }
      saveToLocalStorage(note);
    },
    [notes]
  );

  const removeNote = useCallback(
    (path: string, id: string) => {
      if (notes && notes[path]) {
        notes[path] = notes[path].filter((note) => note.id !== id);
      }

      removeToLocalStorage(id);
    },
    [notes]
  );

  const value = useMemo(
    () => ({ notes, setNotes, addNote, removeNote }),
    [notes, setNotes, addNote, removeNote]
  );

  return (
    <NotesContext.Provider value={value}>{children}</NotesContext.Provider>
  );
}

export default NotesContext;
