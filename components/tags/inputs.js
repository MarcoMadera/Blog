import { colors } from "../../styles/theme";
import PropTypes from "prop-types";
import useDarkMode from "../../hooks/useDarkMode";
import { useState } from "react";
import styles from "./input.module.css";
function Color({ type, ...attribs }) {
  const [initial, setInitial] = useState("#b50000");

  return (
    <>
      <input
        type={type}
        value={initial}
        className={styles.inputColor}
        onChange={(e) => setInitial(e.target.value)}
        {...attribs}
      />
    </>
  );
}

export function Input({ type, ...attribs }) {
  const { darkMode } = useDarkMode();

  if (type === "color") {
    return <Color type="color" {...attribs}></Color>;
  }

  return (
    <>
      <input type={type} className={styles.input} {...attribs} />
      <style jsx>{`
        input {
          background: ${darkMode ? colors.dark_background : colors.background};
          border: 1px solid ${colors.accents1};
          color: ${darkMode ? colors.dark_textColor : colors.textColor};
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
