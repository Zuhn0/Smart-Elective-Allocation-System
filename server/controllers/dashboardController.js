const prisma = require("../config/prisma");

const getDashboardStats = async (req, res) => {
  try {
    const students = await prisma.student.count();

    const electives = await prisma.elective.count();

    const preferences = await prisma.preference.count();

    const allocations = await prisma.allocation.count();

    res.json({
      students,
      electives,
      preferences,
      allocations,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to fetch dashboard stats",
    });
  }
};

module.exports = {
  getDashboardStats,
};