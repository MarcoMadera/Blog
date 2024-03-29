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
  const [disappearCard, setDisappearCard] = useState(false);

  useEffect(() => {
    const timeOutTime = setTimeout(() => {
      setDisappearCard(true);
    }, displayTime - 1000);
    return () => clearTimeout(timeOutTime);
  }, [displayTime]);

  return (
    <article
      key={id}
      role="alertdialog"
      aria-labelledby="alertText"
      className={disappearCard ? "notificationDisappear" : ""}
    >
      <div>
        {variant === "info" && <Info width={20} height={20} />}
        {variant === "error" && <Error width={20} height={20} />}
        {variant === "success" && (
          <Check fill="#4caf50" width={20} height={20} />
        )}
        <p id="alertText" aria-live="polite">
          {message}
        </p>
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
          background: ${darkMode ? colors.vetenianRed : colors.guardsmanRed};
        }
        article {
          background-color: ${darkMode ? colors.cinder : colors.paleGrey};
        }
        button {
          color: ${darkMode ? colors.greyGoose : colors.davyGrey};
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
          animation: shrink ${displayTime + 50}ms linear;
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
          transition: 0.3s ease 0s;
          animation: slide-bottom 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94)
            both;
        }
        @keyframes slide-bottom {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(10px);
          }
        }
        article.notificationDissapear {
          animation: disapear 1s;
          animation-fill-mode: forwards;
        }
        @keyframes disapear {
          0% {
            transform: translateY(10px);
          }
          50% {
            transform: translate(-5%, 10px);
          }
          100% {
            transform: translate(200%, 10px);
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
