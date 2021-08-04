import {
  useState,
  createContext,
  useCallback,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";
import { Notification } from "types/notification";

const NotificationContext = createContext<
  NotificationContextProviderProps | undefined
>(undefined);

interface NotificationContextProviderProps {
  notifications: Notification[] | undefined;
  setNotifications: Dispatch<
    SetStateAction<
      NotificationContextProviderProps["notifications"] | undefined
    >
  >;
  removeNotification: (notificationId: string) => void;
}

export function NotificationContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [notifications, setNotifications] = useState<
    Notification[] | undefined
  >();

  const removeNotification = useCallback(
    (notificationId: string) => {
      setNotifications((allNotifications) => {
        if (!allNotifications) {
          return;
        }
        return allNotifications.filter(
          (notification) => notification.id !== notificationId
        );
      });
    },
    [setNotifications]
  );

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        setNotifications,
        removeNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export default NotificationContext;
