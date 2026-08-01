const express = require("express");

const router = express.Router();

const {
  submitPreferences,
  getAllPreferences,
} = require("../controllers/preferenceController");
const authenticateAdmin = require("../middleware/authMiddleware");

router.get("/", getAllPreferences);

router.post("/", submitPreferences);

module.exports = router;