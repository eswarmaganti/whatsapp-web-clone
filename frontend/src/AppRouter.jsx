import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import AppPage from "./pages/AppPage";
import AuthLayout from "./components/layout/AuthLayout";
const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Route>
        <Route path="/app" element={<AppPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
