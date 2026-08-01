const prisma = require("../config/prisma");
const { Parser } = require("json2csv");

const runAllocation = async (req, res) => {
  try {
    // Delete previous allocations
    await prisma.allocation.deleteMany();

    // Get all electives
    const electives = await prisma.elective.findMany();

    // Track remaining seats
    const remainingSeats = {};

    electives.forEach((elective) => {
      remainingSeats[elective.id] = elective.capacity;
    });

    // Get students sorted by CGPA
    const students = await prisma.student.findMany({
      orderBy: {
        cgpa: "desc",
      },
      include: {
        preferences: {
          orderBy: {
            rank: "asc",
          },
        },
      },
    });

    // Allocate
    for (const student of students) {
      for (const pref of student.preferences) {
        if (remainingSeats[pref.electiveId] > 0) {
          await prisma.allocation.create({
            data: {
              studentId: student.id,
              electiveId: pref.electiveId,
            },
          });

          remainingSeats[pref.electiveId]--;

          break;
        }
      }
    }

    res.json({
      message: "Allocation completed successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Allocation failed",
    });
  }
};

const getAllocations = async (req, res) => {
  try {
    const allocations = await prisma.allocation.findMany({
      include: {
        student: true,
        elective: true,
      },
      orderBy: {
        student: {
          cgpa: "desc",
        },
      },
    });

    res.json(allocations);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to fetch allocations",
    });
  }
};

const exportAllocationCSV = async (req, res) => {
  try {
    const allocations = await prisma.allocation.findMany({
      include: {
        student: true,
        elective: true,
      },
    });

    const data = allocations.map((allocation) => ({
      RollNumber: allocation.student.rollNumber,
      Name: allocation.student.name,
      Department: allocation.student.department,
      CGPA: allocation.student.cgpa,
      Elective: allocation.elective.name,
    }));

    const parser = new Parser();

    const csv = parser.parse(data);

    res.header("Content-Type", "text/csv");

    res.attachment("allocation_results.csv");

    return res.send(csv);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "CSV Export Failed",
    });

  }
};

module.exports = {
  runAllocation,
  getAllocations,
  exportAllocationCSV,
};