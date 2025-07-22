"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ForgotPasswordFormValues {
  email: string;
}

export default function ForgotPasswordPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>();

  const onSubmit = (data: ForgotPasswordFormValues) => {
    // Handle forgot password logic here
    console.log(data);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg px-8 py-10 w-full max-w-[95%] md:max-w-md z-10 flex flex-col items-center">
      <img
        src="/assets/logo.png"
        alt="Schedule Ace Logo"
        className="w-24 mb-2"
      />
      <h2 className="text-lg font-bold text-center mb-6 mt-2">
        Forgot your password?
      </h2>
      <form
        className="w-full flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
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
        <Button
          type="submit"
          className="w-full mt-2 bg-[#337AFF] hover:bg-[#2563eb] text-white font-semibold"
        >
          Send Reset Link
        </Button>
      </form>
      <div className="mt-4 text-center text-sm">
        Remembered your password?{" "}
        <Link href="/login" className="text-[#337AFF] hover:underline">
          Log in
        </Link>
      </div>
      <Button asChild variant="secondary" className="w-full mt-6 bg-none">
        <Link href="/">Back to home</Link>
      </Button>
    </div>
  );
}
