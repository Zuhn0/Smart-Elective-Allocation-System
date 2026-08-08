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
  Box,
} from "@mui/material";

import DashboardLayout from "../layouts/DashboardLayout";
import api from "../services/api";


function Allocation() {

  const [allocations, setAllocations] = useState([]);
  const [loading, setLoading] = useState(false);


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

      setLoading(true);

      await api.post("/allocation");

      alert("Allocation Completed Successfully");

      fetchAllocations();

    } catch (err) {

      console.log(err);

      alert("Allocation Failed");

    }
    finally {

      setLoading(false);

    }

  };



  return (

    <DashboardLayout>


      <Typography
        variant="h4"
        fontWeight="bold"
        sx={{ mb: 3 }}
      >
        Smart Elective Allocation
      </Typography>



      <Box
        sx={{
          display:"flex",
          gap:2,
          mb:3
        }}
      >


        <Button
          variant="contained"
          color="success"
          size="large"
          onClick={runAllocation}
          disabled={loading}
        >

          {loading 
            ? "Running Allocation..."
            : "Run Allocation"
          }

        </Button>



        <Button
          variant="outlined"
          size="large"
          href="https://smart-elective-allocation-system.onrender.com/allocation/export"
        >

          Export CSV

        </Button>


      </Box>





      <Paper
        sx={{
          p:3
        }}
      >


        <Typography
          variant="h6"
          sx={{ mb:2 }}
        >

          Allocation Results

        </Typography>



        {
          allocations.length === 0 ?

          (

            <Typography
              align="center"
              sx={{
                py:5
              }}
              color="text.secondary"
            >

              No allocation has been generated yet.

            </Typography>

          )

          :

          (

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
                  Department
                </TableCell>


                <TableCell sx={{color:"white",fontWeight:"bold"}}>
                  CGPA
                </TableCell>


                <TableCell sx={{color:"white",fontWeight:"bold"}}>
                  Allocated Elective
                </TableCell>


              </TableRow>


            </TableHead>




            <TableBody>


              {
                allocations.map((allocation)=>(


                  <TableRow
                    key={allocation.id}
                  >


                    <TableCell>
                      {allocation.student.rollNumber}
                    </TableCell>


                    <TableCell>
                      {allocation.student.name}
                    </TableCell>


                    <TableCell>
                      {allocation.student.department}
                    </TableCell>


                    <TableCell>
                      {allocation.student.cgpa.toFixed(2)}
                    </TableCell>


                    <TableCell>
                      {allocation.elective.name}
                    </TableCell>


                  </TableRow>


                ))
              }


            </TableBody>


          </Table>

          )

        }


      </Paper>


    </DashboardLayout>

  );

}


export default Allocation;