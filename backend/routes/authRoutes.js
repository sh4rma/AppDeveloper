import express from "express";

import {
  register,
  login,
  adminLogin,
  updateProfile,
} from "../controllers/authController.js";

import {
  protect,
} from "../middleware/authMiddleware.js";

const router = express.Router();

// ==========================================
// DEVELOPER REGISTER
// ==========================================

router.post(
  "/register",
  register
);

// ==========================================
// DEVELOPER LOGIN
// ==========================================

router.post(
  "/login",
  login
);

// ==========================================
// ADMIN LOGIN
// ==========================================

router.post(
  "/admin/login",
  adminLogin
);

// ==========================================
// UPDATE PROFILE
// ==========================================

router.put(
  "/profile",
  protect,
  updateProfile
);

export default router;