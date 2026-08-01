import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Typography,
} from "@mui/material";

import api from "../services/api";

function StudentTable({
  students,
  refreshStudents,
  search,
}) {

  const deleteStudent = async (id) => {

    if (!window.confirm("Delete Student?"))
      return;

    try {

      await api.delete(`/students/${id}`);

      refreshStudents();

    } catch (err) {

      console.log(err);

      alert("Delete Failed");

    }

  };

  return (

    <Paper sx={{ p: 2 }}>

      <Typography
        variant="h6"
        mb={2}
      >
        Student List
      </Typography>

      <Table>

        <TableHead>

          <TableRow>

            <TableCell>Roll No</TableCell>

            <TableCell>Name</TableCell>

            <TableCell>Email</TableCell>

            <TableCell>CGPA</TableCell>

            <TableCell>Department</TableCell>

            <TableCell>Action</TableCell>

          </TableRow>

        </TableHead>

        <TableBody>

          {students
.filter(student =>
    student.name.toLowerCase().includes(search.toLowerCase()) ||
    student.rollNumber.toLowerCase().includes(search.toLowerCase())
).map((student) => (

            <TableRow key={student.id}>

              <TableCell>
                {student.rollNumber}
              </TableCell>

              <TableCell>
                {student.name}
              </TableCell>

              <TableCell>
                {student.email}
              </TableCell>

              <TableCell>
                {student.cgpa}
              </TableCell>

              <TableCell>
                {student.department}
              </TableCell>

              <TableCell>

                <Button
                  color="error"
                  variant="contained"
                  onClick={() =>
                    deleteStudent(student.id)
                  }
                >
                  Delete
                </Button>

              </TableCell>

            </TableRow>

          ))}

        </TableBody>

      </Table>

    </Paper>

  );

}

export default StudentTable;