import StudentLayout from "../layouts/StudentLayout";
import StudentPreferenceForm from "../components/StudentPreferenceForm";


function StudentPreferences(){

return (

<StudentLayout>

<h2>
My Elective Preferences
</h2>

<StudentPreferenceForm />

</StudentLayout>

);

}


export default StudentPreferences;