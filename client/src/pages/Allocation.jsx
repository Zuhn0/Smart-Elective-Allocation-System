import { useEffect, useState } from "react";
import {
  Button,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
} from "@mui/material";

import DashboardLayout from "../layouts/DashboardLayout";
import api from "../services/api";

function Allocation() {
  const [allocations, setAllocations] = useState([]);

  useEffect(() => {
    fetchAllocations();
  }, []);

  const fetchAllocations = async () => {
    try {
      const res = await api.get("/allocation");
      setAllocations(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const runAllocation = async () => {
    try {
      await api.post("/allocation");

      alert("Allocation Completed");

      fetchAllocations();
    } catch (err) {
      console.log(err);
      alert("Allocation Failed");
    }
  };

  return (
    <DashboardLayout>
      <Button
        variant="contained"
        onClick={runAllocation}
        sx={{ mb: 3 }}
        size="large"
        color="success"
      >
        Run Allocation
      </Button>

          <Button
      variant="outlined"
      sx={{ ml: 2 }}
      href="http://localhost:5000/allocation/export"
    >
      Export CSV
    </Button>

      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" mb={2}>
          Allocation Results
        </Typography>

        <Table>
          <TableHead>
            <TableRow>
          <TableCell>Roll No</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Department</TableCell>
          <TableCell>CGPA</TableCell>
          <TableCell>Allocated Elective</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {allocations.map((allocation) => (
              <TableRow key={allocation.id}>
                <TableCell>{allocation.student.rollNumber}</TableCell>
                <TableCell>{allocation.student.name}</TableCell>
                <TableCell>{allocation.student.department}</TableCell>
                <TableCell>{allocation.student.cgpa}</TableCell>
                <TableCell>{allocation.elective.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </DashboardLayout>
  );
}

export default Allocation;