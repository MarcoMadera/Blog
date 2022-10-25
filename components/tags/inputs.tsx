import { colors } from "styles/theme";
import useDarkMode from "hooks/useDarkMode";
import {
  DetailedHTMLProps,
  InputHTMLAttributes,
  ReactElement,
  useState,
} from "react";

function Color({ ...attribs }): ReactElement {
  const [initial, setInitial] = useState("#b50000");

  return (
    <>
      <input
        type="color"
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

export function Input({
  type,
  ...attribs
}: DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>): ReactElement {
  const { darkMode } = useDarkMode();

  if (type === "color") {
    return <Color type="color" {...attribs}></Color>;
  }

  return (
    <>
      <input type={type} {...attribs} />
      <style jsx>{`
        input {
          background: ${darkMode ? colors.cinder : colors.white};
          border: 1px solid ${colors.silverChalice};
          color: ${darkMode ? colors.greyGoose : colors.davyGrey};
        }
      `}</style>
      <style jsx>{`
        input {
          background-color: ${darkMode ? "#1a202c" : "#fff"};
          border-color: ${darkMode ? "#1a202c" : "#ccc"};
          border-style: solid;
          border-radius: 0.5rem;
          border-width: 1px;
          flex-shrink: 1;
          font-size: 1rem;
          height: 3rem;
          line-height: 2;
          line-height: 1.5rem;
          padding-left: 1rem;
          padding-right: 1rem;
          transition-duration: 0.2s;
          transition-property: color, background-color, border-color,
            text-decoration-color, fill, stroke, opacity, box-shadow, transform,
            filter, backdrop-filter;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          width: 100%;
        }
        input:focus {
          border-color: ${darkMode
            ? colors.deepCarminPink
            : colors.guardsmanRed};
          outline: 2px solid
            ${darkMode ? colors.deepCarminPink : colors.guardsmanRed};
        }
      `}</style>
    </>
  );
}
