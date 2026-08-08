import { useEffect, useState } from "react";
import api from "../services/api";

import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Select,
  MenuItem,
  Button,
  Alert,
} from "@mui/material";

function StudentPreferenceForm() {
  const [electives, setElectives] = useState([]);
  const [preferences, setPreferences] = useState({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchElectives();
  }, []);

  const fetchElectives = async () => {
    try {
      const res = await api.get("/electives");
      setElectives(res.data);
    } catch (err) {
      console.log(err);
    }
  };

const handleRankChange = (electiveId, rank) => {

  const duplicate = Object.entries(preferences).find(
    ([id, value]) =>
      Number(id) !== electiveId &&
      Number(value) === Number(rank)
  );

  if (duplicate) {
    alert("This rank has already been selected.");
    return;
  }

  setPreferences({
    ...preferences,
    [electiveId]: rank,
  });

};

  const submitPreferences = async () => {
    try {
      const student = JSON.parse(localStorage.getItem("student"));

      const data = Object.keys(preferences).map((id) => ({
        electiveId: Number(id),
        rank: preferences[id],
      }));

      await api.post("/student/preferences/submit", {
        studentId: student.id,
        preferences: data,
      });

      setMessage("Preferences submitted successfully.");
    } catch (err) {
      console.log(err);
      setMessage("Failed to submit preferences.");
    }
  };

  return (
    <Box>
      <Card sx={{ mb: 3, backgroundColor: "#f5f7fa" }}>
        <CardContent>
          <Typography variant="h5" fontWeight="bold">
            Elective Preference Form
          </Typography>

          <Typography color="text.secondary" sx={{ mt: 1 }}>
            Assign a unique rank to each elective.
            Rank 1 means your highest preference.
          </Typography>
        </CardContent>
      </Card>

      <Grid container spacing={3}>
        {electives.map((elective) => (
          <Grid item xs={12} md={6} key={elective.id}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant="h6">
                  {elective.name}
                </Typography>

                <Typography color="text.secondary">
                  Code: {elective.code}
                </Typography>

                <Typography color="text.secondary">
                  Credits: {elective.credits}
                </Typography>

                <Typography color="text.secondary" sx={{ mb: 2 }}>
                  Capacity: {elective.capacity}
                </Typography>

                <Select
                  fullWidth
                  value={preferences[elective.id] || ""}
                  displayEmpty
                  onChange={(e) =>
                    handleRankChange(
                      elective.id,
                      e.target.value
                    )
                  }
                >
                  <MenuItem value="">
                    Select Rank
                  </MenuItem>

                  {electives.map((_, index) => (
                    <MenuItem
                      key={index + 1}
                      value={index + 1}
                    >
                      Rank {index + 1}
                    </MenuItem>
                  ))}
                </Select>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

          <Typography sx={{ mt: 3 }}>
      Preferences Selected: {Object.keys(preferences).length} / {electives.length}
      </Typography>

      <Button
        variant="contained"
        size="large"
        sx={{ mt: 4 }}
        disabled={
          Object.keys(preferences).length !== electives.length
        }
        onClick={submitPreferences}
      >
        Submit Preferences
      </Button>

      {message && (
        <Alert sx={{ mt: 3 }}>
          {message}
        </Alert>
      )}
    </Box>
  );
}

export default StudentPreferenceForm;