import { useState } from "react";


import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import ElementPage from "../components/ElementPage";

export default function Catways() {
  const columns = [
    { label: "Nom", key: "name" },
    { label: "Prénom", key: "firstname" },
    { label: "Email", key: "email" },
  ];

  const [catways, setCatways] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [mode, setMode] = useState("add");
  const [selectedCatwaysId, setselectedCatwaysId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    firstname: "",
    email: "",
    password: ""
  });

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
      name: "",
      firstname: "",
      email: "",
      password: ""
    });
    setShowForm(true);
  }

  function openEditForm(Catways) {
    setMode("edit");
    setselectedCatwaysId(Catways._id);
    setFormData({
      name: Catways.name,
      firstname: Catways.firstname,
      email: Catways.email,
      password: ""
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
      await fetch("http://localhost:3000/catways/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      setShowForm(false);
      setFormData({
        name: "",
        firstname: "",
        email: "",
        password: ""
      });

      loadCatways();
    } catch (e) {
      console.log(e);
    }
  }

  async function deleteCatways(email) {
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
      await fetch("http://localhost:3000/Catways/" + selectedCatwaysId, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          firstname: formData.firstname,
          email: formData.email
        })
      });

      setShowForm(false);
      setselectedCatwaysId(null);
      setFormData({
        name: "",
        firstname: "",
        email: "",
        password: ""
      });

      loadCatways();
    } catch (e) {
      console.log(e);
    }
  }

  if (!catways) {
    loadCatways();
  }

  console.log("catways", catways)

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
            <ElementPage
              title="Gestion des catways"
              columns={columns}
              data={catways}
              onAdd={openAddForm}
              onDelete={deleteCatways}
              onEdit={openEditForm}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}