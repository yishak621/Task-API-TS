import jwt from "jsonwebtoken";

//genetrate jwt using userid
export const generateToken = (userId: string) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET || "secret", {
    expiresIn: "1d",
  });
};
