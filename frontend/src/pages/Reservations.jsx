import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "../css/ElementPage.css";
import { apiFetch } from "../api";

export default function Reservation() {

  const [reservation, setReservation] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [mode, setMode] = useState("add");
  const [selectedReservationId, setselectedReservationId] = useState(null);

  const [formData, setFormData] = useState({
    catwayNumber: "",
    clientName: "",
    boatName: "",
    startDate: "",
    endDate: "",

  });

  async function loadReservation() {
    try {
      let result = await apiFetch("/reservations/");
      let data = await result.json();
      setReservation(data);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    const timer = setTimeout(loadReservation, 0);
    return () => clearTimeout(timer);
  }, []);

  function openAddForm() {
    setMode("add");
    setselectedReservationId(null);
    setFormData({
      catwayNumber: "",
      clientName: "",
      boatName: "",
      startDate: "",
      endDate: "",

    });
    setShowForm(true);
  }

  function openEditForm(reservation) {
    setMode("edit");
    setselectedReservationId(reservation._id);
    setFormData({
      catwayNumber: reservation.catwayNumber,
      clientName: reservation.clientName,
      boatName: reservation.boatName,
      startDate: reservation.startDate,
      endDate: reservation.endDate,

    });
    setShowForm(true);
  }

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  async function addReservation() {
    try {
      const response = await apiFetch("/reservations/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          catwayNumber: Number(formData.catwayNumber),
          clientName: formData.clientName,
          boatName: formData.boatName,
          startDate: formData.startDate,
          endDate: formData.endDate,

        })
      });

      if (!response.ok) {
        const error = await response.json();
        console.log("ADD RESERVATION ERROR:", error);
        return;
      }

      setShowForm(false);
      setFormData({
        catwayNumber: "",
        clientName: "",
        boatName: "",
        startDate: "",
        endDate: "",

      });

      loadReservation();
    } catch (e) {
      console.log(e);
    }
  }

  async function deleteReservation(id) {
    try {
      await apiFetch("/reservations/" + id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      });

      loadReservation();
    } catch (e) {
      console.log(e);
    }
  }

  async function editReservation() {
    try {
      const response = await apiFetch("/reservations/" + selectedReservationId, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          catwayNumber: Number(formData.catwayNumber),
          clientName: formData.clientName,
          boatName: formData.boatName,
          startDate: formData.startDate,
          endDate: formData.endDate,

        })
      });

      if (!response.ok) {
        const error = await response.json();
        console.log("EDIT RESERVATION ERROR:", error);
        return;
      }

      setShowForm(false);
      setselectedReservationId(null);
      setFormData({
        catwayNumber: "",
        clientName: "",
        boatName: "",
        startDate: "",
        endDate: "",

      });

      loadReservation();
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-main">
        <Navbar title={"Réservation"} />
        <div className="dashboard-content">
          {showForm && (
            <div style={{ marginBottom: "20px", background: "#fff", padding: "20px", borderRadius: "8px" }}>
              <h2>
                {mode === "add" ? "Ajouter une Réservation" : "Modifier une Réservation"}
              </h2>

              <input
                type="text"
                name="catwayNumber"
                placeholder="Catway Number"
                value={formData.catwayNumber}
                onChange={handleChange}
              />

              <input
                type="text"
                name="clientName"
                placeholder="Type clientName"
                value={formData.clientName}
                onChange={handleChange}
              />

              <input
                type="text"
                name="boatName"
                placeholder="boatName"
                value={formData.boatName}
                onChange={handleChange}
              />
              <input
                type="text"
                name="startDate"
                placeholder="startDate"
                value={formData.startDate}
                onChange={handleChange}
              />
              <input
                type="text"
                name="endDate"
                placeholder="endDate"
                value={formData.endDate}
                onChange={handleChange}
              />

              {/* {mode === "add" && (
                <input
                  type="password"
                  name="password"
                  placeholder="Mot de passe"
                  value={formData.password}
                  onChange={handleChange}
                />
              )} */}

              {mode === "add" ? (
                <button onClick={addReservation}>Créer</button>
              ) : (
                <button onClick={editReservation}>Enregistrer</button>
              )}

              <button onClick={() => setShowForm(false)}>Annuler</button>
            </div>
          )}

          {reservation ? (
            <div className="element-page">
              <div className="element-header">
                <h1>Réservation</h1>
                <button className="add-btn" onClick={openAddForm}>Ajouter</button>
              </div>

              <table className="element-table">
                <thead>
                  <tr>
                    <th>Number</th>
                    <th>ClientName</th>
                    <th>BoatName</th>
                    <th>StartDate</th>
                    <th>EndDate</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {reservation.map((reservation) => (
                    <tr key={reservation._id}>
                      <td>{reservation.catwayNumber}</td>
                      <td>{reservation.clientName}</td>
                      <td>{reservation.boatName}</td>
                      <td>{reservation.startDate}</td>
                      <td>{reservation.endDate}</td>

                      <td>
                        <button className="action-btn edit" onClick={() => openEditForm(reservation)}>Modifier</button>
                        <button className="action-btn delete" onClick={() => deleteReservation(reservation._id)}>Supprimer</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
