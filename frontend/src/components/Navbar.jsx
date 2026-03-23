import "../css/Navbar.css";

export default function Navbar({ title }) {
  return (
    <header className="topbar">
      <h1>{title}</h1>
      <div className="topbar-user">
        <span>Bienvenue</span>
      </div>
    </header>
  );
}