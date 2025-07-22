import { create } from "zustand";
import { IUser } from "@/types";

interface AuthState {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  logout: () => void;
}

const getInitialUser = (): IUser | null => {
  const stored = localStorage.getItem("user");
  return stored ? JSON.parse(stored) : null;
};

export const useAuth = create<AuthState>((set) => ({
  user: getInitialUser(),
  setUser: (user) => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
    set({ user });
  },
  logout: () => {
    localStorage.removeItem("user");
    set({ user: null });
  },
}));