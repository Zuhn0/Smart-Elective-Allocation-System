import { useEffect, useState } from "react";
import { Grid } from "@mui/material";

import DashboardLayout from "../layouts/DashboardLayout";
import DashboardCard from "../components/DashboardCard";
import api from "../services/api";

function Dashboard() {
  const [stats, setStats] = useState({
    students: 0,
    electives: 0,
    preferences: 0,
    allocations: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await api.get("/dashboard");
      setStats(res.data);
    } catch (error) {
      console.error("Failed to fetch dashboard stats:", error);
    }
  };

  return (
    <DashboardLayout>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <DashboardCard title="Students" value={stats.students} />
        </Grid>

        <Grid item xs={12} md={3}>
          <DashboardCard title="Electives" value={stats.electives} />
        </Grid>

        <Grid item xs={12} md={3}>
          <DashboardCard title="Preferences" value={stats.preferences} />
        </Grid>

        <Grid item xs={12} md={3}>
          <DashboardCard title="Allocations" value={stats.allocations} />
        </Grid>
      </Grid>
    </DashboardLayout>
  );
}

export default Dashboard;