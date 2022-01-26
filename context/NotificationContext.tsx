import NotificationsModal from "components/modals/NotificationsModal";
import {
  useState,
  createContext,
  Dispatch,
  SetStateAction,
  ReactNode,
  ReactElement,
} from "react";
import type { Notification } from "types/notification";

const NotificationContext = createContext<
  NotificationContextProviderProps | undefined
>(undefined);

interface NotificationContextProviderProps {
  notifications: Notification[];
  setNotifications: Dispatch<
    SetStateAction<NotificationContextProviderProps["notifications"]>
  >;
}

export function NotificationContextProvider({
  children,
}: {
  children: ReactNode;
}): ReactElement {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        setNotifications,
      }}
    >
      <NotificationsModal />
      {children}
    </NotificationContext.Provider>
  );
}

export default NotificationContext;
