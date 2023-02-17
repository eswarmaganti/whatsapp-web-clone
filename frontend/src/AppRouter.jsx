import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import AppPage from "./pages/AppPage";
import AuthLayout from "./components/layout/AuthLayout";
import ProtectedRoute from "./hoc/ProtectedRoute";
import UnProtectedRoute from "./hoc/UnProtectedRoute";
const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route
            index
            element={
              <UnProtectedRoute>
                <LoginPage />
              </UnProtectedRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <UnProtectedRoute>
                <SignupPage />
              </UnProtectedRoute>
            }
          />
        </Route>
        <Route
          path="/app"
          element={
            <ProtectedRoute>
              <AppPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
