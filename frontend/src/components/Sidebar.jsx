import { Link } from "react-router-dom";
import "../css/Sidebar.css";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <h2>Port Manager</h2>
      </div>

      <nav className="sidebar-nav">
        <Link to="/dashboard">Tableau de bord</Link>
        <Link to="/catways">Catways</Link>
        <Link to="/reservations">Réservations</Link>
        <Link to="/utilisateurs">Utilisateurs</Link>
        <a href="#" target="_blank" rel="noreferrer">
          Documentation API
        </a>
        <Link to="/">Déconnexion</Link>
      </nav>
    </aside>
  );
}