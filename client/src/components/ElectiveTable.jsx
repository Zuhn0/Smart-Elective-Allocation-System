import {
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@mui/material";

import api from "../services/api";

function ElectiveTable({
  electives,
  refreshElectives,
  search,
}) {
  const deleteElective = async (id) => {
    if (!window.confirm("Delete Elective?"))
      return;

    try {
      await api.delete(`/electives/${id}`);

      refreshElectives();
    } catch (err) {
      console.log(err);
      alert("Delete Failed");
    }
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" mb={2}>
        Elective List
      </Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Code</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Credits</TableCell>
            <TableCell>Capacity</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {electives
  .filter(
    (elective) =>
      elective.name.toLowerCase().includes(search.toLowerCase()) ||
      elective.code.toLowerCase().includes(search.toLowerCase())
        ).map((elective) => (
            <TableRow key={elective.id}>
              <TableCell>{elective.code}</TableCell>
              <TableCell>{elective.name}</TableCell>
              <TableCell>{elective.credits}</TableCell>
              <TableCell>{elective.capacity}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() =>
                    deleteElective(elective.id)
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

export default ElectiveTable;