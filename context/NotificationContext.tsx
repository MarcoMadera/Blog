import {
  useState,
  createContext,
  Dispatch,
  SetStateAction,
  ReactNode,
  ReactElement,
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
}

export function NotificationContextProvider({
  children,
}: {
  children: ReactNode;
}): ReactElement {
  const [notifications, setNotifications] = useState<
    Notification[] | undefined
  >();

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        setNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export default NotificationContext;
