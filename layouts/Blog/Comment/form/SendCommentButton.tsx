import useComments from "hooks/useComments";
import useDarkMode from "hooks/useDarkMode";
import { ReactElement, RefObject } from "react";
import { colors } from "styles/theme";

interface SendCommentButtonProps {
  sendCommentRef: unknown;
}

export default function SendCommentButton({
  sendCommentRef,
}: SendCommentButtonProps): ReactElement {
  const { setIsSubmittingComment } = useComments();
  const { darkMode } = useDarkMode();

  return (
    <>
      <button
        ref={sendCommentRef as RefObject<HTMLButtonElement>}
        onClick={(e) => {
          e.preventDefault();
          setIsSubmittingComment(true);
        }}
      >
        Enviar comentario
      </button>
      <style jsx>{`
        button {
          background: ${darkMode ? colors.dark_background : colors.background};
          color: ${darkMode ? colors.dark_textColor : colors.textColor};
        }
      `}</style>
      <style jsx>{`
        button {
          border: 1px solid #cccccc4d;
          border-radius: 4px;
          font-family: Arial;
          padding: 0.5em;
          cursor: pointer;
          height: 32px;
        }
        button:hover,
        button:focus,
        label:hover,
        label:focus {
          border: 1px solid #cccccca1;
        }
        @media screen and (max-width: 540px) {
          button {
            width: 100%;
          }
        }
      `}</style>
    </>
  );
}
