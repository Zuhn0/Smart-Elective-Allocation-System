import { useState } from "react";
import {
  Paper,
  TextField,
  Button,
  Typography,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const res = await api.post("/admin/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);

      navigate("/");
    } catch (err) {
      alert("Invalid Credentials");
    }
  };

  return (
    <Paper sx={{ width: 400, p: 4, mx: "auto", mt: 10 }}>
      <Typography variant="h5" mb={3}>
        Admin Login
      </Typography>

      <Stack spacing={2}>
        <TextField
          label="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          type="password"
          label="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          variant="contained"
          onClick={login}
        >
          Login
        </Button>
      </Stack>
    </Paper>
  );
}

export default Login;