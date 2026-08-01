import { useState } from "react";
import {
  Paper,
  Typography,
  Stack,
  TextField,
  Button,
} from "@mui/material";
import api from "../services/api";

function ElectiveForm({ refreshElectives }) {
  const [elective, setElective] = useState({
    code: "",
    name: "",
    credits: "",
    capacity: "",
  });

  const handleChange = (e) => {
    setElective({
      ...elective,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/electives", elective);

      setElective({
        code: "",
        name: "",
        credits: "",
        capacity: "",
      });

      refreshElectives();

      alert("Elective Added Successfully");
    } catch (err) {
      console.log(err);
      alert("Failed to Add Elective");
    }
  };

  return (
    <Paper sx={{ p: 3, mb: 4 }}>
      <Typography variant="h6" mb={2}>
        Add Elective
      </Typography>

      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            label="Code"
            name="code"
            value={elective.code}
            onChange={handleChange}
            required
          />

          <TextField
            label="Name"
            name="name"
            value={elective.name}
            onChange={handleChange}
            required
          />

          <TextField
            label="Credits"
            name="credits"
            type="number"
            value={elective.credits}
            onChange={handleChange}
            required
          />

          <TextField
            label="Capacity"
            name="capacity"
            type="number"
            value={elective.capacity}
            onChange={handleChange}
            required
          />

          <Button variant="contained" type="submit">
            Add Elective
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}

export default ElectiveForm;