import { useCallback, useContext } from "react";
import NotificationContext from "context/NotificationContext";
import { nanoid } from "nanoid";
import { UseNotification, Notification } from "types/notification";

export default function useNotification(): UseNotification {
  const context = useContext(NotificationContext);

  if (context === undefined) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  const { notifications, setNotifications } = context;

  const removeNotification: UseNotification["removeNotification"] = useCallback(
    (notificationId) => {
      const timeOut = notifications.find(
        (notification) => notification.id === notificationId
      )?.timeOut;

      if (timeOut) {
        clearTimeout(timeOut);
      }

      setNotifications((allNotifications) => {
        return allNotifications.filter(
          (notification) => notification.id !== notificationId
        );
      });
    },
    [setNotifications, notifications]
  );

  const addNotification: UseNotification["addNotification"] = useCallback(
    (newNotification) => {
      const displayTime = newNotification.displayTime ?? 10000;

      const newNotificationWithId: Notification = {
        ...newNotification,
        id: nanoid(),
        displayTime,
        timeOut: setTimeout(() => {
          removeNotification(newNotificationWithId.id);
        }, displayTime),
      };

      setNotifications((allNotifications) => {
        if (!allNotifications.length) {
          return [newNotificationWithId];
        }

        return [...allNotifications, newNotificationWithId];
      });
    },
    [setNotifications, removeNotification]
  );

  return {
    notifications,
    addNotification,
    removeNotification,
  };
}
