export interface Task {
  id: string;
  userId: string;
  title: string;
  completed: boolean;
}

export const tasks: Task[] = [];
