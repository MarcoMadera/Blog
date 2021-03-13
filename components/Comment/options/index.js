import Button from "./Button";
import { Image } from "../icons";
import { options } from "./optionList";
import { colors } from "../../../styles/theme";
import PropTypes from "prop-types";
import useDarkMode from "../../../hooks/useDarkMode";
import useComments from "../../../hooks/useComments";
import SendCommentButton from "../form/SendCommentButton";

export default function Options({
  textAreaRef,
  sendCommentRef,
  setCurrentCaret,
  selectTextArea,
}) {
  const { darkMode } = useDarkMode();
  const { sendFile } = useComments();

  return (
    <div className="options__container">
      <div className="options">
        {options.map(({ name, openMark, closeMark, children, type, mark }) => {
          return (
            <Button
              key={name}
              title={name}
              textAreaRef={textAreaRef}
              setCurrentCaret={setCurrentCaret}
              openMark={openMark}
              closeMark={closeMark}
              type={type}
              mark={mark}
            >
              {children}
            </Button>
          );
        })}
        <label
          htmlFor="imageInput"
          className="optionButton"
          aria-label="Incluir imagen"
          title="Subir imagen"
        >
          <Image width={23} height={23} />
          <input
            id="imageInput"
            type="file"
            accept="image/png, image/jpeg, image/webp"
            onChange={(e) => {
              e.preventDefault();
              sendFile(e.target.files);
            }}
          />
        </label>
      </div>
      <SendCommentButton sendCommentRef={sendCommentRef} />
      <style jsx>{`
        .options__container {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
        }
        @keyframes slide-bottom {
          0% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0);
          }
        }
        .options {
          visibility: ${selectTextArea ? "visible" : "hidden"};
          animation: slide-bottom 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
          display: flex;
          flex-wrap: wrap;
        }
        input[type="file"] {
          clip: rect(0, 0, 0, 0);
          width: 0;
          height: 0;
          padding: 0;
          position: absolute;
          width: 100%;
          height: 100%;
          margin: 0;
          top: 0;
          left: 0;
        }
        label {
          position: relative;
          border-radius: 3px;
          padding: 3px;
          border: 1px solid #cccccc4d;
          cursor: pointer;
          width: 32px;
          height: 32px;
          align-items: center;
          justify-content: center;
        }
        input:hover,
        input:focus,
        label:hover,
        label:focus {
          border: 1px solid #cccccca1;
        }
        label:focus-within,
        label:active {
          outline-style: dashed;
          outline-width: 2px;
          outline-color: #b50000;
        }
        input {
          background: ${darkMode ? colors.dark_background : colors.background};
          border: 1px solid #cccccc4d;
          border-radius: 4px;
          color: ${darkMode ? colors.dark_textColor : colors.textColor};
          font-family: Arial;
          padding: 0.5em;
        }
      `}</style>
    </div>
  );
}

Options.propTypes = {
  textAreaRef: PropTypes.object,
  sendCommentRef: PropTypes.object,
  setCurrentCaret: PropTypes.func,
  selectTextArea: PropTypes.bool,
  isValidComment: PropTypes.bool,
};
