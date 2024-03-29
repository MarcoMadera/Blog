import { colors } from "styles/theme";
import useDarkMode from "hooks/useDarkMode";
import { ReactElement } from "react";
import { Comment } from "components/icons/Comment";
import { Share } from "components/icons/Share";
import { ModalShare } from "./ModalShare";
import { ModalWebMention } from "./ModalWebMention";
import { WebMention } from "components/icons/WebMention";
import { useModal } from "hooks/useModal";
import NotesModal from "./NotesModal";
import { Note } from "components/icons/Note";

export function PillAction({
  title,
  slug,
}: {
  title: string;
  slug: string;
}): ReactElement {
  const { darkMode } = useDarkMode();
  const { setModalData } = useModal();

  return (
    <div className="pillContainer">
      <a href="#Comment">
        <Comment
          width={30}
          height={30}
          fill={darkMode ? colors.greyGoose : colors.davyGrey}
        />
      </a>
      <button
        onClick={() => {
          setModalData({
            title: "Comparte este post",
            maxWidth: "800px",
            minWidth: "500px",
            modalElement: <ModalShare title={title} slug={slug} />,
          });
        }}
      >
        <Share
          width={26}
          height={26}
          fill={darkMode ? colors.greyGoose : colors.davyGrey}
        />
      </button>
      <button
        onClick={() => {
          setModalData({
            title: "Menciones",
            maxWidth: "800px",
            minWidth: "500px",
            modalElement: <ModalWebMention title={title} slug={slug} />,
          });
        }}
      >
        <WebMention
          width={26}
          height={26}
          fill={darkMode ? colors.greyGoose : colors.davyGrey}
        />
      </button>
      <button
        onClick={() => {
          setModalData({
            title: "Tus notas",
            maxWidth: "800px",
            minWidth: "500px",
            modalElement: <NotesModal />,
          });
        }}
      >
        <Note
          width={26}
          height={26}
          fill={darkMode ? colors.greyGoose : colors.davyGrey}
        />
      </button>
      <style jsx>{`
        .pillContainer {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          margin: 0 auto;
          position: sticky;
          height: fit-content;
          margin-top: 1210px;
          top: 50%;
          transform: translateY(-50%);
          gap: 30px;
          background-color: transparent;
          border-radius: 50px;
          width: fit-content;
          padding: 30px 4px;
        }
        h2 {
          margin: 0;
        }
        .pillContainer :global(svg) {
          margin: 0 10px;
        }
        .pillContainer :global(button),
        button {
          border: none;
          box-sizing: content-box;
          cursor: pointer;
        }
        a,
        button {
          height: 64px;
          width: 64px;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0;
          box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px,
            rgba(0, 0, 0, 0.1) 0px 4px 6px -4px;
          background-color: ${darkMode ? "#1f2937" : "#fefefe"};
          border-radius: 50%;
          transition: all 0.2s ease 0s;
        }
        a:hover,
        button:hover,
        a:focus,
        button:focus {
          box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px,
            rgba(0, 0, 0, 0.1) 0px 10px 10px -5px;
          background-color: ${darkMode ? "#3f4a59" : "#fafcff"};
          opacity: 0.8;
        }
      `}</style>
    </div>
  );
}
