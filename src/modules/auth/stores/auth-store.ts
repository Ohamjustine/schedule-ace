import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  setUser: (user: User) => void;
  setToken: (token: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  logout: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      setUser: (user) =>
        set({
          user,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        }),
      setToken: (token) =>
        set({
          token,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        }),
      setLoading: (isLoading) => set(() => ({ isLoading })),
      setError: (error) => set({ error, isLoading: false }),
      logout: () =>
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          error: null,
        }),
      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);