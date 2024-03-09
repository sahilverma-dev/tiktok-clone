import { User } from "@/interfaces";
import { create } from "zustand";

interface UserStore {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

export const userStore = create<UserStore>((set) => ({
  user: null,
  login: (user) => set({ user }),
  // TODO: call to backend
  logout: () => set({ user: null }),
}));
