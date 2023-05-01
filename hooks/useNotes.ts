import { useRouter } from "next/router";
import { RefObject, useEffect } from "react";
import { Note } from "utils/notes";
import useNotePopups from "./useNotePopups";

export function useNotes(
  contentRef: RefObject<HTMLElement>,
  highlighterRef: RefObject<HTMLDivElement>
): void {
  const router = useRouter();
  const { setNotes } = useNotePopups();

  useEffect(() => {
    const handleResize = () => {
      const path = router.asPath.split("#")[0];
      const selectedHtmlDataString =
        localStorage.getItem("selectedHtmlData") || "{}";
      const selectedHtmlData = JSON.parse(selectedHtmlDataString);
      const htmlData: Note[] = selectedHtmlData[path];
      if (!htmlData) {
        return;
      }

      setNotes(selectedHtmlData);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [router.asPath, setNotes]);

  useEffect(() => {
    const highlighterPopup = highlighterRef.current;
    if (!contentRef.current || !highlighterPopup) return;
    const content = contentRef.current;
    const handleSelectionChange = () => {
      const selection = window.getSelection();
      const isSelectionInsideContentRef = content?.contains(
        selection?.anchorNode?.parentElement || null
      );
      if (
        selection?.toString() &&
        highlighterPopup &&
        isSelectionInsideContentRef
      ) {
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();

        highlighterPopup.style.top = `${
          rect.top - highlighterPopup.offsetHeight
        }px`;
        highlighterPopup.style.left = `${
          rect.left + rect.width / 2 - highlighterPopup.offsetWidth / 2
        }px`;

        highlighterPopup.classList.remove("hidden");
      } else {
        highlighterPopup?.classList.add("hidden");
      }
    };
    document.addEventListener("selectionchange", handleSelectionChange);
    return () => {
      document.removeEventListener("selectionchange", handleSelectionChange);
    };
  }, [contentRef, highlighterRef]);
}
