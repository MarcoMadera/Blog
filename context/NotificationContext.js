/* eslint-disable react/prop-types */
import { useState, createContext } from "react";
const NotificationContext = createContext({
  showNotification: false,
  setShowNotification: () => {},
});

export function NotificationContextProvider({ children }) {
  const [showNotification, setShowNotification] = useState(false);

  return (
    <NotificationContext.Provider
      value={{ showNotification, setShowNotification }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export default NotificationContext;
