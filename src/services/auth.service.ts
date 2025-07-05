import { users, User } from "../models/user.model";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import prisma from "../config/prisma";

export const registerUser = async (
  email: string,
  password: string
): Promise<User | null> => {
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) return null;

  const hashed = await bcrypt.hash(password, 10);
  const userObject: User = { id: uuidv4(), email, password: hashed };

  const user = await prisma.user.create({
    data: userObject,
  });

  return user;
};

export const loginUser = async (
  email: string,
  password: string
): Promise<User | null> => {
  // const user = users.find((user) => user.email === email);
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (!user) return null;

  const isMatch = await bcrypt.compare(password, user.password);
  return isMatch ? user : null;
};
