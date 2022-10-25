import Button from "./Button";
import { Image as ImageIcon } from "components/icons";
import { options } from "./optionList";
import { colors } from "styles/theme";
import useDarkMode from "hooks/useDarkMode";
import useComments from "hooks/useComments";
import SendCommentButton from "../form/SendCommentButton";
import { Dispatch, ReactElement, RefObject, SetStateAction } from "react";
import useToolTip from "hooks/useToolTip";

interface OptionsProps {
  textAreaRef: unknown;
  sendCommentRef: unknown;
  setCurrentCaret: Dispatch<
    SetStateAction<{
      start: number;
      end: number;
    }>
  >;
  selectTextArea: boolean;
}

export default function Options({
  textAreaRef,
  sendCommentRef,
  setCurrentCaret,
  selectTextArea,
}: OptionsProps): ReactElement {
  const { darkMode } = useDarkMode();
  const { uploadImage } = useComments();
  const { getToolTipAttributes } = useToolTip();

  return (
    <div className="options__container">
      <div className="options">
        {options.map(({ name, openMark, closeMark, children, type, mark }) => {
          return (
            <Button
              key={name}
              name={name}
              textAreaRef={textAreaRef as RefObject<HTMLTextAreaElement>}
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
          aria-label="Subir imagen"
          {...getToolTipAttributes("Subir imagen")}
        >
          <ImageIcon width={23} height={23} />
          <input
            id="imageInput"
            type="file"
            accept="image/png, image/jpeg, image/webp"
            onChange={(e) => {
              e.preventDefault();
              if (e.target.files) {
                uploadImage(e.target.files);
              }
            }}
          />
        </label>
      </div>
      <SendCommentButton sendCommentRef={sendCommentRef} />
      <style jsx>{`
        .options {
          visibility: ${selectTextArea ? "visible" : "hidden"};
          animation: slide-bottom 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
        }
        @keyframes slide-bottom {
          0% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0);
          }
        }
        input {
          background: ${darkMode ? colors.cinder : colors.white};
          color: ${darkMode ? colors.greyGoose : colors.davyGrey};
        }
      `}</style>
      <style jsx>{`
        .options__container {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
        }
        .options {
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
          border: 1px solid #cccccc4d;
          border-radius: 4px;
          font-family: Arial;
          padding: 0.5em;
        }
      `}</style>
    </div>
  );
}
