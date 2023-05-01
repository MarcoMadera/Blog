import ReactDOM from "react-dom";
import { ReactPortal, useEffect, useState } from "react";
import useNotePopups from "hooks/useNotePopups";
import { useRouter } from "next/router";
import { getNode } from "utils/notes";
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

  if (targetNode === null) {
    throw new Error("NoteHighlight needs a target element with id: notes");
  }

  if (targetNode === undefined) {
    return null;
  }
  const path = router.asPath.split("#")[0];
  if (!notes || !notes?.[path]?.length) return null;

  return ReactDOM.createPortal(
    <section>
      {notes[path].map((note) => {
        const startNode = getNode(note.start);
        const endNode = getNode(note.end);
        if (!startNode || !endNode) {
          return null;
        }
        const range = new Range();
        range.setStart(startNode, note.startOffset);
        range.setEnd(endNode, note.endOffset);
        const rects = range.getClientRects();
        const rectsArray = Array.from(rects);

        function handleClick() {
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
          return (
            <div
              className="container"
              key={rect.y + rect.x}
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
            >
              {note.title || note.note ? (
                <div className={"helpText"}>
                  <div>
                    <H3>{note.title}</H3>
                    <p>{note.note}</p>
                  </div>
                </div>
              ) : null}
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
