import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Electives from "./pages/Electives";
import Preferences from "./pages/Preferences";
import Allocation from "./pages/Allocation";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>

      <Routes>

                  <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

        <Route path="/login" element={<Login />} />

        <Route path="/students" element={<ProtectedRoute><Students /></ProtectedRoute>} />

        <Route path="/electives" element={<ProtectedRoute><Electives /></ProtectedRoute>} />

        <Route path="/preferences" element={<ProtectedRoute><Preferences /></ProtectedRoute>} />

        <Route path="/allocation" element={<ProtectedRoute><Allocation /></ProtectedRoute>} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;