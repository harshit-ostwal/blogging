import AuthLayout from "@/layout/auth-layout";
import MainLayout from "@/layout/main-layout";
import SignIn from "@/pages/auth/sign-in/sign-in";
import SignUp from "@/pages/auth/sign-up/sign-up";
import App from "@/pages/home/app";
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router";

function AppRoutes() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "",
          element: <App />,
        },
      ],
    },
    {
      path: "/auth/",
      element: <AuthLayout />,
      children: [
        {
          path: "sign-in",
          element: <SignIn />,
        },
        {
          path: "sign-up",
          element: <SignUp />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default AppRoutes;
