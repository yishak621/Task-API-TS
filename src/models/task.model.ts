export interface Task {
  id: string;
  userId: string;
  title: string;
  completed: boolean;
  createdAt: Date;
}

export const tasks: Task[] = [];
