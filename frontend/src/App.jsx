import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";

// import Header from './component/Header'
import Auth from "./pages/Auth";
import Dashboard from './pages/Dashboard';
import Catways from './pages/Catways';
import Reservations from './pages/Reservations';
import Utilisateurs from './pages/Utilisateurs';
import Documentation from './pages/Documentation';
import { getAuthToken } from "./api";

function ProtectedRoute({ children }) {
  const user = localStorage.getItem("user");
  const token = getAuthToken();

  if (!user || !token) {
    return <Navigate to="/" replace />;
  }

  return children;
}



function App() {
  return (
    <>
    <BrowserRouter>
      <main>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="documentation" element={<Documentation />} />
          <Route path="dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="catways" element={<ProtectedRoute><Catways /></ProtectedRoute>} />
          <Route path="reservations" element={<ProtectedRoute><Reservations /></ProtectedRoute>} />
          <Route path="utilisateurs" element={<ProtectedRoute><Utilisateurs /></ProtectedRoute>} />
        </Routes>
      </main>

    </BrowserRouter>
    </>
  )
}

export default App
