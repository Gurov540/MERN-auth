import mongoose, { Schema } from "mongoose";
import { UserDocument } from "./../types/index";

const userScheme = new Schema<UserDocument>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    lastLogin: {
      type: Date,
      default: Date.now,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    sessions: [
      {
        loginTime: {
          type: Date,
          default: Date.now,
        },
        ipAddress: String,
        userAgent: String,
      },
    ],
  },
  { timestamps: true },
);

export const User = mongoose.model<UserDocument>("User", userScheme);
