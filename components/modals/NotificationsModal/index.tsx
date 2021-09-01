import { createPortal } from "react-dom";
import { ReactPortal, useEffect, useState } from "react";
import useNotification from "hooks/useNotification";
import NotificationCard from "./NotificationCard";

export default function NotificationsModal(): ReactPortal | null {
  const [targetNode, setTargetNode] = useState<Element>();

  const { notifications } = useNotification();

  useEffect(() => {
    setTargetNode(document.querySelector("#notification") as Element);
  }, []);

  if (targetNode === undefined || !notifications) {
    return null;
  }

  if (notifications.length > 0) {
    return createPortal(
      <section>
        {notifications.map(({ id, variant, message, displayTime }) => (
          <NotificationCard
            key={id}
            id={id}
            variant={variant}
            message={message}
            displayTime={displayTime || 10000}
          />
        ))}
        <style jsx>{`
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
        `}</style>
      </section>,
      targetNode
    );
  }
  return null;
}
