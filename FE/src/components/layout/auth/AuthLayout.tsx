import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-200 via-white to-purple-200">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
