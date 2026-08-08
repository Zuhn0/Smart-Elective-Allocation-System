const express = require("express");

const {
  studentLogin,
} = require("../controllers/studentAuthController");


const router = express.Router();


router.post(
  "/login",
  studentLogin
);


module.exports = router;