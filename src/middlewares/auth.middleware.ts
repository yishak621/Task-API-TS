// In this step, we’ll:

// Create JWT-based auth middleware 🔐

// Add a simple in-memory Task model 🧾

// Implement CRUD routes for Tasks (Create, Read, Update, Delete)

// Protect those routes using auth middleware

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  id: string;
}

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "no token provided",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "secret"
    ) as JwtPayload;

    (req as any).userId = decoded.id; //since this is middleware we inject ht euserID into the req object and that will be accessable in the folooowing
    next();
  } catch (error) {
    return res.status(403).json({
      message: "Invalid token",
    });
  }
};
