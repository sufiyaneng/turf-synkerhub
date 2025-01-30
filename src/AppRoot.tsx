import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Auth from "./pages/auth";
import Dashboard from "./pages/Dashboard";

const AppRoot: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="auth/*" element={<Auth />} />
        <Route path="/" element={<Navigate to="auth/login" />} />
        <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>
    </>
  );
};

export default AppRoot;

