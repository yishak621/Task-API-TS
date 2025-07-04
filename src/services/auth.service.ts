import { users, User } from "../models/user.model";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

export const registerUser = async (
  email: string,
  password: string
): Promise<User | null> => {
  const existing = users.find((u) => u.email === email);
  if (existing) return null;

  const hashed = await bcrypt.hash(password, 10);
  const user: User = { id: uuidv4(), email, password: hashed };
  users.push(user);
  return user;
};

export const loginUser = async (
  email: string,
  password: string
): Promise<User | null> => {
  const user = users.find((user) => user.email === email);
  if (!user) return null;

  const isMatch = await bcrypt.compare(password, user.password);
  return isMatch ? user : null;
};
