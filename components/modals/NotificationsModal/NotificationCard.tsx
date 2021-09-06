import { Error, Info, Check } from "components/icons";
import useDarkMode from "hooks/useDarkMode";
import useNotification from "hooks/useNotification";
import React, { useState, useEffect, ReactElement } from "react";
import { colors } from "styles/theme";
import type { Notification } from "types/notification";

export default function NotificationCard({
  id,
  variant,
  message,
  displayTime,
}: Omit<Notification, "timeOut">): ReactElement {
  const { removeNotification } = useNotification();
  const { darkMode } = useDarkMode();
  const [dissapearCard, setDissapearCard] = useState(false);

  useEffect(() => {
    const timeOutTime = setTimeout(() => {
      setDissapearCard(true);
    }, displayTime - 1000);
    return () => clearTimeout(timeOutTime);
  }, [displayTime]);

  return (
    <article
      key={id}
      role="alertdialog"
      aria-labelledby="alertText"
      className={dissapearCard ? "notificationDissapear" : ""}
    >
      <div>
        {variant === "info" && <Info width={20} height={20} />}
        {variant === "error" && <Error width={20} height={20} />}
        {variant === "success" && (
          <Check fill="#4caf50" width={20} height={20} />
        )}
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
          animation: shrink ${displayTime ? displayTime + 50 : "10050"}ms linear;
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
        article.notificationDissapear {
          animation: disapear 1s;
          animation-fill-mode: forwards;
        }
        @keyframes disapear {
          50% {
            transform: translateX(-5%);
          }
          100% {
            transform: translateX(200%);
          }
        }
        div > :global(svg) {
          align-self: center;
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
    </article>
  );
}
