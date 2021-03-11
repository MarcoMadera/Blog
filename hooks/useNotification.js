import { useCallback, useContext } from "react";
import NotificationContext from "../context/NotificationContext";
import { nanoid } from "nanoid";

export default function useNotification() {
  const { notification, setNotification, removeNotification } = useContext(
    NotificationContext
  );

  const addNotification = useCallback(
    (newNotification) => {
      setNotification((value) => {
        return [
          ...value,
          {
            id: nanoid(),
            ...newNotification,
          },
        ];
      });
    },
    [setNotification]
  );

  return {
    notification,
    setNotification,
    addNotification,
    removeNotification,
  };
}
