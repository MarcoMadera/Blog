interface NewNotification {
  variant: "info" | "error" | "success";
  message: string;
  displayTime?: number;
}

export interface Notification extends NewNotification {
  timeOut: NodeJS.Timeout;
  id: string;
  displayTime: number;
}

export interface UseNotification {
  notifications: Notification[];
  addNotification: (notification: NewNotification) => void;
  removeNotification: (notificationId: Notification["id"]) => void;
}
