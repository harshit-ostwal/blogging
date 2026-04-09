import React from "react";
import { Navigate, Outlet } from "react-router";
import { userRoles } from "@/constants/roles";
import { useAuth } from "@/providers/auth-provider";

function DashboardLayout() {
    const { loggedInUser } = useAuth();

    if (!loggedInUser) {
        return <Navigate to={"/auth/sign-in"} />;
    }

    if (loggedInUser.role === userRoles[0].label) {
        return <Navigate to={"/"} />;
    }

    return <Outlet />;
}

export default DashboardLayout;
