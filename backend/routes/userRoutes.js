import { Router } from "express";

import {
  loginUser,
  registerUser,
  getAllUsers,
  updateUserProfile,
} from "../controllers/userController.js";
import isAuthenticated from "./../middleware/authMiddleware.js";

const router = Router();

router
  .post("/register", registerUser)
  .post("/login", loginUser)
  .get("/", isAuthenticated, getAllUsers)
  .put("/", isAuthenticated, updateUserProfile);

export default router;
