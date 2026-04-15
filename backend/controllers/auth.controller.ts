import bcryptjs from "bcryptjs";
import { Response } from "express";
import { generateToken } from "../utils/generateToken.js";
import { User } from "../models/user.model.js";
import { AuthRequest, SignupRequest, LoginRequest } from "../types/index.js";

export const signup = async (
  req: AuthRequest,
  res: Response,
): Promise<Response> => {
  const { email, password, name } = req.body as SignupRequest;

  try {
    if (!email || !password || !name) {
      throw new Error("All fields are required");
    }

    const userAlreadyExists = await User.findOne({ email });
    console.log("userAlreadyExists", userAlreadyExists);

    if (userAlreadyExists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const user = new User({
      email,
      password: hashedPassword,
      name,
      isVerified: true,
    });

    await user.save();

    // jwt
    generateToken(res, user._id.toString());

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        ...user.toObject(),
        password: undefined,
      },
    });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: (error as Error).message });
  }
};

export const login = async (
  req: AuthRequest,
  res: Response,
): Promise<Response> => {
  const { email, password } = req.body as LoginRequest;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    generateToken(res, user._id.toString());

    user.lastLogin = new Date();

    const sessionInfo = {
      loginTime: new Date(),
      ipAddress: req.ip || req.socket.remoteAddress,
      userAgent: req.headers["user-agent"] || "Unknown",
    };

    if (user.sessions.length >= 5) {
      user.sessions.shift();
    }
    user.sessions.push(sessionInfo);

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Logged in successfully",
      user: {
        ...user.toObject(),
        password: undefined,
      },
    });
  } catch (error) {
    console.log("Error in login ", error);
    return res
      .status(400)
      .json({ success: false, message: (error as Error).message });
  }
};

export const logout = async (
  req: AuthRequest,
  res: Response,
): Promise<Response> => {
  res.clearCookie("token");
  return res
    .status(200)
    .json({ success: true, message: "Logged out successfully" });
};

export const checkAuth = async (
  req: AuthRequest,
  res: Response,
): Promise<Response> => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    return res.status(200).json({ success: true, user });
  } catch (error) {
    console.log("Error in checkAuth ", error);
    return res
      .status(400)
      .json({ success: false, message: (error as Error).message });
  }
};
