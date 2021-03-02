/* eslint-disable react/prop-types */
import { useState, createContext } from "react";
const NotificationContext = createContext({
  notification: { variant: "info", message: "" },
  setNotification: () => {},
});

export function NotificationContextProvider({ children }) {
  const [notification, setNotification] = useState({
    variant: "info",
    message: "",
  });

  return (
    <NotificationContext.Provider value={{ notification, setNotification }}>
      {children}
    </NotificationContext.Provider>
  );
}

export default NotificationContext;
