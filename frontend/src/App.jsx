import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";

// import Header from './component/Header'
import Auth from "./pages/Auth";
import Dashboard from './pages/Dashboard';
import Catways from './pages/Catways';
import Reservations from './pages/Reservations';
import Utilisateurs from './pages/Utilisateurs';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
      <main>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="catways" element={<Catways />} />
          <Route path="reservations" element={<Reservations />} />
          <Route path="utilisateurs" element={<Utilisateurs />} />
        </Routes>
      </main>

    </BrowserRouter>
    </>
  )
}

export default App
