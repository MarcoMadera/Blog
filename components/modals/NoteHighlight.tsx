import ReactDOM from "react-dom";
import { ReactPortal, useEffect, useState } from "react";
import useNotePopups from "hooks/useNotePopups";
import { useRouter } from "next/router";
import { getNoteRects } from "utils/notes";
import { useModal } from "hooks/useModal";
import EditNote from "components/EditNote";
import { H3 } from "components/tags";

export default function NoteHighlight(): ReactPortal | null {
  const [targetNode, setTargetNode] = useState<Element | null>();
  const { notes } = useNotePopups();
  const router = useRouter();
  const { setModalData } = useModal();

  useEffect(() => {
    setTargetNode(document.querySelector("#notes"));
  }, []);

  const path = router.asPath.split("#")[0];
  if (!targetNode || !notes || !notes?.[path]?.length) return null;

  return ReactDOM.createPortal(
    <section>
      {notes[path].map((note) => {
        const { range, rectsArray } = getNoteRects(note);
        if (!range || !rectsArray) return null;

        function handleClick() {
          if (!range) return;
          setModalData({
            title: "Editar Nota",
            modalElement: (
              <EditNote
                range={range}
                id={note.id}
                name={note.title}
                description={note.note}
                color={note.color}
                type="edit"
              />
            ),
          });
        }

        return rectsArray.map((rect) => {
          const displayNote = !!(note.title || note.note);
          return (
            <div
              className="container"
              key={`${note.id}-${rect.x}-${rect.y}`}
              style={{
                top: rect.y + window.scrollY + "px",
                left: rect.x + "px",
                width: rect.width + "px",
                height: rect.height + "px",
                backgroundColor: note.color + "70",
              }}
              onClick={handleClick}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleClick();
                }
              }}
              role="button"
              tabIndex={0}
              data-prop-id={note.id}
            >
              {displayNote && (
                <div className={"helpText"}>
                  <div>
                    <H3>{note.title}</H3>
                    <p>{note.note}</p>
                  </div>
                </div>
              )}
            </div>
          );
        });
      })}
      <style jsx>{`
        .container {
          position: absolute;
          background-color: #c3e01f36;
          cursor: pointer;
        }
        .helpText {
          visibility: hidden;
          opacity: 0;
          transition: opacity 0.3s ease-in-out;
        }
        .container:hover .helpText {
          visibility: visible;
          opacity: 1;
        }
        .helpText {
          position: absolute;
          top: -40px;
          left: 0;
          visibility: hidden;
          width: 240px;
          z-index: 3;
        }
        .helpText div {
          background: #282828;
          box-shadow: 0 4px 4px #00000040;
          font-size: 14px;
          color: #f0f0f0;
          box-sizing: border-box;
          border-radius: 8px;
          text-align: start;
          cursor: default;
          display: inline-block;
          max-inline-size: 240px;
          position: relative;
          font-weight: 400;
          padding: 8px 12px;
          text-transform: initial;
          overflow-wrap: break-word;
          line-height: 1.5;
        }
      `}</style>
    </section>,
    targetNode
  );
}
