const prisma = require("../config/prisma");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const studentLogin = async (req, res) => {
  try {
    const { email, password } = req.body;


    const student = await prisma.student.findUnique({
      where: {
        email,
      },
    });


    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }


    const isMatch = await bcrypt.compare(
      password,
      student.password
    );


    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }


    const token = jwt.sign(
      {
        id: student.id,
        role: "student",
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );


    res.json({
      message: "Login successful",
      token,
      student: {
        id: student.id,
        name: student.name,
        email: student.email,
      },
    });


  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Login failed",
    });
  }
};


module.exports = {
  studentLogin,
};