import { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Stack,
} from "@mui/material";

import DashboardLayout from "../layouts/DashboardLayout";
import api from "../services/api";
import PreferenceTable from "../components/PreferenceTable";

function Preferences() {
  const [students, setStudents] = useState([]);
  const [electives, setElectives] = useState([]);
  const [submittedPreferences, setSubmittedPreferences] = useState([]);

  const [studentId, setStudentId] = useState("");

  const [rank1, setRank1] = useState("");
  const [rank2, setRank2] = useState("");
  const [rank3, setRank3] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
  try {
    const studentRes = await api.get("/students");
    const electiveRes = await api.get("/electives");
    const preferenceRes = await api.get("/preferences");

    setStudents(studentRes.data);
    setElectives(electiveRes.data);
    setSubmittedPreferences(preferenceRes.data);
  } catch (err) {
    console.log(err);
  }
};

  const submitPreferences = async () => {

    
    try {
      await api.post("/preferences", {
        studentId: Number(studentId),

        preferences: [
          {
            electiveId: Number(rank1),
            rank: 1,
          },
          {
            electiveId: Number(rank2),
            rank: 2,
          },
          {
            electiveId: Number(rank3),
            rank: 3,
          },
        ],
      });

      alert("Preferences Submitted");

      fetchData();
      setStudentId("");
      setRank1("");
      setRank2("");
      setRank3("");
    } catch (err) {
      console.log(err);
      alert("Submission Failed");
    }
  };

  return (
    <DashboardLayout>
      <Paper sx={{ p: 4 }}>

        <Typography variant="h5" mb={3}>
          Student Preferences
        </Typography>

        <Stack spacing={3}>

          <FormControl fullWidth>

            <InputLabel>Student</InputLabel>

            <Select
              value={studentId}
              label="Student"
              onChange={(e) =>
                setStudentId(e.target.value)
              }
            >
              {students.map((student) => (
                <MenuItem
                  key={student.id}
                  value={student.id}
                >
                  {student.name}
                </MenuItem>
              ))}
            </Select>

          </FormControl>

          {[1, 2, 3].map((rank) => (
            <FormControl fullWidth key={rank}>
              <InputLabel>
                Rank {rank}
              </InputLabel>

              <Select
                value={
                  rank === 1
                    ? rank1
                    : rank === 2
                    ? rank2
                    : rank3
                }
                label={`Rank ${rank}`}
                onChange={(e) => {
                  if (rank === 1)
                    setRank1(e.target.value);

                  if (rank === 2)
                    setRank2(e.target.value);

                  if (rank === 3)
                    setRank3(e.target.value);
                }}
              >
                {electives.map((elective) => (
                  <MenuItem
                    key={elective.id}
                    value={elective.id}
                  >
                    {elective.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ))}

          <Button
            variant="contained"
            onClick={submitPreferences}
          >
            Submit Preferences
          </Button>
          <PreferenceTable preferences={submittedPreferences} />
        </Stack>

      </Paper>
    </DashboardLayout>
  );
}

export default Preferences;