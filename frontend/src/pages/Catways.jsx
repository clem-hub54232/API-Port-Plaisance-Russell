import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import ElementPage from "../components/ElementPage";

export default function Catways() {
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
        <Navbar title={"Catways"}/>
        <div className="dashboard-content">
          <ElementPage title="Gestion des Catways" columns={columns} data={data} />
        </div>
      </div>
    </div>
  );
}