import Button from "./Button";
import { Image, Anchor } from "../icons";
import LoginButtons from "../login";
import { ThemeContext } from "../../Layout";
import { colors } from "../../../styles/theme";
import { useContext } from "react";
import PropTypes from "prop-types";

export default function Options({
  user,
  handleDrop,
  handleSubmit,
  submitComment,
  commentText,
  setCurrentCaret,
  setComment,
  setInfo,
  setUser,
  selectTextArea,
}) {
  const { darkMode } = useContext(ThemeContext);
  const options = [
    { name: "Cursiva", tagName: "i", children: "I" },
    { name: "Negrita", tagName: "strong", children: "B" },
    { name: "Tachado", tagName: "del", children: "D" },
    { name: "Subrayado", tagName: "u", children: "U" },
    {
      name: "Enlace",
      tagName: "enlace",
      attr: "a",
      children: <Anchor width={17} height={17} />,
    },
  ];

  return (
    <div className="hiddenOptions">
      <div className="options__container">
        <div className="options">
          <label
            htmlFor="imageInput"
            className="optionButton"
            aria-label="Incluir imagen"
            title="Imagen"
          >
            <Image width={23} height={23} />
            <input
              id="imageInput"
              type="file"
              accept="image/png, image/jpeg, image/webp"
              onChange={(e) => {
                e.preventDefault();
                handleDrop(e.target.files[0]);
              }}
            />
          </label>
          {options.map(({ name, tagName, children, attr }) => {
            return (
              <Button
                key={tagName}
                title={name}
                commentText={commentText}
                setCurrentCaret={setCurrentCaret}
                setComment={setComment}
                tagName={tagName}
                setInfo={setInfo}
                attr={attr}
              >
                {children}
              </Button>
            );
          })}
        </div>
        <input
          type="submit"
          value="Enviar comentario"
          onClick={(e) => handleSubmit(e)}
          disabled={submitComment}
        />
      </div>
      {!user && <LoginButtons setInfo={setInfo} setUser={setUser} />}
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
      `}</style>
    </div>
  );
}

Options.propTypes = {
  user: PropTypes.object,
  handleDrop: PropTypes.func,
  handleSubmit: PropTypes.func,
  submitComment: PropTypes.bool,
  commentText: PropTypes.object,
  setCurrentCaret: PropTypes.func,
  setComment: PropTypes.func,
  setInfo: PropTypes.func,
  setUser: PropTypes.func,
  selectTextArea: PropTypes.bool,
};