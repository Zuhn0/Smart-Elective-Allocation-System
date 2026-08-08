import { BrowserRouter, Routes, Route } from "react-router-dom";

import StudentDashboard from "./pages/StudentDashboard";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Electives from "./pages/Electives";
import Preferences from "./pages/Preferences";
import Allocation from "./pages/Allocation";
import Login from "./pages/Login";
import StudentPreferences from "./pages/StudentPreferences";
import StudentResult from "./pages/StudentResult";
import StudentProfile from "./pages/StudentProfile";
import ProtectedRoute from "./components/ProtectedRoute";


function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* Login */}
        <Route
          path="/login"
          element={<Login />}
        />



        {/* Admin Dashboard */}
        <Route
          path="/"
          element={
            <ProtectedRoute allowedRole="admin">
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Student Dashboard */}
                  <Route
          path="/student/preferences"
          element={
          <ProtectedRoute allowedRole="student">
          <StudentPreferences/>
          </ProtectedRoute>
          }
          />


          <Route
          path="/student/result"
          element={
          <ProtectedRoute allowedRole="student">
          <StudentResult/>
          </ProtectedRoute>
          }
          />


        {/* Admin Pages */}
        <Route
          path="/students"
          element={
            <ProtectedRoute allowedRole="admin">
              <Students />
            </ProtectedRoute>
          }
        />


        <Route
          path="/electives"
          element={
            <ProtectedRoute allowedRole="admin">
              <Electives />
            </ProtectedRoute>
          }
        />


        <Route
          path="/preferences"
          element={
            <ProtectedRoute allowedRole="admin">
              <Preferences />
            </ProtectedRoute>
          }
        />


        <Route
          path="/allocation"
          element={
            <ProtectedRoute allowedRole="admin">
              <Allocation />
            </ProtectedRoute>
          }
        />


        {/* Student Pages */}
        <Route
          path="/student/dashboard"
          element={
            <ProtectedRoute allowedRole="student">
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
       <Route
          path="/student/profile"
          element={
            <ProtectedRoute allowedRole="student">
              <StudentProfile/>
            </ProtectedRoute>
          }
          />


      </Routes>

    </BrowserRouter>

  );
}


export default App;