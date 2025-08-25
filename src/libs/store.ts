import { create } from "zustand";
import { Permission, Role, User } from "../types/User";

interface AuthState {
  user: User | null;
  role: Role | null;
  //   permissions: Permission[];

  setUser: (user: User | null) => void;
  setRole: (role: Role | null) => void;
  //   setPermissions: (permissions: Permission[]) => void;
  hasRole: (role: string) => boolean;
  // reset: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  role: null,
  //   permissions: [],

  setUser: (user) => {
    set({ user });
  },
  setRole: (role) => set({ role }),

  hasRole: (role) => get().role?.name === role,
  // reset: () => set({ user: null, role: null, permissions: [] }),
}));
