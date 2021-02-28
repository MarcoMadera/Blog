import { useEffect } from "react";
import { useContext } from "react";
import NotificationContext from "../context/NotificationContext";

export default function useNotification(time = 10000) {
  const { showNotification, setShowNotification } = useContext(
    NotificationContext
  );
  useEffect(() => {
    const displayTime = setTimeout(() => {
      setShowNotification(false);
    }, time);
    return () => {
      clearTimeout(displayTime);
    };
  }, [showNotification, setShowNotification, time]);

  return {
    showNotification,
    setShowNotification,
  };
}
