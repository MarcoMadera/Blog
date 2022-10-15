import { colors } from "styles/theme";
import useDarkMode from "hooks/useDarkMode";
import { ReactElement, useCallback, useState } from "react";
import { Comment } from "components/icons/Comment";
import { Share } from "components/icons/Share";
import { ModalShare } from "./ModalShare";

export function PillAction({
  title,
  slug,
}: {
  title: string;
  slug: string;
}): ReactElement {
  const { darkMode } = useDarkMode();
  const [openModal, setOpenModal] = useState(false);

  const handleCloseModal = useCallback(() => {
    setOpenModal(false);
  }, []);

  return (
    <div className="pillContainer">
      <a href="#Comment">
        <Comment
          width={30}
          height={30}
          fill={darkMode ? colors.dark_textColor : colors.textColor}
        />
      </a>
      <button
        onClick={() => {
          setOpenModal(true);
        }}
      >
        <Share
          width={30}
          height={30}
          fill={darkMode ? colors.dark_textColor : colors.textColor}
        />
      </button>
      {openModal && (
        <ModalShare
          title={title}
          slug={slug}
          handleCloseModal={handleCloseModal}
        />
      )}
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
          background: transparent;
          border: none;
          box-sizing: content-box;
          cursor: pointer;
        }

        @media screen and (min-width: 768px) {
          div {
            flex-direction: row;
          }
        }

        @media screen and (min-width: 1024px) {
          div {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
}
