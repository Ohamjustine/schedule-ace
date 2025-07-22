import React from "react";
import DashboardAuthGuard from "./dashboard-auth-guard";
import { DashboardLayoutWrapper } from "@/layouts/components/dashboard/dashboard-layout-wrapper";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardAuthGuard>
      <DashboardLayoutWrapper>{children}</DashboardLayoutWrapper>
    </DashboardAuthGuard>
  );
}
