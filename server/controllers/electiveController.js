const prisma = require("../config/prisma");

console.log(Object.keys(prisma));

const createElective = async (req, res) => {
  try {
    const { code, name, credits, capacity } = req.body;

    const elective = await prisma.elective.create({
      data: {
        code,
        name,
        credits: parseInt(credits),
        capacity: parseInt(capacity),
      },
    });

    res.status(201).json(elective);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create elective",
    });
  }
};

const getAllElectives = async (req, res) => {
  try {
    const electives = await prisma.elective.findMany();

    res.status(200).json(electives);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch electives",
    });
  }
};

const updateElective = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const { code, name, credits, capacity } = req.body;

    const elective = await prisma.elective.update({
      where: {
        id,
      },
      data: {
        code,
        name,
        credits: parseInt(credits),
        capacity: parseInt(capacity),
      },
    });

    res.status(200).json(elective);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update elective",
    });
  }
};


const deleteElective = async (req, res) => {
  try {
    const id = Number(req.params.id);

    await prisma.$transaction(async (tx) => {
      await tx.preference.deleteMany({
        where: {
          electiveId: id,
        },
      });

      await tx.allocation.deleteMany({
        where: {
          electiveId: id,
        },
      });

      await tx.elective.delete({
        where: {
          id,
        },
      });
    });

    res.status(200).json({
      message: "Elective deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete elective",
    });
  }
};

module.exports = {
  createElective,
  getAllElectives,
  updateElective,
  deleteElective,
};