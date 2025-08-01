export interface CalendarTask {
  id: string;
  title: string;
  category: string;
  startTime: string;
  endTime: string;
  isCompleted: boolean;
  type: "task";
}

export interface CalendarEvent {
  id: string;
  name: string;
  time: string;
  note: string;
  type: "event";
}

export interface CalendarNotification {
  id: string;
  title: string;
  time: string;
  interval: string;
  type: "notification";
}

export interface CalendarDayData {
  tasks: CalendarTask[];
  events: CalendarEvent[];
  notifications: CalendarNotification[];
}

export interface CalendarData {
  month: number;
  year: number;
  calendar: Record<string, CalendarDayData>;
  summary: {
    totalTasks: number;
    completedTasks: number;
    totalEvents: number;
    totalNotifications: number;
  };
}

export interface CalendarResponse {
  success: boolean;
  data: CalendarData;
}

export interface DateResponse {
  success: boolean;
  data: {
    date: string;
    tasks: CalendarTask[];
    events: CalendarEvent[];
    notifications: CalendarNotification[];
    summary: {
      totalTasks: number;
      completedTasks: number;
      totalEvents: number;
      totalNotifications: number;
    };
  };
}