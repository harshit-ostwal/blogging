import Loading from "@/components/common/Loading";
import React, { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";

const AuthLayout = lazy(() => import("@/layout/auth-layout"));
const DashboardLayout = lazy(() => import("@/layout/dashboard-layout"));
const MainLayout = lazy(() => import("@/layout/main-layout"));
const ViewArticle = lazy(() => import("@/pages/articles/[id]/view-article"));
const Articles = lazy(() => import("@/pages/articles/articles"));
const SignIn = lazy(() => import("@/pages/auth/sign-in/sign-in"));
const SignUp = lazy(() => import("@/pages/auth/sign-up/sign-up"));
const EditArticle = lazy(
  () => import("@/pages/dashboard/articles/[id]/edit/edit-article"),
);
const CreateArticle = lazy(
  () => import("@/pages/dashboard/articles/create/create-article"),
);
const Dashboard = lazy(() => import("@/pages/dashboard/dashboard"));
const App = lazy(() => import("@/pages/home/app"));

function suspenseWrap(element) {
  return <Suspense fallback={<Loading />}>{element}</Suspense>;
}

function AppRoutes() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: suspenseWrap(<MainLayout />),
      children: [
        {
          path: "",
          element: suspenseWrap(<App />),
        },
        {
          path: "articles",
          children: [
            {
              path: "",
              element: suspenseWrap(<Articles />),
            },
            {
              path: ":articleId",
              element: suspenseWrap(<ViewArticle />),
            },
          ],
        },
        {
          path: "dashboard",
          element: suspenseWrap(<DashboardLayout />),
          children: [
            {
              path: "",
              element: suspenseWrap(<Dashboard />),
            },
            {
              path: "articles",
              children: [
                {
                  path: "create",
                  element: suspenseWrap(<CreateArticle />),
                },
                {
                  path: ":articleId/edit",
                  element: suspenseWrap(<EditArticle />),
                },
              ],
            },
          ],
        },
      ],
    },
    {
      path: "/auth/",
      element: suspenseWrap(<AuthLayout />),
      children: [
        {
          path: "sign-in",
          element: suspenseWrap(<SignIn />),
        },
        {
          path: "sign-up",
          element: suspenseWrap(<SignUp />),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default AppRoutes;
