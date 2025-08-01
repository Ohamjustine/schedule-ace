"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/modules/auth/hooks/use-auth";
import { User, Lock, Save } from "lucide-react";

interface PersonalInfoFormData {
  firstname: string;
  lastname: string;
  email: string;
}

interface PasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export default function SettingsPage() {
  const { user } = useAuth();
  const [isUpdatingInfo, setIsUpdatingInfo] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  const {
    register: registerInfo,
    handleSubmit: handleSubmitInfo,
    formState: { errors: infoErrors },
  } = useForm<PersonalInfoFormData>({
    defaultValues: {
      firstname: user?.firstname || "",
      lastname: user?.lastname || "",
      email: user?.email || "",
    },
  });

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    watch: watchPassword,
    reset: resetPassword,
    formState: { errors: passwordErrors },
  } = useForm<PasswordFormData>();

  const onSubmitPersonalInfo = async (data: PersonalInfoFormData) => {
    setIsUpdatingInfo(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Updating personal info:", data);
      // Here you would call your API to update user info
    } catch (error) {
      console.error("Failed to update personal info:", error);
    } finally {
      setIsUpdatingInfo(false);
    }
  };

  const onSubmitPassword = async (data: PasswordFormData) => {
    setIsUpdatingPassword(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Updating password");
      // Here you would call your API to update password
      resetPassword();
    } catch (error) {
      console.error("Failed to update password:", error);
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Personal Information */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-100 rounded-lg">
              <User className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Personal Information
              </h2>
              <p className="text-sm text-gray-600">
                Update your personal details
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmitInfo(onSubmitPersonalInfo)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstname">First Name</Label>
                <Input
                  id="firstname"
                  placeholder="Enter your first name"
                  {...registerInfo("firstname", { required: "First name is required" })}
                />
                {infoErrors.firstname && (
                  <span className="text-sm text-red-500">
                    {infoErrors.firstname.message}
                  </span>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastname">Last Name</Label>
                <Input
                  id="lastname"
                  placeholder="Enter your last name"
                  {...registerInfo("lastname", { required: "Last name is required" })}
                />
                {infoErrors.lastname && (
                  <span className="text-sm text-red-500">
                    {infoErrors.lastname.message}
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                {...registerInfo("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                  },
                })}
              />
              {infoErrors.email && (
                <span className="text-sm text-red-500">
                  {infoErrors.email.message}
                </span>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700"
              disabled={isUpdatingInfo}
            >
              {isUpdatingInfo ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Updating...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Update Information
                </>
              )}
            </Button>
          </form>
        </div>

        {/* Reset Password */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Lock className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Reset Password
              </h2>
              <p className="text-sm text-gray-600">
                Change your account password
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmitPassword(onSubmitPassword)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input
                id="currentPassword"
                type="password"
                placeholder="Enter current password"
                {...registerPassword("currentPassword", {
                  required: "Current password is required",
                })}
              />
              {passwordErrors.currentPassword && (
                <span className="text-sm text-red-500">
                  {passwordErrors.currentPassword.message}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                type="password"
                placeholder="Enter new password"
                {...registerPassword("newPassword", {
                  required: "New password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              {passwordErrors.newPassword && (
                <span className="text-sm text-red-500">
                  {passwordErrors.newPassword.message}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm new password"
                {...registerPassword("confirmPassword", {
                  required: "Please confirm your new password",
                  validate: (value) =>
                    value === watchPassword("newPassword") || "Passwords do not match",
                })}
              />
              {passwordErrors.confirmPassword && (
                <span className="text-sm text-red-500">
                  {passwordErrors.confirmPassword.message}
                </span>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-orange-600 hover:bg-orange-700"
              disabled={isUpdatingPassword}
            >
              {isUpdatingPassword ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Updating...
                </>
              ) : (
                <>
                  <Lock className="h-4 w-4 mr-2" />
                  Update Password
                </>
              )}
            </Button>
          </form>
        </div>
      </div>

      {/* Additional Settings */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Account Actions
        </h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button variant="outline" className="text-gray-600">
            Export Data
          </Button>
          <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
            Delete Account
          </Button>
        </div>
      </div>
    </div>
  );
}