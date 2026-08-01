import {
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

function PreferenceTable({ preferences }) {
  return (
    <Paper sx={{ p: 2, mt: 4 }}>
      <Typography variant="h6" mb={2}>
        Submitted Preferences
      </Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell><b>Roll No</b></TableCell>
            <TableCell><b>Student</b></TableCell>
            <TableCell><b>Preference 1</b></TableCell>
            <TableCell><b>Preference 2</b></TableCell>
            <TableCell><b>Preference 3</b></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {preferences.map((student) => (
            <TableRow key={student.studentId}>
              <TableCell>{student.rollNumber}</TableCell>

              <TableCell>{student.studentName}</TableCell>

              <TableCell>
                {student.preferences.find((p) => p.rank === 1)?.elective || "-"}
              </TableCell>

              <TableCell>
                {student.preferences.find((p) => p.rank === 2)?.elective || "-"}
              </TableCell>

              <TableCell>
                {student.preferences.find((p) => p.rank === 3)?.elective || "-"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default PreferenceTable;