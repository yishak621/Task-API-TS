import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/auth.service";
import { generateToken } from "../utils/jwt";

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await registerUser(email, password);
  if (!user)
    return res.status(400).json({
      message: "user not registered",
    });

  const token = generateToken(user.id);
  res.status(201).json({
    token,
    email: user.email,
  });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await loginUser(email, password);

  if (!user)
    return res.status(401).json({
      message: "Invalid credintials",
    });

  const token = generateToken(user.id);
  res.json({
    status: "user logged in successfully",
    token,
    email: user.email,
  });
};
