const express = require("express");
const router = express.Router();

const {
  createElective,
  getAllElectives,
  updateElective,
  deleteElective,
} = require("../controllers/electiveController");

router.post("/", createElective);
router.get("/", getAllElectives);
router.put("/:id", updateElective);
router.delete("/:id", deleteElective);

module.exports = router;