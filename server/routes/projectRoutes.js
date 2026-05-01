const express = require("express");

const router = express.Router();

const {
  authMiddleware,
  adminOnly,
} = require("../middleware/authMiddleware");

const {
  createProject,
  getProjects,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");

// ================= GET PROJECTS =================
// Admin -> all projects
// Member -> assigned projects only

router.get(
  "/",
  authMiddleware,
  getProjects
);

// ================= CREATE PROJECT =================
// ONLY ADMIN

router.post(
  "/",
  authMiddleware,
  adminOnly,
  createProject
);

// ================= UPDATE PROJECT =================
// ONLY ADMIN

router.put(
  "/:id",
  authMiddleware,
  adminOnly,
  updateProject
);

// ================= DELETE PROJECT =================
// ONLY ADMIN

router.delete(
  "/:id",
  authMiddleware,
  adminOnly,
  deleteProject
);

module.exports = router;