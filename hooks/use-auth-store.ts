"use client";

import { create } from "zustand";
import { User } from "@/lib/types";
import { persist } from "zustand/middleware";
import { SignInResource } from '@clerk/types';
import { checkRole } from "@/lib/utils";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (result: SignInResource) => Promise<boolean>;
  logout: () => void;
  getCurrentUser: () => User | null;
  isAdmin: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      login: async (result) => {
        if (result.status === 'complete') {
          set({ isAuthenticated: true });
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