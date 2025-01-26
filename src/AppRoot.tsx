import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Auth from "./pages/auth";

const AppRoot: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="auth/*" element={<Auth />} />
        <Route path="/" element={<Navigate to="auth/login" />} />
      </Routes>
    </>
  );
};

export default AppRoot;

