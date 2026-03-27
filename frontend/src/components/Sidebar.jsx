import { NavLink } from "react-router-dom";
import "../css/Sidebar.css"; <h2>Port Manager</h2>

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Port Manager</h2>

      <NavLink to="/dashboard" className={({ isActive }) => isActive ? "active-link" : ""}>
        Dashboard
      </NavLink>

      <NavLink to="/catways" className={({ isActive }) => isActive ? "active-link" : ""}>
        Catways
      </NavLink>

      <NavLink to="/reservations" className={({ isActive }) => isActive ? "active-link" : ""}>
        Réservations
      </NavLink>

      <NavLink to="/utilisateurs" className={({ isActive }) => isActive ? "active-link" : ""}>
        Utilisateurs
      </NavLink>

      <NavLink to="/documentation" className={({ isActive }) => isActive ? "active-link" : ""}>
        Documentation API
      </NavLink>

      <NavLink to="/" className={({ isActive }) => isActive ? "active-link" : ""}>
        Déconnexion
      </NavLink>
    </div>
  );
}