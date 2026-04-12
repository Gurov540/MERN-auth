import { Request } from "express";

export interface AuthRequest extends Request {
  userId?: string;
}

export interface UserDocument {
  _id: string;
  email: string;
  password: string;
  name: string;
  lastLogin: Date;
  isVerified: boolean;
  sessions: SessionInfo[];
  createdAt: Date;
  updatedAt: Date;
  _doc?: any;
  save(): Promise<UserDocument>;
}

export interface SessionInfo {
  loginTime: Date;
  ipAddress?: string;
  userAgent?: string;
}

export interface SignupRequest {
  email: string;
  password: string;
  name: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}
