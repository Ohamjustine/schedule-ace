export type TaskCategory = "academic" | "personal" | "financial";

export interface Task {
  id: string;
  title: string;
  category: TaskCategory;
  date: string;
  startTime: string;
  endTime: string;
  timerBreak?: string;
  notification?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskData {
  title: string;
  category: TaskCategory;
  date: string;
  startTime: string;
  endTime: string;
  timerBreak?: string;
  notification?: string;
  notes?: string;
}

export interface UpdateTaskData extends Partial<CreateTaskData> {
  id: string;
}