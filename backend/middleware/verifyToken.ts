import jwt from "jsonwebtoken";
import { Response, NextFunction } from "express";
import { AuthRequest } from "../types";

export const verifyToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Response | void => {
  const token = req.cookies.token;

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized - no token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      userId: string;
    };

    if (!decoded) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized - invalid token" });
    }

    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.log("Error in verifyToken", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
