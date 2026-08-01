import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import ElectiveForm from "../components/ElectiveForm";
import ElectiveTable from "../components/ElectiveTable";
import api from "../services/api";
import { TextField, Typography } from "@mui/material";

function Electives() {
  const [electives, setElectives] = useState([]);
  const [search, setSearch] = useState("");
  const fetchElectives = async () => {
    try {
      const res = await api.get("/electives");
      setElectives(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchElectives();
  }, []);

  return (
    <DashboardLayout>
      <h2>Electives</h2>

      <ElectiveForm refreshElectives={fetchElectives} />

      <TextField
      fullWidth
      label="Search Elective"
      placeholder="Search by Code or Name"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      sx={{ mb: 3 }}
    />

      <ElectiveTable
        electives={electives}
        refreshElectives={fetchElectives}
        search={search}
      />
    </DashboardLayout>
  );
}

export default Electives;