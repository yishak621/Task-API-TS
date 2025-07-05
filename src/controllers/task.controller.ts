import { Request, Response } from "express";
import { tasks, Task } from "../models/task.model";
import { v4 as uuidv4 } from "uuid";

export const getTasks =async (req: Request, res: Response) => {
  const userId = (req as any).userId;
  const { completed, search, sort } = req.query;

  let userTasks = await prisma.task.findMany({
    where: {
      userId,
      
    }
  })

  //filter by completed
  if (completed === "true") userTasks = tasks.filter((t) => t.completed);
  if (completed === "false") userTasks = tasks.filter((t) => !t.completed);

  //filter by title keyboard
  if (search) {
    userTasks = userTasks.filter((t) => {
      return t.title.toLowerCase().includes((search as string).toLowerCase());
    });
  }

  //sort
  if (sort === "latest") {
    userTasks = userTasks.sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  } else if (sort === "title") {
    userTasks = userTasks.sort((a, b) => a.title.localeCompare(b.title));
  }

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
    createdAt: new Date(),
  };

  tasks.push(task);
  res.status(201).json({
    status: "task created",
    task,
  });
};

export const updateTask = (req: Request, res: Response) => {
  const userId = (req as any).userId;
  const { title, completed } = req.body;
  const { id } = req.params;

  const task = tasks.find((t) => t.id === id && t.userId === userId);
  if (!task) {
    return res.status(404).json({
      message: "task not found",
    });
  }
  task.title = title;
  task.completed = completed;

  res.json(task);
};

export const deleteTask = (req: Request, res: Response) => {
  const userId = (req as any).userId;
  const { id } = req.params;

  const index = tasks.findIndex((task) => task.id === id && task.id === userId);
  if (index === -1)
    return res.status(404).json({
      message: "Task not found",
    });
  tasks.splice(index, 1);
  res.status(204).send();
};
