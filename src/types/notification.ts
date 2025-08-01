export type NotificationInterval = "once" | "daily" | "weekly" | "monthly";

export interface UserNotification {
  id: string;
  title: string;
  time: string;
  description: string;
  date: string;
  notificationInterval: NotificationInterval;
  isActive: boolean;
  user: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateNotificationData {
  title: string;
  description: string;
  time: string;
  date: string;
  notificationInterval: NotificationInterval;
}
