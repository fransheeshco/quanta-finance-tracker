import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/authUtils";

export const authToken = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.get("authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "No token provided." });
    return;
  }

  try {
    const decoded = verifyToken(token) as { userID: number};
    req.userID = decoded.userID; 
    console.log("Full decoded token:", decoded);
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid or expired token." });
  }
};
