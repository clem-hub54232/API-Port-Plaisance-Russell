import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "../css/Documentation.css";

export default function Documentation() {
  const sections = [
    {
      title: "Catways",
      endpoints: [
        {
          method: "GET",
          path: "/catways",
          description: "Lister l'ensemble des catways.",
        },
        {
          method: "GET",
          path: "/catways/:id",
          description: "Récupérer les détails d'un catway.",
        },
        {
          method: "POST",
          path: "/catways",
          description: "Créer un catway.",
        },
        {
          method: "PUT",
          path: "/catways/:id",
          description:
            "Modifier la description de l'état d'un catway.",
        },
        {
          method: "DELETE",
          path: "/catways/:id",
          description: "Supprimer un catway.",
        },
      ],
    },
    {
      title: "Réservations",
      endpoints: [
        {
          method: "GET",
          path: "/catways/:id/reservations",
          description: "Lister les réservations d'un catway.",
        },
        {
          method: "GET",
          path: "/catways/:id/reservations/:idReservation",
          description: "Récupérer les détails d'une réservation.",
        },
        {
          method: "POST",
          path: "/catways/:id/reservations",
          description: "Créer une réservation pour un catway.",
        },
        {
          method: "PUT",
          path: "/catways/:id/reservations/:idReservation",
          description: "Modifier une réservation.",
        },
        {
          method: "DELETE",
          path: "/catways/:id/reservations/:idReservation",
          description: "Supprimer une réservation.",
        },
      ],
    },
    {
      title: "Utilisateurs",
      endpoints: [
        {
          method: "GET",
          path: "/users",
          description: "Lister l'ensemble des utilisateurs.",
        },
        {
          method: "GET",
          path: "/users/:email",
          description: "Récupérer les détails d'un utilisateur.",
        },
        {
          method: "POST",
          path: "/users",
          description: "Créer un utilisateur.",
        },
        {
          method: "PUT",
          path: "/users/:email",
          description: "Modifier les détails d'un utilisateur.",
        },
        {
          method: "DELETE",
          path: "/users/:email",
          description: "Supprimer un utilisateur.",
        },
      ],
    },
    {
      title: "Authentification",
      endpoints: [
        {
          method: "POST",
          path: "/login",
          description: "Connexion d'un utilisateur.",
        },
        {
          method: "GET",
          path: "/logout",
          description: "Déconnexion de l'utilisateur.",
        },
      ],
    },
  ];

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-main">
        <Navbar title="Documentation API" />

        <div className="dashboard-content">
          <div className="documentation-page">
            <div className="documentation-intro">
              <h1>Documentation de l’API</h1>
              
            </div>

            {sections.map((section) => (
              <div className="doc-section" key={section.title}>
                <h2>{section.title}</h2>

                <div className="doc-endpoints">
                  {section.endpoints.map((endpoint, index) => (
                    <div className="doc-endpoint-card" key={index}>
                      <div className="doc-endpoint-header">
                        <span
                          className={`doc-method ${endpoint.method.toLowerCase()}`}
                        >
                          {endpoint.method}
                        </span>
                        <code className="doc-path">{endpoint.path}</code>
                      </div>

                      <p className="doc-description">
                        {endpoint.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}