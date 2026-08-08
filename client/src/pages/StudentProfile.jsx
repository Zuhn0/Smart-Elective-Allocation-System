import { useState } from "react";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Box,
  Alert
} from "@mui/material";

import StudentLayout from "../layouts/StudentLayout";
import api from "../services/api";


function StudentProfile() {


  const student = JSON.parse(
    localStorage.getItem("student")
  );


  const [oldPassword,setOldPassword] = useState("");
  const [newPassword,setNewPassword] = useState("");
  const [confirmPassword,setConfirmPassword] = useState("");

  const [message,setMessage] = useState("");



  const changePassword = async()=>{


    if(newPassword !== confirmPassword){

      setMessage("New passwords do not match");
      return;

    }


    try{


      await api.post(
        "/password/student/change-password",
        {
          studentId: student.id,
          oldPassword,
          newPassword
        }
      );


      setMessage(
        "Password changed successfully"
      );


      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");


    }
    catch(error){

      console.log(error);

      setMessage(
        error.response?.data?.message ||
        "Password change failed"
      );

    }


  };



  return (

    <StudentLayout>


      <Card
        sx={{
          maxWidth:500,
          margin:"auto",
          mt:4
        }}
      >

        <CardContent>


          <Typography
            variant="h5"
            fontWeight="bold"
          >
            My Profile
          </Typography>


          <Box sx={{mt:2}}>

            <Typography>
              Name: {student?.name}
            </Typography>


            <Typography>
              Email: {student?.email}
            </Typography>

          </Box>



          <Typography
            variant="h6"
            sx={{mt:4}}
          >
            Change Password
          </Typography>



          <TextField
            fullWidth
            margin="normal"
            type="password"
            label="Current Password"
            value={oldPassword}
            onChange={(e)=>
              setOldPassword(e.target.value)
            }
          />



          <TextField
            fullWidth
            margin="normal"
            type="password"
            label="New Password"
            value={newPassword}
            onChange={(e)=>
              setNewPassword(e.target.value)
            }
          />



          <TextField
            fullWidth
            margin="normal"
            type="password"
            label="Confirm New Password"
            value={confirmPassword}
            onChange={(e)=>
              setConfirmPassword(e.target.value)
            }
          />



          <Button
            fullWidth
            variant="contained"
            sx={{mt:2}}
            onClick={changePassword}
          >

            Update Password

          </Button>



          {
            message &&

            <Alert
              sx={{mt:3}}
            >

              {message}

            </Alert>

          }


        </CardContent>


      </Card>


    </StudentLayout>

  );

}


export default StudentProfile;