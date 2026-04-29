import { create } from "zustand";
import axios, { AxiosError } from "axios";

const API_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/api/auth"
    : "/api/auth";

axios.defaults.withCredentials = true;

interface User {
  _id: string;
  email: string;
  name: string;
  isVerified: boolean;
  lastLogin: string;
  createAt: string;
  session?: Array<{
    loginTime: string;
    ipAddress?: string;
    userAgent?: string;
  }>;
}

interface AuthResponse {
  user: User;
}

interface ErrorResponse {
  message: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  error: string | null;
  isLoading: boolean;
  isCheckingAuth: boolean;
  message: string | null;

  signup: (email: string, password: string, name: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: true,
  message: null,

  signup: async (email, password, name) => {
    set({ isLoading: true, error: null });
    try {
      const Response = await axios.post<AuthResponse>(`${API_URL}/signup`, {
        email,
        password,
        name,
      });
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;

      console.log("ERROR:", error.response?.data);

      set({
        error: error.response?.data?.message || "Error signin up",
        isLoading: false,
      });
      throw error;
    }
  },
  login: async () => {},
  logout: async () => {},
  checkAuth: async () => {},
}));
