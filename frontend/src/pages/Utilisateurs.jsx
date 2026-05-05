import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { apiFetch } from "../api";

import "../css/ElementPage.css";

export default function Utilisateurs() {
  const [users, setUsers] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [mode, setMode] = useState("add");
  const [selectedUserId, setselectedUserId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    firstname: "",
    email: "",
    password: ""
  });

  async function loadUsers() {
    try {
      let result = await apiFetch("/users/");
      let data = await result.json();
      setUsers(data);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    const timer = setTimeout(loadUsers, 0);
    return () => clearTimeout(timer);
  }, []);

  function openAddForm() {
    setMode("add");
    setselectedUserId(null);
    setFormData({
      name: "",
      firstname: "",
      email: "",
      password: ""
    });
    setShowForm(true);
  }

  function openEditForm(user) {
    setMode("edit");
    setselectedUserId(user._id);
    setFormData({
      name: user.name,
      firstname: user.firstname,
      email: user.email,
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

  async function addUser() {
    try {
      await apiFetch("/users/", {
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

      loadUsers();
    } catch (e) {
      console.log(e);
    }
  }

  async function deleteUser(email) {
    try {
      await apiFetch("/users/" + email, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      });

      loadUsers();
    } catch (e) {
      console.log(e);
    }
  }

  async function editUser() {
    try {
      await apiFetch("/users/" + selectedUserId, {
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
      setselectedUserId(null);
      setFormData({
        name: "",
        firstname: "",
        email: "",
        password: ""
      });

      loadUsers();
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-main">
        <Navbar title={"Utilisateurs"} />
        <div className="dashboard-content">
          {showForm && (
            <div style={{ marginBottom: "20px", background: "#fff", padding: "20px", borderRadius: "8px" }}>
              <h2>
                {mode === "add" ? "Ajouter un utilisateur" : "Modifier un utilisateur"}
              </h2>

              <input
                type="text"
                name="name"
                placeholder="Nom"
                value={formData.name}
                onChange={handleChange}
              />

              <input
                type="text"
                name="firstname"
                placeholder="Prénom"
                value={formData.firstname}
                onChange={handleChange}
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />

              {mode === "add" && (
                <input
                  type="password"
                  name="password"
                  placeholder="Mot de passe"
                  value={formData.password}
                  onChange={handleChange}
                />
              )}

              {mode === "add" ? (
                <button onClick={addUser}>Créer</button>
              ) : (
                <button onClick={editUser}>Enregistrer</button>
              )}

              <button onClick={() => setShowForm(false)}>Annuler</button>
            </div>
          )}

          {users ? (
            <div className="element-page">
              <div className="element-header">
                <h1>Utilisateurs</h1>
                <button className="add-btn" onClick={openAddForm}>Ajouter</button>
              </div>

              <table className="element-table">
                <thead>
                  <tr>
                    <th>Nom</th>
                    <th>Prénom</th>
                    <th>Email</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {users.map((user) => (
                    <tr key={user._id}>
                      <td key={user.name}>{user.name}</td>
                      <td key={user.firstname}>{user.firstname}</td>
                      <td key={user.email}>{user.email}</td>
                      <td>
                        <button className="action-btn edit" onClick={() => openEditForm(user)}>Modifier</button>
                        <button className="action-btn delete" onClick={() => deleteUser(user._id)}>Supprimer</button>
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
