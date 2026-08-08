const express = require("express");
const router = express.Router();
const authenticateAdmin = require("../middleware/authMiddleware");

const {
  createStudent,
  getAllStudents,
  updateStudent,
  deleteStudent,
} = require("../controllers/studentController");

const {
resetStudentPassword
}=require("../controllers/studentController");

router.post("/", createStudent);

router.get("/", getAllStudents);

router.delete("/:id", deleteStudent);

router.put("/:id", updateStudent);

router.post("/", authenticateAdmin, createStudent);

router.put("/:id", authenticateAdmin, updateStudent);

router.delete("/:id", authenticateAdmin, deleteStudent);

router.put(
"/:id/reset-password",
resetStudentPassword
);

module.exports = router;