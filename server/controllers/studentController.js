const prisma = require("../config/prisma");

const bcrypt=require("bcrypt");
const createStudent = async (req, res) => {
  try {
    const { rollNumber, name, email, cgpa, department } = req.body;
    const hashedPassword =
await bcrypt.hash("123456",10);

    const student = await prisma.student.create({
      data: {
        rollNumber,
        name,
        email,
        password: hashedPassword,
        cgpa: parseFloat(cgpa), // Ensure CGPA is stored as a float
        department,
      },
    });

    res.status(201).json(student);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create student" });
  }
};

const getAllStudents = async (req, res) => {
  try {
    const students = await prisma.student.findMany();

    res.status(200).json(students);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch students" });
  }
};

const updateStudent = async (req, res) => {
  try {
    const id = Number(req.params.id);  //convert string to number

    const { rollNumber, name, email, cgpa, department } = req.body;

    const student = await prisma.student.update({
      where: {
        id,
      },
      data: {
        rollNumber,
        name,
        email,
        cgpa: parseFloat(cgpa), // Ensure CGPA is stored as a float
        department,
      },
    });

    res.status(200).json(student);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to update student",
    });
  }
};


const resetStudentPassword = async (req,res)=>{

  try{

    const id = Number(req.params.id);

    const { password } = req.body;


    const hashedPassword = await bcrypt.hash(
      password,
      10
    );


    const student = await prisma.student.update({

      where:{
        id
      },

      data:{
        password: hashedPassword
      }

    });


    res.json({
      message:"Password updated successfully"
    });


  }
  catch(error){

    console.log(error);

    res.status(500).json({
      message:"Password reset failed"
    });

  }

};

const deleteStudent = async (req, res) => {
  try {
    const id = Number(req.params.id);

    await prisma.$transaction(async (tx) => {
      // Delete preferences first
      await tx.preference.deleteMany({
        where: {
          studentId: id,
        },
      });

      // Delete allocations
      await tx.allocation.deleteMany({
        where: {
          studentId: id,
        },
      });

      // Finally delete the student
      await tx.student.delete({
        where: {
          id,
        },
      });
    });

    res.status(200).json({
      message: "Student deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete student",
    });
  }
};

module.exports = {
  createStudent,
  resetStudentPassword,
  getAllStudents,
  updateStudent,
  deleteStudent,
};