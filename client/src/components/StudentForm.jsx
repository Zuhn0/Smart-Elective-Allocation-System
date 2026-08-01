import { useState } from "react";
import {
  TextField,
  Button,
  Paper,
  Typography,
  Stack,
} from "@mui/material";
import api from "../services/api";

function StudentForm({ refreshStudents }) {
  const [student, setStudent] = useState({
    rollNumber: "",
    name: "",
    email: "",
    cgpa: "",
    department: "",
  });

  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/students", student);

      setStudent({
        rollNumber: "",
        name: "",
        email: "",
        cgpa: "",
        department: "",
      });

      refreshStudents();

      alert("Student Added Successfully");
    } catch (err) {
      console.log(err);
      alert("Failed to Add Student");
    }
  };

  return (
    <Paper sx={{ p: 3, mb: 4 }}>
      <Typography variant="h6" mb={2}>
        Add Student
      </Typography>

      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>

          <TextField
            label="Roll Number"
            name="rollNumber"
            value={student.rollNumber}
            onChange={handleChange}
            required
          />

          <TextField
            label="Name"
            name="name"
            value={student.name}
            onChange={handleChange}
            required
          />

          <TextField
            label="Email"
            name="email"
            value={student.email}
            onChange={handleChange}
            required
          />

          <TextField
            label="CGPA"
            name="cgpa"
            type="number"
            value={student.cgpa}
            onChange={handleChange}
            required
          />

          <TextField
            label="Department"
            name="department"
            value={student.department}
            onChange={handleChange}
            required
          />

          <Button
            variant="contained"
            type="submit"
          >
            Add Student
          </Button>

        </Stack>
      </form>
    </Paper>
  );
}

export default StudentForm;