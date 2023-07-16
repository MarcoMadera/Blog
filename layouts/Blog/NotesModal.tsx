import ActionButton from "components/ActionButton";
import { H3, Li, P, Ul } from "components/tags";
import { useModal } from "hooks/useModal";
import useNotePopups from "hooks/useNotePopups";
import { useRouter } from "next/router";
import { ReactElement } from "react";

export default function NotesModal(): ReactElement {
  const { notes } = useNotePopups();
  const { setModalData } = useModal();
  const router = useRouter();
  const path = router.asPath.split("#")[0];

  if (!notes?.[path]?.length) {
    return (
      <div>
        <P>Aquí aparecerán tus notas</P>
        <Ul>
          <Li>
            Para hacer una nota, selecciona un texto y haz click en el icono de
            nota que aparece.
          </Li>
          <Li>
            Para ver las notas de este post, haz click en el icono de nota que
            aparece en la parte superior derecha.
          </Li>
          <Li>
            Para ver las notas de otro post, ve a ese post y haz click en el
            icono de nota que aparece en la parte superior derecha.
          </Li>
          <Li>
            Para ver todas las notas, ve a la página de notas haciendo click en
            el icono de nota que aparece en la parte superior derecha.
          </Li>
        </Ul>
      </div>
    );
  }

  return (
    <div className="container">
      {notes?.[path].map((note) => {
        if (!note.title || !note.note) return null;
        return (
          <div
            key={note.id}
            className="note"
            style={{ backgroundColor: note.color + "33" }}
          >
            <H3>{note.title}</H3>
            <P>{note.note}</P>
            <div className="footer">
              <ActionButton
                type="button"
                onClick={() => {
                  const noteElement = document.querySelector(
                    `[data-prop-id=${note.id}]`
                  );
                  noteElement?.scrollIntoView();
                  setModalData(null);
                }}
              >
                Ir a la nota
              </ActionButton>
            </div>
          </div>
        );
      })}
      <style jsx>{`
        :global(.modal) {
          display: flex;
          flex-direction: column;
        }
        .container {
          max-height: 100%;
          overflow-y: auto;
        }
        .note {
          border-radius: 6px;
          width: 100%;
          padding: 10px 12px;
          margin-bottom: 24px;
        }
        .footer {
          display: flex;
          justify-content: flex-end;
        }
      `}</style>
    </div>
  );
}
