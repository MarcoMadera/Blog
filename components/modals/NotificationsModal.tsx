import { createPortal } from "react-dom";
import { ReactPortal, useEffect, useState } from "react";
import { colors } from "styles/theme";
import useDarkMode from "hooks/useDarkMode";
import { Info, Error } from "components/icons";
import useNotification from "hooks/useNotification";

export default function NotificationsModal(): ReactPortal | null {
  const [targetNode, setTargetNode] = useState<Element>();
  const { darkMode } = useDarkMode();
  const { notifications, removeNotification, setNotifications } =
    useNotification();

  useEffect(() => {
    setTargetNode(document.querySelector("#notification") as Element);
  }, []);

  useEffect(() => {
    notifications?.forEach(({ id, isTimeOut }) => {
      if (isTimeOut) {
        return;
      }
      const displayTime = setTimeout(() => {
        if (!removeNotification) {
          return;
        }
        removeNotification(id);
      }, 10000);

      if (!setNotifications) {
        return;
      }

      setNotifications((allNotifications) => {
        if (!allNotifications) {
          return;
        }
        const notificationsToSet = [...allNotifications];
        const currentNotification = allNotifications?.find(
          (noti) => noti.id === id
        );
        notificationsToSet?.splice(
          notificationsToSet?.findIndex((item) => item.id === id),
          1
        );
        if (currentNotification) {
          currentNotification.isTimeOut = true;
          return [...notificationsToSet, currentNotification];
        }
        return;
      });

      return () => {
        clearTimeout(displayTime);
      };
    });
  }, [notifications, removeNotification, setNotifications]);

  if (targetNode === undefined || !notifications) {
    return null;
  }

  if (notifications.length > 0) {
    return createPortal(
      <section>
        {notifications.map(({ id, variant, message }) => {
          return (
            <article key={id} role="alertdialog" aria-labelledby="alertText">
              <div>
                {variant === "info" && <Info width={20} height={20} />}
                {variant === "error" && <Error width={20} height={20} />}
                <p id="alertText">{message}</p>
                <button
                  aria-label="Eliminar notificación"
                  onClick={() => {
                    if (removeNotification) {
                      removeNotification(id);
                    }
                  }}
                  aria-hidden={true}
                >
                  x
                </button>
              </div>
              <span></span>
            </article>
          );
        })}
        <style jsx>{`
          span {
            background: ${darkMode ? colors.dark_tertiary : colors.primary};
          }
          article {
            background-color: ${darkMode
              ? colors.dark_accents3
              : colors.accents2};
          }
          button {
            color: ${darkMode ? colors.dark_textColor : colors.textColor};
          }
        `}</style>
        <style jsx>{`
          p {
            font-size: 14px;
            align-items: center;
            grid-gap: 10px;
            overflow-wrap: break-word;
            margin: 0 10px;
          }
          span {
            display: block;
            width: 100%;
            height: 2px;
            border-radius: 4px;
            animation: shrink 10050ms linear;
          }
          @keyframes shrink {
            from {
              width: 100%;
            }
            to {
              width: 0%;
            }
          }
          div {
            grid-template-columns: 20px minmax(0, 1fr) 20px;
            display: grid;
            padding: 10px 10px 8px 10px;
          }
          article {
            border: 1px solid #cccccc4d;
            border-radius: 4px;
            width: 100%;
            text-decoration: none;
            margin-bottom: 10px;
          }
          div > :global(svg) {
            align-self: center;
          }
          section {
            max-width: 400px;
            width: calc(100% - 20px);
            position: fixed;
            display: flex;
            flex-direction: column;
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
                ${notifications.length > 0 ? "10px" : "-500px"}
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
            cursor: pointer;
          }
          @media screen and (min-width: 500px) {
            div {
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
