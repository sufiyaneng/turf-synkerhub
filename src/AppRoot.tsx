import React from "react";
import { Route, Routes } from "react-router-dom";
import Auth from "./pages/auth";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";

const AppRoot: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="auth/*" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/profile" element={<Profile/>} />

      </Routes>
    </>
  );
};

export default AppRoot;

