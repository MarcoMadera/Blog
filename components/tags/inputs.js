import { colors } from "../../styles/theme";
import PropTypes from "prop-types";
import useDarkMode from "../../hooks/useDarkMode";
import { useState } from "react";
function Color({ type, ...attribs }) {
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
          -webkit-appearance: none;
          border: none;
          border-radius: 100%;
          cursor: pointer;
          height: 40px;
          outline: none;
          overflow: hidden;
          padding: 0;
          width: 40px;
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
}

export function Input({ type, node, ...attribs }) {
  const { darkMode } = useDarkMode();

  if (type === "color") {
    return <Color type="color" {...attribs}></Color>;
  }

  return (
    <>
      <input type={type} {...attribs} />
      <style jsx>{`
        input {
          background: ${darkMode ? colors.dark_background : colors.background};
          border: 1px solid ${colors.accents1};
          color: ${darkMode ? colors.dark_textColor : colors.textColor};
        }
      `}</style>
      <style jsx>{`
        input {
          border-radius: 4px;
          font-family: Arial;
          padding: 0.5em;
        }
      `}</style>
    </>
  );
}

Color.propTypes = {
  type: PropTypes.string,
};
Input.propTypes = {
  type: PropTypes.string,
};
