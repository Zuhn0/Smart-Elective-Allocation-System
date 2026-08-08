import { useState } from "react";
import {
  TextField,
  Button,
  Paper,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";

import api from "../services/api";

function Login() {

  const [role, setRole] = useState("admin");

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");



  const handleLogin = async()=>{

    try{

      let url="";

      if(role==="admin"){
        url="/admin/login";
      }
      else{
        url="/student/auth/login";
      }


      const res = await api.post(url,{
        email,
        password
      });


      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
      "student",
       JSON.stringify(res.data.student)
      );

      localStorage.setItem(
        "role",
        role
      );


      if(role==="admin"){
        window.location.href="/";
      }
      else{
        window.location.href="/student/dashboard";
      }


    }
    catch(error){

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Login failed"
      );

    }

  };



  return (

    <Paper
      sx={{
        width:400,
        margin:"100px auto",
        padding:4
      }}
    >

      <Typography variant="h5">
        Login
      </Typography>


      <RadioGroup
        row
        value={role}
        onChange={(e)=>setRole(e.target.value)}
      >

        <FormControlLabel
          value="admin"
          control={<Radio />}
          label="Admin"
        />

        <FormControlLabel
          value="student"
          control={<Radio />}
          label="Student"
        />

      </RadioGroup>



      <TextField
        fullWidth
        label="Email"
        margin="normal"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
      />


      <TextField
        fullWidth
        label="Password"
        type="password"
        margin="normal"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
      />


      <Button
        fullWidth
        variant="contained"
        onClick={handleLogin}
      >
        Login
      </Button>


    </Paper>

  );
}


export default Login;