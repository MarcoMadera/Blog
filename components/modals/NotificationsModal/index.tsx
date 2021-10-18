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

  if (targetNode === undefined || !notifications.length) {
    return null;
  }

  return createPortal(
    <section>
      {notifications.map(({ id, variant, message, displayTime }) => (
        <NotificationCard
          key={id}
          id={id}
          variant={variant}
          message={message}
          displayTime={displayTime}
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
        }
      `}</style>
    </section>,
    targetNode
  );
}
