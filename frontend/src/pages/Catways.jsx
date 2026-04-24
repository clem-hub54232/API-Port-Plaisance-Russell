import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "../css/ElementPage.css";

export default function Catways() {

  const [catways, setCatways] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [mode, setMode] = useState("add");
  const [selectedCatwaysId, setselectedCatwaysId] = useState(null);

  const [formData, setFormData] = useState({
    catwayNumber: "",
    catwayType: "",
    catwayState: ""
  });

  useEffect(() => {
    loadCatways();
  }, []);

  async function loadCatways() {
    try {
      let result = await fetch("http://localhost:3000/catways/");
      let data = await result.json();
      setCatways(data);
    } catch (e) {
      console.log(e);
    }
  }

  function openAddForm() {
    setMode("add");
    setselectedCatwaysId(null);
    setFormData({
      catwayNumber: "",
      catwayType: "",
      catwayState: ""
    });
    setShowForm(true);
  }

  function openEditForm(catways) {
    setMode("edit");
    setselectedCatwaysId(catways._id);
    setFormData({
      catwayNumber: catways.catwayNumber,
      catwayType: catways.catwayType,
      catwayState: catways.catwayState
    });
    setShowForm(true);
  }

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  async function addCatways() {
    try {
      const response = await fetch("http://localhost:3000/catways/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          catwayNumber: Number(formData.catwayNumber),
          catwayType: formData.catwayType,
          catwayState: formData.catwayState
        })
      });

      if (!response.ok) {
        const error = await response.json();
        console.log("ADD CATWAY ERROR:", error);
        return;
      }

      setShowForm(false);
      setFormData({
        catwayNumber: "",
        catwayType: "",
        catwayState: ""
      });

      loadCatways();
    } catch (e) {
      console.log(e);
    }
  }

  async function deleteCatways(id) {
    try {
      await fetch("http://localhost:3000/catways/" + id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      });

      loadCatways();
    } catch (e) {
      console.log(e);
    }
  }

  async function editCatways() {
    try {
      const response = await fetch("http://localhost:3000/catways/" + selectedCatwaysId, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          catwayNumber: Number(formData.catwayNumber),
          catwayType: formData.catwayType,
          catwayState: formData.catwayState
        })
      });

      if (!response.ok) {
        const error = await response.json();
        console.log("EDIT CATWAY ERROR:", error);
        return;
      }

      setShowForm(false);
      setselectedCatwaysId(null);
      setFormData({
        catwayNumber: "",
        catwayType: "",
        catwayState: ""
      });

      loadCatways();
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-main">
        <Navbar title={"Catways"} />
        <div className="dashboard-content">
          {showForm && (
            <div style={{ marginBottom: "20px", background: "#fff", padding: "20px", borderRadius: "8px" }}>
              <h2>
                {mode === "add" ? "Ajouter un catway" : "Modifier un catway"}
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
                name="catwayType"
                placeholder="Type (short ou long)"
                value={formData.catwayType}
                onChange={handleChange}
              />

              <input
                type="text"
                name="catwayState"
                placeholder="Description"
                value={formData.catwayState}
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
                <button onClick={addCatways}>Créer</button>
              ) : (
                <button onClick={editCatways}>Enregistrer</button>
              )}

              <button onClick={() => setShowForm(false)}>Annuler</button>
            </div>
          )}

          {catways ? (
            <div className="element-page">
              <div className="element-header">
                <h1>Catways</h1>
                <button className="add-btn" onClick={openAddForm}>Ajouter</button>
              </div>

              <table className="element-table">
                <thead>
                  <tr>
                    <th>Number</th>
                    <th>Type</th>
                    <th>State</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {catways.map((catway) => (
                    <tr key={catway._id}>
                        <td key={catway._id}>{catway.catwayNumber}</td>
                        <td key={catway._id}>{catway.catwayType}</td>
                        <td key={catway._id}>{catway.catwayState}</td>
                      <td>
                        <button className="action-btn edit" onClick={() => openEditForm(catway)}>Modifier</button>
                        <button className="action-btn delete" onClick={() => deleteCatways(catway._id)}>Supprimer</button>
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
