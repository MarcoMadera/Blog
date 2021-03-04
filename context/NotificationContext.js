/* eslint-disable react/prop-types */
import { useState, createContext, useCallback } from "react";
const NotificationContext = createContext({
  notification: [],
  setNotification: () => {},
  notificationCount: 0,
  setNotificationCount: () => {},
});

export function NotificationContextProvider({ children }) {
  const [notification, setNotification] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);

  const removeNotification = useCallback(
    (notificationId) => {
      setNotification((value) => {
        const newValue = [...value];
        newValue.splice(
          newValue.findIndex((item) => item.id === notificationId),
          1
        );
        return newValue;
      });
    },
    [setNotification]
  );

  return (
    <NotificationContext.Provider
      value={{
        notification,
        setNotification,
        notificationCount,
        setNotificationCount,
        removeNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export default NotificationContext;
