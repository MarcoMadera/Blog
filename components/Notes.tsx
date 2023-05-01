import { useNotes } from "hooks/useNotes";
import {
  DetailedHTMLProps,
  HTMLAttributes,
  PropsWithChildren,
  ReactElement,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";
import NoteButton from "./NoteButton";

const Notes = forwardRef(
  (
    {
      children,
      ...props
    }: PropsWithChildren<
      DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
    >,
    ref
  ): ReactElement => {
    const highlighterRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    useNotes(contentRef, highlighterRef);

    useImperativeHandle(ref, () => contentRef.current);

    return (
      <>
        <div ref={contentRef} {...props}>
          {children}
        </div>
        <div
          style={{ position: "fixed" }}
          className="hidden"
          ref={highlighterRef}
        >
          <NoteButton />
        </div>
      </>
    );
  }
);

export default Notes;
Notes.displayName = "Notes";
