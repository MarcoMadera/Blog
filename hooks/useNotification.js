import { useEffect } from "react";
import { useContext } from "react";
import NotificationContext from "../context/NotificationContext";

export default function useNotification(time = 10000) {
  const { notification, setNotification } = useContext(NotificationContext);

  useEffect(() => {
    if (notification.message) {
      const displayTime = setTimeout(() => {
        setNotification({ variant: "info", message: "" });
      }, time);
      return () => {
        clearTimeout(displayTime);
      };
    }
    return;
  }, [notification, setNotification, time]);

  return {
    notification,
    setNotification,
  };
}
