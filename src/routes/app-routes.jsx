import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import AuthLayout from "@/layout/auth-layout";
import DashboardLayout from "@/layout/dashboard-layout";
import MainLayout from "@/layout/main-layout";
import ViewArticle from "@/pages/articles/[id]/view-article";
import Articles from "@/pages/articles/articles";
import SignIn from "@/pages/auth/sign-in/sign-in";
import SignUp from "@/pages/auth/sign-up/sign-up";
import EditArticle from "@/pages/dashboard/articles/[id]/edit/edit-article";
import CreateArticle from "@/pages/dashboard/articles/create/create-article";
import Dashboard from "@/pages/dashboard/dashboard";
import App from "@/pages/home/app";

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
        {
          path: "articles",
          children: [
            {
              path: "",
              element: <Articles />,
            },
            {
              path: ":articleId",
              element: <ViewArticle />,
            },
          ],
        },
        {
          path: "dashboard",
          element: <DashboardLayout />,
          children: [
            {
              path: "",
              element: <Dashboard />,
            },
            {
              path: "articles",
              children: [
                {
                  path: "create",
                  element: <CreateArticle />,
                },

                {
                  path: ":articleId/edit",
                  element: <EditArticle />,
                },
              ],
            },
          ],
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
