const prisma = require("../config/prisma");

const submitPreferences = async (req, res) => {
  try {
    const { studentId, preferences } = req.body;

    // Check if student exists
    const student = await prisma.student.findUnique({
      where: {
        id: studentId,
      },
    });

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    await prisma.$transaction(async (tx) => {
      // Delete old preferences
      await tx.preference.deleteMany({
        where: {
          studentId,
        },
      });

      // Insert new preferences
      await tx.preference.createMany({
        data: preferences.map((pref) => ({
          studentId,
          electiveId: pref.electiveId,
          rank: pref.rank,
        })),
      });
    });

    res.status(200).json({
      message: "Preferences submitted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to submit preferences",
    });
  }
};

const getAllPreferences = async (req, res) => {
  try {
    const preferences = await prisma.preference.findMany({
      include: {
        student: true,
        elective: true,
      },
      orderBy: [
        { studentId: "asc" },
        { rank: "asc" },
      ],
    });

    // Group preferences by student
    const grouped = {};

    preferences.forEach((pref) => {
      const id = pref.student.id;

      if (!grouped[id]) {
        grouped[id] = {
          studentId: pref.student.id,
          studentName: pref.student.name,
          rollNumber: pref.student.rollNumber,
          preferences: [],
        };
      }

      grouped[id].preferences.push({
        rank: pref.rank,
        elective: pref.elective.name,
      });
    });

    res.json(Object.values(grouped));
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch preferences",
    });
  }
};

module.exports = {
  submitPreferences,
  getAllPreferences,
};