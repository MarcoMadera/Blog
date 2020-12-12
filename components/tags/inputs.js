import { colors } from "../../styles/theme";
import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { ThemeContext } from "../Layout";

const Color = ({ type, ...attribs }) => {
  const [initial, setInitial] = useState("#b50000");
  return (
    <>
      <input
        type={type}
        value={initial}
        onChange={(e) => setInitial(e.target.value)}
        {...attribs}
      />
      <style jsx>{`
        input {
          border-radius: 100%;
          height: 40px;
          width: 40px;
          border: none;
          outline: none;
          cursor: pointer;
          -webkit-appearance: none;
          padding: 0;
          overflow: hidden;
        }
        input[type="color"]::-webkit-color-swatch-wrapper {
          padding: 0;
        }
        input[type="color"]::-webkit-color-swatch {
          border: none;
          border-radius: 100%;
        }
      `}</style>
    </>
  );
};

export const Input = ({ type, ...attribs }) => {
  const { darkMode } = useContext(ThemeContext);
  if (type === "color") {
    return <Color type="color" {...attribs}></Color>;
  }
  return (
    <>
      <input type={type} {...attribs} />
      <style jsx>{`
        input {
          background: ${darkMode ? colors.background : "#fff"};
          color: ${darkMode ? colors.color : "#000"};
          border: 1px solid ${colors.gray};
          border-radius: 4px;
          padding: 0.5em;
        }
      `}</style>
    </>
  );
};

Input.propTypes = {
  type: PropTypes.string,
};
Color.propTypes = {
  type: PropTypes.string,
};
