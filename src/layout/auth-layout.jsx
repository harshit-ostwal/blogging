import { useAuth } from "@/providers/auth-provider";
import React from "react";
import { Navigate, Outlet } from "react-router";

function AuthLayout() {
  const { loggedInUser } = useAuth();

  if (loggedInUser) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}

export default AuthLayout;
