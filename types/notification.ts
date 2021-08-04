export interface Notification {
  id: string;
  isTimeOut?: boolean;
  variant?: "info" | "error";
  message?: string;
}
