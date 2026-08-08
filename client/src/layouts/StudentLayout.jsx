import StudentSidebar from "../components/StudentSidebar";


function StudentLayout({children}){


return (

<div>

<StudentSidebar/>

<div
style={{
marginLeft:"240px",
padding:"20px"
}}
>

{children}

</div>


</div>

);


}


export default StudentLayout;