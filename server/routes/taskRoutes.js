const express = require("express");

const router = express.Router();

const {
  authMiddleware,
  adminOnly,
} = require("../middleware/authMiddleware");

const {
  createTask,
  getTasks,
  updateTaskStatus,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

// ================= GET TASKS =================

router.get(
  "/",
  authMiddleware,
  getTasks
);

// ================= CREATE TASK =================

router.post(
  "/",
  authMiddleware,
  adminOnly,
  createTask
);

// ================= UPDATE TASK STATUS =================
// Member -> own assigned task
// Admin -> any task

router.put(
  "/:id/status",
  authMiddleware,
  updateTaskStatus
);

// ================= FULL TASK UPDATE =================
// ADMIN ONLY

router.put(
  "/:id",
  authMiddleware,
  adminOnly,
  updateTask
);

// ================= DELETE TASK =================
// ADMIN ONLY

router.delete(
  "/:id",
  authMiddleware,
  adminOnly,
  deleteTask
);

module.exports = router;