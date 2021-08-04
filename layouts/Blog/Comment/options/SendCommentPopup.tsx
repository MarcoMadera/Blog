import { createPortal } from "react-dom";
import {
  ReactPortal,
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { colors } from "styles/theme";
import useDarkMode from "hooks/useDarkMode";
import useComments from "hooks/useComments";
import useUser from "hooks/useUser";

interface SendCommentPopupProps {
  sendCommentRef: RefObject<HTMLButtonElement>;
}

export default function SendCommentPopup({
  sendCommentRef,
}: SendCommentPopupProps): ReactPortal | null {
  const [targetNode, setTargetNode] = useState<Element>();
  const { darkMode } = useDarkMode();
  const { isSubmittingComment, setIsSubmittingComment } = useComments();
  const { loginUserAnonymously } = useUser();
  const firstButtonRef = useRef<HTMLButtonElement | null>(null);
  const secondButtonRef = useRef<HTMLButtonElement | null>(null);
  const onPressKey = useCallback(
    (event) => {
      const firstElement = firstButtonRef.current;
      const lastElement = secondButtonRef.current;
      if (event.key === "Escape") {
        setIsSubmittingComment && setIsSubmittingComment(false);
      }
      if (
        !event.shiftKey &&
        document.activeElement !== firstElement &&
        event.key !== "Enter"
      ) {
        firstElement?.focus();
        return event.preventDefault();
      }
      if (
        event.shiftKey &&
        event.key === "Tab" &&
        document.activeElement !== lastElement &&
        event.key !== "Enter"
      ) {
        lastElement?.focus();
        event.preventDefault();
      }
      return;
    },
    [setIsSubmittingComment]
  );

  useEffect(() => {
    setTargetNode(document.querySelector("#global") as Element);
    document.addEventListener("keydown", onPressKey, false);

    return () => {
      document.removeEventListener("keydown", onPressKey, false);
    };
  }, [onPressKey]);

  if (targetNode === undefined || !setIsSubmittingComment) {
    return null;
  }
  return createPortal(
    <div className="popupConfirm">
      <div
        className="overlay"
        onClick={() => setIsSubmittingComment(false)}
        aria-checked={isSubmittingComment}
        onKeyDown={(e) => e.key === "Escape" && setIsSubmittingComment(false)}
        role="switch"
        tabIndex={0}
      ></div>
      <div
        className="popupContainer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="globalModalTitle"
        aria-describedby="globalModaldesc"
      >
        <h3 id="globalModalTitle">
          ¿Estás seguro de publicar un comentario de forma anónima?
        </h3>
        <p id="globalModaldesc">
          Al realizar esta acción las personas no te podrán identificar, no
          podrás eliminar el comentario en un futuro y el comentario puede ser
          eliminado sin previo aviso. Para evitar lo anterior identifícate con
          uno de los métodos proporcionados.
        </p>
        <div className="popupContainer_buttons">
          <button
            ref={firstButtonRef}
            tabIndex={0}
            onClick={(e) => {
              e.preventDefault();
              setIsSubmittingComment(false);
              sendCommentRef.current?.focus();
            }}
          >
            Cancelar
          </button>
          <button
            ref={secondButtonRef}
            onClick={async (e) => {
              e.preventDefault();
              await loginUserAnonymously();
              sendCommentRef.current?.focus();
            }}
          >
            Continuar
          </button>
        </div>
      </div>
      <style jsx>{`
        .popupContainer {
          background-color: ${darkMode
            ? colors.dark_accents3
            : colors.accents2};
        }
        button:nth-of-type(1) {
          background: ${darkMode ? colors.dark_secondary : colors.primary};
          border-color: ${darkMode ? colors.dark_secondary : colors.primary};
          color: ${colors.white};
        }

        button:nth-of-type(1):hover,
        button:nth-of-type(1):focus {
          background: ${darkMode ? colors.dark_tertiary : colors.tertiary};
          border-color: ${darkMode ? colors.dark_tertiary : colors.tertiary};
        }
      `}</style>
      <style jsx>{`
        h3 {
          margin: 0 0 10px 0;
        }
        .overlay {
          position: fixed;
          top: 0px;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.2);
        }
        .popupConfirm {
          position: fixed;
          top: 0px;
          left: 0;
          width: 100vw;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .popupContainer {
          display: block;
          position: fixed;
          width: calc(100% - 20px);
          max-width: 500px;
          padding: 10px;
          border: 1px solid #cccccc4d;
          border-radius: 4px;
        }
        p {
          margin: 0;
          font-size: 14px;
        }
        .popupContainer_buttons {
          display: flex;
          margin-top: 10px;
          justify-content: flex-end;
          flex-wrap: wrap;
        }
        button {
          padding: 6px 8px;
          font-weight: 400;
          background: transparent;
          border-radius: 5px;
          border: 1px solid #cccccc4d;
          cursor: pointer;
          color: inherit;
        }
        button:nth-of-type(1) {
          margin-right: 10px;
        }
        button:focus,
        button:hover {
          border: 1px solid #cccccca1;
        }
      `}</style>
    </div>,
    targetNode
  );
}