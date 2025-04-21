"use client";

import { create } from "zustand";
import { User, UserRole } from "@/lib/types";
import { persist } from "zustand/middleware";

// Sample users for demo purposes
const DEMO_USERS: User[] = [
  {
    id: "admin-1",
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
  },
  {
    id: "client-1",
    name: "Client User",
    email: "client@example.com",
    role: "client",
  },
];

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  getCurrentUser: () => User | null;
  isAdmin: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        // For demo purposes, any password works
        // In a real app, this would be a proper authentication
        const user = DEMO_USERS.find((user) => user.email === email);
        
        if (user) {
          set({ user, isAuthenticated: true });
          return true;
        }
        return false;
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      getCurrentUser: () => {
        return get().user;
      },

      isAdmin: () => {
        const user = get().user;
        return user?.role === "admin";
      },
    }),
    {
      name: "auth-storage",
    }
  )
);