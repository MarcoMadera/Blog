import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { colors } from "../styles/theme";
import useDarkMode from "../hooks/useDarkMode";
import { Info } from "../components/Comment/icons/index";
import useNotification from "../hooks/useNotification";
import Error from "./Comment/icons/Error";

export default function Notification() {
  const [targetNode, setTargetNode] = useState();
  const { darkMode } = useDarkMode();
  const {
    notification,
    removeNotification,
    notificationCount,
  } = useNotification();

  useEffect(() => {
    setTargetNode(document.querySelector("#notification"));
  }, []);

  useEffect(() => {
    notification.forEach((singleNotification) => {
      if (singleNotification.id === notificationCount) {
        const displayTime = setTimeout(() => {
          removeNotification(singleNotification.id);
        }, 10000);
        return () => {
          clearTimeout(displayTime);
        };
      }
    });
  }, [notification, removeNotification, notificationCount]);

  if (targetNode === undefined) {
    return null;
  }

  if (notification.length > 0) {
    return createPortal(
      <section>
        {notification.map(({ id, variant, message }) => {
          return (
            <article key={id} role="alertdialog" aria-labelledby="alertText">
              {variant === "info" && <Info width={20} height={20} />}
              {variant === "error" && <Error width={20} height={20} />}
              <p id="alertText">{message}</p>
              <button
                aria-label="Eliminar notificación"
                onClick={() => {
                  removeNotification(id);
                }}
                aria-hidden={true}
              >
                x
              </button>
            </article>
          );
        })}
        <style jsx>{`
          p {
            font-size: 14px;
            align-items: center;
            grid-gap: 10px;
            overflow-wrap: break-word;
            margin: 0;
          }
          article {
            grid-template-columns: 20px minmax(0, 1fr) 20px;
            display: grid;
            background-color: ${darkMode
              ? colors.dark_accents3
              : colors.accents2};
            padding: 10px;
            border: 1px solid #cccccc4d;
            border-radius: 4px;
            width: 100%;
            text-decoration: none;
            column-gap: 10px;
          }
          article > :global(svg) {
            align-self: center;
          }
          section {
            max-width: 400px;
            width: calc(100% - 20px);
            position: fixed;
            display: flex;
            flex-direction: column;
            row-gap: 10px;
            right: 10px;
            top: 0px;
            transition: 0.3s ease 0s;
            animation: slide-bottom 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94)
              both;
          }
          @keyframes slide-bottom {
            0% {
              transform: translateY(0);
            }
            100% {
              transform: translateY(
                ${notification.length > 0 ? "10px" : "-500px"}
              );
            }
          }
          button {
            border: none;
            font-family: monospace;
            user-select: none;
            font-size: 18px;
            line-height: 10px;
            width: 16px;
            height: 16px;
            background: none;
            float: right;
            color: ${darkMode ? colors.dark_textColor : colors.textColor};
            cursor: pointer;
          }
          @media screen and (min-width: 500px) {
            article {
              max-width: 400px;
            }
          }
        `}</style>
      </section>,
      targetNode
    );
  }
  return null;
}
