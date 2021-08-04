import useComments from "hooks/useComments";
import useDarkMode from "hooks/useDarkMode";
import { ReactElement } from "react";
import { colors } from "styles/theme";

export default function LoadMoreCommentsButton(): ReactElement {
  const { darkMode } = useDarkMode();
  const { setTimesLoadedComments } = useComments();
  return (
    <div>
      <button
        onClick={() => {
          setTimesLoadedComments && setTimesLoadedComments((val) => val + 1);
        }}
      >
        Ver más comentarios
      </button>
      <style jsx>{`
        button {
          color: ${darkMode ? colors.dark_textColor : colors.textColor};
        }
      `}</style>
      <style jsx>
        {`
          div {
            width: 100%;
          }
          button {
            display: block;
            border: 1px solid #cccccc4d;
            padding: 6px 8px;
            width: 100%;
            background: none;
            cursor: pointer;
            border-radius: 4px;
          }
        `}
      </style>
    </div>
  );
}
