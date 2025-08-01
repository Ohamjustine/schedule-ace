export type GoalProgress = "not_started" | "in_progress" | "completed" | "on_hold";

export interface Goal {
  id: string;
  title: string;
  description: string;
  progress: GoalProgress;
  user: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateGoalData {
  title: string;
  description: string;
  progress: GoalProgress;
}
