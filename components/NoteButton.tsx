import { useModal } from "hooks/useModal";
import { ReactElement } from "react";
import EditNote from "./EditNote";
import { getSelectionRange } from "utils/notes";
import useNotification from "hooks/useNotification";
import { nanoid } from "nanoid";

export default function NoteButton(): ReactElement {
  const { setModalData } = useModal();
  const { addNotification } = useNotification();
  return (
    <button
      className="noteButton"
      onClick={() => {
        const range = getSelectionRange();
        if (!range) {
          addNotification({
            message: "Selecciona un texto para crear una nota",
            variant: "error",
          });
          return;
        }
        const id = nanoid();
        setModalData({
          title: "Nueva nota",
          modalElement: (
            <EditNote range={range} id={id} name="" description="" type="new" />
          ),
        });
      }}
    >
      <div className="noteButton__icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 2L12 22" />
          <path d="M5.33 9.33L12 2L18.67 9.33" />
        </svg>
      </div>
      <div className="noteButton__text">Crear una nota</div>
      <style jsx>{`
        .noteButton {
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #f5f5f5;
          border: 1px solid #e0e0e0;
          border-radius: 4px;
          padding: 0.5rem 1rem;
          font-size: 0.875rem;
          font-weight: 500;
          color: #757575;
          cursor: pointer;
          transition: all 0.2s ease-in-out;
        }
        .noteButton:hover {
          background-color: #e0e0e0;
        }
        .noteButton__icon {
          margin-right: 0.5rem;
        }
        .noteButton__icon svg {
          width: 1rem;
          height: 1rem;
        }
        @media (min-width: 768px) {
          .noteButton__text {
            display: block;
          }
        }

        @media (min-width: 1024px) {
          .noteButton {
            padding: 0.5rem 1.5rem;
          }
        }

        @media (min-width: 1280px) {
          .noteButton {
            padding: 0.5rem 2rem;
          }
        }
      `}</style>
    </button>
  );
}
