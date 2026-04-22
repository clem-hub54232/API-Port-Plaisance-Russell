import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function Reservations() {
  const columns = [
    { label: "Numéro", key: "number" },
    { label: "Type", key: "type" },
    { label: "État", key: "state" },
  ];

  const data = [
    { number: 1, type: "Long", state: "Disponible" },
    { number: 2, type: "Short", state: "Occupé" },
    { number: 3, type: "Long", state: "Disponible" },
  ];

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-main">
        <Navbar title={"Réservations"}/>
        <div className="dashboard-content">
          {/* <ElementPage title="Gestion des Réservations" columns={columns} data={data} /> */}
        </div>
      </div>
    </div>
  );
}