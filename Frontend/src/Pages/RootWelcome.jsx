import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const RootWelcome = () => {
  return (
    <div className="relative">
      <div className="absolute right-0 top-0 z-30 bg-transparent">
        <Header />
      </div>

      <Outlet />
    </div>
  );
};

export default RootWelcome;
