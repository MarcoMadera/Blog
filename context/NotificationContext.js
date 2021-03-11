/* eslint-disable react/prop-types */
import { useState, createContext, useCallback } from "react";
const NotificationContext = createContext({
  notification: [],
  setNotification: () => {},
});

export function NotificationContextProvider({ children }) {
  const [notification, setNotification] = useState([]);

  const removeNotification = useCallback(
    (notificationId) => {
      setNotification((value) => {
        const newValue = [...value];
        return newValue.filter((item) => item.id !== notificationId);
      });
    },
    [setNotification]
  );

  return (
    <NotificationContext.Provider
      value={{
        notification,
        setNotification,
        removeNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export default NotificationContext;
