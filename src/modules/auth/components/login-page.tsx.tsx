"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAuth } from "../hooks/use-auth";

interface LoginFormValues {
  email: string;
  password: string;
}

export default function LoginPage() {
  const { login, isLoading, error } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();

  const onSubmit = async (data: LoginFormValues) => {
    try {
      await login(data);
    } catch {}
  };

  return (
    <div className="bg-white rounded-xl shadow-lg px-8 py-10 w-full max-w-[95%] md:max-w-md z-10 flex flex-col items-center">
      <img
        src="/assets/logo.png"
        alt="Schedule Ace Logo"
        className="w-24 mb-2"
      />
      <h2 className="text-lg font-bold text-center mb-6 mt-2">
        Log in to your account
      </h2>
      <form
        className="w-full flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        {error && (
          <div className="text-xs text-red-500 bg-red-50 p-2 rounded">
            {error}
          </div>
        )}
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <Input
            type="email"
            placeholder="Enter your email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            })}
            aria-invalid={!!errors.email}
          />
          {errors.email && (
            <span className="text-xs text-red-500">{errors.email.message}</span>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <Input
            type="password"
            placeholder="Enter your password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            aria-invalid={!!errors.password}
          />
          {errors.password && (
            <span className="text-xs text-red-500">
              {errors.password.message}
            </span>
          )}
        </div>
        <Button
          type="submit"
          className="w-full mt-2 bg-[#337AFF] hover:bg-[#2563eb] text-white font-semibold"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Log in"}
        </Button>
      </form>
      <div className="mt-4 text-center text-sm">
        Forgot your password?{" "}
        <Link
          href="/forgot-password"
          className="text-[#337AFF] hover:underline"
        >
          Reset it
        </Link>
      </div>
      <div className="mt-2 text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link href="/sign-up" className="text-[#337AFF] hover:underline">
          Sign up
        </Link>
      </div>
      <Button asChild variant="secondary" className="w-full mt-6 bg-none">
        <Link href="/">Back to home</Link>
      </Button>
    </div>
  );
}
