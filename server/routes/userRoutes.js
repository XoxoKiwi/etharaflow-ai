const express = require("express");

const router = express.Router();

const {
  authMiddleware,
} = require("../middleware/authMiddleware");

const {
  getUsers,
} = require("../controllers/userController");

// ================= PROTECTED ROUTES =================

router.use(authMiddleware);

// ================= GET USERS =================

router.get("/", getUsers);

module.exports = router;