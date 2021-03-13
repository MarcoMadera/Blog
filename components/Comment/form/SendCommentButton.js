import useComments from "../../../hooks/useComments";
import useDarkMode from "../../../hooks/useDarkMode";
import { colors } from "../../../styles/theme";
import PropTypes from "prop-types";

const SendCommentButton = ({ sendCommentRef }) => {
  const { setIsSubmittingComment } = useComments();
  const { darkMode } = useDarkMode();
  return (
    <>
      <button
        ref={sendCommentRef}
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
          border: 1px solid #cccccc4d;
          border-radius: 4px;
          color: ${darkMode ? colors.dark_textColor : colors.textColor};
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
};

export default SendCommentButton;

SendCommentButton.propTypes = {
  sendCommentRef: PropTypes.object,
};
