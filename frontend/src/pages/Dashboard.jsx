import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "../css/Dashboard.css";

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="dashboard-container">
      <Sidebar />

      <div className="dashboard-main">
        <Navbar title={"Dashboard"} />

        <div className="dashboard-content">
          <h1>Tableau de bord</h1>

          <div className="dashboard-cards">
            <div className="card">
              <h3>Utilisateur</h3>
              <p>Nom : {user?.name}</p>
              <p>Prénom : {user?.firstname}</p>
              <p>Email : {user?.email}</p>
            </div>
          </div>

          {/* <h2>Réservations en cours</h2> */}

          {/* <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Client</th>
                <th>Catway</th>
                <th>Bateau</th>
              </tr>
            </thead>

            <tbody>
              {reservations.map((r) => (
                <tr key={r.id}>
                  <td>{r.id}</td>
                  <td>{r.client}</td>
                  <td>{r.catway}</td>
                  <td>{r.boat}</td>
                </tr>
              ))}
            </tbody>
          </table> */}
        </div>
      </div>
    </div>
  );
}
