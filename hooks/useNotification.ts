import { useCallback, useContext } from "react";
import NotificationContext from "context/NotificationContext";
import { nanoid } from "nanoid";
import { UseNotification, Notification } from "types/notification";

export default function useNotification(): UseNotification {
  const conxtext = useContext(NotificationContext);
  const notifications = conxtext?.notifications;
  const setNotifications = conxtext?.setNotifications;

  const removeNotification: UseNotification["removeNotification"] = useCallback(
    (notificationId) => {
      if (!setNotifications) {
        return;
      }

      const timeOut = notifications?.find(
        (notification) => notification.id === notificationId
      )?.timeOut;

      if (timeOut) {
        clearTimeout(timeOut);
      }

      setNotifications((allNotifications) => {
        if (!allNotifications) {
          return;
        }
        return allNotifications.filter(
          (notification) => notification.id !== notificationId
        );
      });
    },
    [setNotifications, notifications]
  );

  const addNotification: UseNotification["addNotification"] = useCallback(
    (newNotification) => {
      if (!setNotifications) {
        return;
      }

      const newNotificationWithId: Notification = {
        ...newNotification,
        id: nanoid(),
        displayTime: newNotification.displayTime ?? 10000,
        timeOut: setTimeout(() => {
          removeNotification(newNotificationWithId.id);
        }, newNotification.displayTime ?? 10000),
      };

      setNotifications((allNotifications) => {
        if (!allNotifications) {
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
