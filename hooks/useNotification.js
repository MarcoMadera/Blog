import { useCallback, useContext } from "react";
import NotificationContext from "../context/NotificationContext";

export default function useNotification() {
  const {
    notification,
    setNotification,
    notificationCount,
    setNotificationCount,
    removeNotification,
  } = useContext(NotificationContext);

  const addNotification = useCallback(
    (newNotification) => {
      setNotification((value) => {
        return [
          ...value,
          {
            id: notificationCount + 1,
            ...newNotification,
          },
        ];
      });
      setNotificationCount((val) => val + 1);
    },
    [notificationCount, setNotification, setNotificationCount]
  );

  return {
    notification,
    setNotification,
    addNotification,
    removeNotification,
    notificationCount,
  };
}
