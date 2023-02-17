import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UnProtectedRoute = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { user } = useSelector((state) => state.whatsAppUserInfo);

  const navigate = useNavigate();
  const validateUserToken = () => {
    if (Object.keys(user).length && user?.token) {
      setIsLoggedIn(true);
      return navigate("/app");
    }
    setIsLoggedIn(false);
  };

  useEffect(() => {
    validateUserToken();
  }, [isLoggedIn]);

  return !isLoggedIn ? children : null;
};

export default UnProtectedRoute;
