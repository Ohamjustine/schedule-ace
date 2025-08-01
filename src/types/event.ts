export interface Event {
  id: string;
  name: string;
  date: string; // ISO date string
  time: string; // "HH:mm"
  note: string;
  timeToNotify: number;
  notificationSent: boolean;
  user: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateEventData {
  name: string;
  date: string;
  time: string;
  note: string;
  timeToNotify: number;
}
