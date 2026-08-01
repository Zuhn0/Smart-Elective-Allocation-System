import { AppBar, Toolbar, Typography } from "@mui/material";

function Navbar() {
  return (
    <AppBar
      position="static"
      color="primary"
      elevation={1}
    >
      <Toolbar>
        <Typography variant="h6">
          Smart Elective Allocation System
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;