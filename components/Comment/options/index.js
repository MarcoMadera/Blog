import Button from "./Button";
import {
  Image,
  Anchor,
  ImageCloud,
  BlockCode,
  BlockQuote,
  BulletList,
  CheckList,
  NumberList,
} from "../icons";
import LoginButtons from "../login";
import { colors } from "../../../styles/theme";
import PropTypes from "prop-types";
import useDarkMode from "../../../hooks/useDarkMode";
import useComments from "../../../hooks/useComments";
import useUser from "../../../hooks/useUser";

export default function Options({
  textAreaRef,
  setCurrentCaret,
  selectTextArea,
}) {
  const { darkMode } = useDarkMode();
  const {
    createComment,
    comment,
    isSubmittingComment,
    sendFile,
  } = useComments();
  const { user } = useUser();
  const options = [
    { name: "Título", type: "header", mark: "# ", children: "T" },
    { name: "Negrita", openMark: "**", closeMark: "**", children: "B" },
    { name: "Cursiva", openMark: "_", closeMark: "_", children: "I" },
    { name: "Tachado", openMark: "~~", closeMark: "~~", children: "D" },
    { name: "Código en línea", openMark: "`", closeMark: "`", children: "<>" },
    {
      name: "Bloque acotado",
      type: "blockquote",
      mark: "> ",
      children: <BlockQuote width={13} height={13} />,
    },
    {
      name: "Bloque de código",
      type: "blockCode",
      children: <BlockCode width={24} height={24} />,
    },
    {
      name: "Enlace",
      type: "anchor",
      children: <Anchor width={17} height={17} />,
    },
    {
      name: "Lista de puntos",
      type: "bulletList",
      mark: "- ",
      children: <BulletList width={20} height={20} />,
    },
    {
      name: "Lista de números",
      type: "numberList",
      mark: "1. ",
      children: <NumberList width={20} height={20} />,
    },
    {
      name: "Lista de tareas",
      type: "checkList",
      mark: "- [ ] ",
      children: <CheckList width={18} height={18} />,
    },
    {
      name: "Imagen por enlace",
      type: "anchorImage",
      children: <ImageCloud width={24} height={24} />,
    },
  ];

  async function handleSubmit(e) {
    e.preventDefault();
    await createComment(comment);
  }

  return (
    <div className="hiddenOptions">
      <div className="options__container">
        <div className="options">
          {options.map(
            ({ name, openMark, closeMark, children, type, mark }) => {
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
            }
          )}
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
        <input
          type="submit"
          value="Enviar comentario"
          onClick={(e) => handleSubmit(e)}
          disabled={isSubmittingComment}
        />
      </div>
      {!user && <LoginButtons />}
      <style jsx>{`
        .hiddenOptions {
          visibility: ${selectTextArea ? "visible" : "hidden"};
          animation: slide-bottom 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
        }
        .options__container {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          column-gap: 6px;
          row-gap: 5px;
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
          display: flex;
          flex-wrap: wrap;
          column-gap: 6px;
          row-gap: 5px;
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
        input[type="submit"] {
          cursor: pointer;
        }
        input[type="submit"]:hover,
        input[type="submit"]:focus,
        label:hover,
        label:focus {
          border: 1px solid #cccccca1;
        }
        @media screen and (max-width: 540px) {
          input[type="submit"] {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}

Options.propTypes = {
  textAreaRef: PropTypes.object,
  setCurrentCaret: PropTypes.func,
  selectTextArea: PropTypes.bool,
};
