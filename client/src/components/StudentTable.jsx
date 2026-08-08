import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";

import api from "../services/api";


function StudentTable({
  students,
  refreshStudents,
  search
}) {


  const deleteStudent = async(id)=>{

    try{

      await api.delete(`/students/${id}`);

      alert("Student deleted successfully");

      refreshStudents();

    }
    catch(error){

      console.log(error);

      alert("Failed to delete student");

    }

  };



  const resetPassword = async(id)=>{


    const password = prompt(
      "Enter new password for student:"
    );


    if(!password)
      return;



    try{


      await api.put(
        `/students/${id}/reset-password`,
        {
          password
        }
      );


      alert(
        "Password updated successfully"
      );


    }
    catch(error){

      console.log(error);

      alert(
        "Password reset failed"
      );

    }

  };



  const filteredStudents = students.filter((student)=>{


    const value = search?.toLowerCase() || "";


    return (

      student.name
      .toLowerCase()
      .includes(value)

      ||

      student.email
      .toLowerCase()
      .includes(value)

      ||

      student.rollNumber
      .toLowerCase()
      .includes(value)

    );

  });



  return (

    <Paper
      sx={{
        mt:3,
        overflow:"auto"
      }}
    >

      <Table>


        <TableHead
          sx={{
            backgroundColor:"#1976d2"
          }}
        >

          <TableRow>

            <TableCell sx={{color:"white",fontWeight:"bold"}}>
              Roll No
            </TableCell>

            <TableCell sx={{color:"white",fontWeight:"bold"}}>
              Name
            </TableCell>

            <TableCell sx={{color:"white",fontWeight:"bold"}}>
              Email
            </TableCell>

            <TableCell sx={{color:"white",fontWeight:"bold"}}>
              CGPA
            </TableCell>

            <TableCell sx={{color:"white",fontWeight:"bold"}}>
              Department
            </TableCell>

            <TableCell sx={{color:"white",fontWeight:"bold"}}>
              Actions
            </TableCell>


          </TableRow>

        </TableHead>




        <TableBody>


        {
          filteredStudents.map((student)=>(


            <TableRow
              key={student.id}
            >


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
                  variant="outlined"
                  color="warning"
                  size="small"
                  sx={{mr:1}}
                  onClick={()=>
                    resetPassword(student.id)
                  }
                >

                  Reset Password

                </Button>



                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  onClick={()=>
                    deleteStudent(student.id)
                  }
                >

                  Delete

                </Button>


              </TableCell>


            </TableRow>


          ))
        }


        </TableBody>


      </Table>


    </Paper>

  );

}


export default StudentTable;