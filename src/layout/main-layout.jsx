import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import Footer from "@/components/common/footer";
import Navbar from "@/components/common/navbar";

function MainLayout() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname]);

  return (
    <div className="mx-auto flex w-11/12 flex-col gap-10 py-5 2xl:max-w-4/5">
      <Navbar />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default MainLayout;
