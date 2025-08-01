"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "../stores/auth-store";
import axiosClient, { ApiError } from "@/lib/axios-client";
import { useEffect } from "react";

interface SignUpData {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface LoginResponse {
  data: {
    token: string;
    user: {
      id: string;
      firstname: string;
      lastname: string;
      fullname: string;
      email: string;
    };
  };
}

export const useAuth = () => {
  const router = useRouter();
  const {
    user,
    token,
    isAuthenticated,
    isLoading,
    isHydrated,
    error,
    setUser,
    setToken,
    setLoading,
    setError,
    setHydrated,
    logout: logoutStore,
    clearError,
  } = useAuthStore();

  // Wait for Zustand to rehydrate from localStorage
  useEffect(() => {
    if (!isHydrated) {
      setHydrated(true);
    }
  }, [isHydrated, setHydrated]);

  const signUp = async (data: SignUpData) => {
    try {
      setLoading(true);

      const response = await axiosClient.post("/auth/sign-up", data);

      // After successful signup, redirect to login
      router.push("/login");
      return response.data;
    } catch (error) {
      const errorMessage =
        error instanceof ApiError ? error.message : "Sign up failed";
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const login = async (data: LoginData) => {
    try {
      setLoading(true);

      const response = await axiosClient.post<LoginResponse>(
        "/auth/login",
        data
      );
      const { token, user } = response.data.data;

      if (token && user) {
        setToken(token);
        setUser(user);
        // Redirect to dashboard after successful login
        router.push("/dashboard");
      }

      return response.data;
    } catch (error) {
      const errorMessage =
        error instanceof ApiError ? error.message : "Login failed";
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    logoutStore();
    router.push("/");
  };

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    isHydrated,
    error,
    signUp,
    login,
    logout,
    clearError,
  };
};
