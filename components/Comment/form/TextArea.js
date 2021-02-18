import { colors } from "../../../styles/theme";
import PropTypes from "prop-types";
import useDarkMode from "../../../hooks/useDarkMode";

export default function TextArea({
  setComment,
  setSelectTextArea,
  comment,
  commentText,
  handleDrop,
  setDrag,
  drag,
}) {
  const { darkMode } = useDarkMode();

  function handleDragEnter(e) {
    e.preventDefault();
    setDrag("Enter");
  }
  function handleDragLeave(e) {
    e.preventDefault();
    setDrag("Leave");
  }

  return (
    <>
      <textarea
        id="Comment"
        maxLength="800"
        placeholder="Escribe tu comentario"
        onChange={(e) => setComment(e.target.value)}
        onFocus={() => setSelectTextArea(true)}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={(e) => {
          e.preventDefault();
          handleDrop(e.dataTransfer.files[0]);
        }}
        value={comment}
        ref={commentText}
      ></textarea>
      <style jsx>{`
        textarea {
          width: 100%;
          min-width: 100%;
          max-width: 100%;
          height: 94px;
          font-size: 14px;
          margin: 2px 0;
          min-height: 94px;
          max-height: 200px;
          background-color: ${drag === "Enter"
            ? darkMode
              ? "rgba(235,235,235,0.1)"
              : "rgba(35,35,35,0.1)"
            : "initial"};
          background-image: ${drag === "Enter"
            ? darkMode
              ? "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 58 58'%3E%3Cpath fill='%23fff' d='M50.466 45.495l6.483-3.241-17.637-6.498 6.498 17.638 3.242-6.484 6.797 6.797a1.001 1.001 0 001.415-1.414l-6.798-6.798zm-7.778-6.364l9.232 3.402-3.887 1.943-1.943 3.888-3.402-9.233zM21.569 17.569C21.569 14.498 19.071 12 16 12s-5.569 2.498-5.569 5.569c0 3.07 2.498 5.568 5.569 5.568s5.569-2.497 5.569-5.568zm-9.138 0C12.431 15.602 14.032 14 16 14s3.569 1.602 3.569 3.569-1.601 3.569-3.569 3.569-3.569-1.601-3.569-3.569zM51.324 30.737a1 1 0 001.351-1.475l-12-11a.97.97 0 00-.72-.262.998.998 0 00-.694.325l-9.794 10.727-4.743-4.743a1.004 1.004 0 00-1.368-.044L6.339 39.249A1.002 1.002 0 007 41a.998.998 0 00.661-.249l16.313-14.362 7.319 7.318a.999.999 0 101.414-1.414l-1.825-1.825 9.18-10.054 11.262 10.323z'/%3E%3Cpath fill='%23fff' d='M57 4H1a1 1 0 00-1 1v44a1 1 0 001 1h37a1 1 0 100-2H2V6h54v31a1 1 0 102 0V5a1 1 0 00-1-1z'/%3E%3C/svg%3E\")"
              : "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 58 58'%3E%3Cpath d='M50.466 45.495l6.483-3.241-17.637-6.498 6.498 17.638 3.242-6.484 6.797 6.797a1.001 1.001 0 001.415-1.414l-6.798-6.798zm-7.778-6.364l9.232 3.402-3.887 1.943-1.943 3.888-3.402-9.233zM21.569 17.569C21.569 14.498 19.071 12 16 12s-5.569 2.498-5.569 5.569c0 3.07 2.498 5.568 5.569 5.568s5.569-2.497 5.569-5.568zm-9.138 0C12.431 15.602 14.032 14 16 14s3.569 1.602 3.569 3.569-1.601 3.569-3.569 3.569-3.569-1.601-3.569-3.569zM51.324 30.737a1 1 0 001.351-1.475l-12-11a.97.97 0 00-.72-.262.998.998 0 00-.694.325l-9.794 10.727-4.743-4.743a1.004 1.004 0 00-1.368-.044L6.339 39.249A1.002 1.002 0 007 41a.998.998 0 00.661-.249l16.313-14.362 7.319 7.318a.999.999 0 101.414-1.414l-1.825-1.825 9.18-10.054 11.262 10.323z'/%3E%3Cpath d='M57 4H1a1 1 0 00-1 1v44a1 1 0 001 1h37a1 1 0 100-2H2V6h54v31a1 1 0 102 0V5a1 1 0 00-1-1z'/%3E%3C/svg%3E\")"
            : "initial"};
          background-position: center center;
          background-repeat: no-repeat;
          background-size: 60px 60px;
          border: 1px solid #cccccc4d;
          outline: ${drag === "Enter"
            ? `2px dashed ${colors.primary}`
            : "unset"};
          border-radius: 4px;
          color: ${darkMode ? colors.dark_textColor : colors.textColor};
          font-family: Arial;
          padding: 4px 8px;
        }
        textarea:focus {
          outline-style: dashed;
          outline-width: 2px;
          outline-color: ${colors.primary};
        }
        textarea:after {
          display: block;
          content: "";
          position: absolute;
          z-index: 99;
          width: calc(100% + 40px);
          height: calc(100% + 40px);
          border: ${drag === "Enter"
            ? `2px dashed ${colors.primary}`
            : "2px solid transparent"};
        }
      `}</style>
    </>
  );
}

TextArea.propTypes = {
  setComment: PropTypes.func,
  setSelectTextArea: PropTypes.func,
  comment: PropTypes.string,
  commentText: PropTypes.object,
  handleDrop: PropTypes.func,
  setDrag: PropTypes.func,
  drag: PropTypes.string,
};
