import React from "react";
import { Navigate, Outlet } from "react-router";
import { useAuth } from "@/providers/auth-provider";

function AuthLayout() {
    const { loggedInUser } = useAuth();

    if (loggedInUser) {
        return <Navigate to="/" />;
    }

    return <Outlet />;
}

export default AuthLayout;
