import axiosInstance from "@/config/axiosInstance";
import { IUser } from "@/types";

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  fullname: string;
  username: string;
  email: string;
  password: string;
}

export interface LoginResponse {
  user: IUser;
  token?: string;
}

export const authService = {
  async login(data: LoginData): Promise<LoginResponse> {
    const response = await axiosInstance.post("/login", data);
    return response.data;
  },

  async register(data: RegisterData): Promise<{ message: string }> {
    const response = await axiosInstance.post("/register", data);
    return response.data;
  },

  async logout(): Promise<void> {
    await axiosInstance.post("/logout");
  }
};