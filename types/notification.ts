export interface newNotification {
  variant: "info" | "error" | "success";
  message: string;
  displayTime?: number;
}

export interface Notification extends newNotification {
  timeOut: NodeJS.Timeout;
  id: string;
  displayTime: number;
}

export interface UseNotification {
  notifications: Notification[] | undefined;
  addNotification: (newNotification: newNotification) => void;
  removeNotification: (notificationId: Notification["id"]) => void;
}
