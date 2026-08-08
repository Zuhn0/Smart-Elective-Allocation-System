import { Link } from "react-router-dom";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemText
} from "@mui/material";
import { Button } from "@mui/material";

function StudentSidebar(){

return (

<Drawer
variant="permanent"
sx={{
width:240,
"& .MuiDrawer-paper":{
width:240
}
}}
>

<List>

<ListItemButton component={Link} to="/student/dashboard">
<ListItemText primary="Dashboard"/>
</ListItemButton>


<ListItemButton component={Link} to="/student/preferences">
<ListItemText primary="My Preferences"/>
</ListItemButton>


<ListItemButton component={Link} to="/student/result">
<ListItemText primary="My Allocation"/>
</ListItemButton>

<ListItemButton component={Link} to="/student/profile">

<ListItemText
primary="My Profile"
/>

</ListItemButton>

<Button
  variant="contained"
  color="error"
  sx={{
    mx:2,
    mt:3
  }}
  onClick={logout}
>
  Logout
</Button>

</List>

</Drawer>



);

}

const logout = () => {

  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("student");

  window.location.href = "/login";

};

export default StudentSidebar;