import express from "express";
import {
  protect,
  adminOnly,
} from "../middleware/authMiddleware.js";
import {
  getApps,
  createApp,
  downloadApp,
  getAdminApps,
  approveApp,
  rejectApp,
  deleteApp,
} from "../controllers/appController.js";

import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

// ==========================================
// PUBLIC
// ==========================================

router.get("/apps", getApps);

router.post(
  "/apps",
  protect,
  upload.fields([
    { name: "apk", maxCount: 1 },
    { name: "icon", maxCount: 1 },
    { name: "screenshots", maxCount: 6 },
  ]),
  createApp
);

router.post(
  "/apps/:id/download",
  downloadApp
);


// ==========================================
// ADMIN
// ==========================================

router.get(
  "/admin/apps",
  getAdminApps
);

router.patch(
  "/admin/apps/:id/approve",
  approveApp
);

router.patch(
  "/admin/apps/:id/reject",
  rejectApp
);

router.delete(
  "/admin/apps/:id",
  deleteApp
);

export default router;