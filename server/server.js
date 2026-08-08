require("dotenv").config();
const express = require("express");
const cors = require("cors");
const electiveRoutes = require("./routes/electiveRoutes");
const studentPreferenceRoutes =
require("./routes/studentPreferenceRoutes");

const adminRoutes = require("./routes/adminRoutes");

const studentRoutes = require("./routes/studentRoutes");

const preferenceRoutes = require("./routes/preferenceRoutes");

const allocationRoutes = require("./routes/allocationRoutes");

const dashboardRoutes = require("./routes/dashboardRoutes");
const studentAuthRoutes =
require("./routes/studentAuthRoutes");
const passwordRoutes =
require("./routes/passwordRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Smart Elective Backend is Running 🚀");
});



app.use(
"/password",
passwordRoutes
);
app.use("/students", studentRoutes);
app.use("/electives", electiveRoutes);
app.use("/admin", adminRoutes);
app.use("/preferences", preferenceRoutes);
app.use("/allocation", allocationRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/student/auth",studentAuthRoutes);
app.use(
"/student/preferences",
studentPreferenceRoutes
);

const PORT = 5000;

const prisma = require("./config/prisma");

async function testDB() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    console.log("✅ Database connected successfully!");
  } catch (error) {
    console.error("❌ Database connection failed:");
    console.error(error);
  }
}

testDB();

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});