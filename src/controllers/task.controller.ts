import { Request, Response } from "express";
import { tasks, Task } from "../models/task.model";
import { v4 as uuidv4 } from "uuid";

export const getTasks = (req: Request, res: Response) => {
  const userId = (req as any).userId;
  const userTasks = tasks.filter((task) => task.userId === userId);
  res.json(userTasks); //since userTasks is alreay an object
};

export const createTask = (req: Request, res: Response) => {
  const userId = (req as any).userId;
  const { title } = req.body;

  const task: Task = {
    id: uuidv4(),
    userId,
    title,
    completed: false,
  };

  tasks.push(task);
  res.status(201).json({
    status: "task created",
    task,
  });
};

export const updateTask = (req: Request, res: Response) => {
  const userId = (req as any).userId;
  const { title, completed };
};
