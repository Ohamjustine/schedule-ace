"use client";

"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "../stores/auth-store";
import axios, { AxiosError } from "axios";

const API_BASE_URL = "http://localhost:5000/api/v1/auth";

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
    error,
    setUser,
    setToken,
    setLoading,
    setError,
    logout: logoutStore,
    clearError,
  } = useAuthStore();

  const signUp = async (data: SignUpData) => {
    try {
      setLoading(true);

      const response = await axios.post(`${API_BASE_URL}/sign-up`, data);

      // After successful signup, redirect to login
      router.push("/login");
      return response.data;
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || "Sign up failed";
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const login = async (data: LoginData) => {
    try {
      setLoading(true);

      const response = await axios.post<LoginResponse>(
        `${API_BASE_URL}/login`,
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
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Login failed";
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
    error,
    signUp,
    login,
    logout,
    clearError,
  };
};
