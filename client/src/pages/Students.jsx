import { useEffect, useState } from "react";
import { TextField, Typography } from "@mui/material";
import DashboardLayout from "../layouts/DashboardLayout";
import StudentForm from "../components/StudentForm";
import StudentTable from "../components/StudentTable";
import api from "../services/api";

function Students() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");

  const fetchStudents = async () => {
    try {
      const res = await api.get("/students");
      setStudents(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <DashboardLayout>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Students
      </Typography>

      <StudentForm refreshStudents={fetchStudents} />

      <TextField
        fullWidth
        label="Search Student"
        placeholder="Search by Name or Roll Number"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 3 }}
      />

      <StudentTable
        students={students}
        refreshStudents={fetchStudents}
        search={search}
      />
    </DashboardLayout>
  );
}

export default Students;