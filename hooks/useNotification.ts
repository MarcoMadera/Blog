import { useCallback, useContext } from "react";
import NotificationContext from "context/NotificationContext";
import { nanoid } from "nanoid";

export default function useNotification() {
  const conxtext = useContext(NotificationContext);
  const notifications = conxtext?.notifications;
  const removeNotification = conxtext?.removeNotification;
  const setNotifications = conxtext?.setNotifications;

  const addNotification = useCallback(
    (newNotification) => {
      if (!setNotifications) {
        return;
      }
      const newNotificationWithId = {
        id: nanoid(),
        ...newNotification,
      };
      setNotifications((allNotifications) => {
        if (!allNotifications) {
          return [newNotificationWithId];
        }
        return [...allNotifications, newNotificationWithId];
      });
    },
    [setNotifications]
  );

  return {
    notifications,
    setNotifications,
    addNotification,
    removeNotification,
  };
}
