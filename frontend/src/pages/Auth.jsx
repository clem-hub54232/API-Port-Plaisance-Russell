import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../css/Auth.css";

export default function Auth() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    console.log("email", email)
    console.log("password", password)

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await fetch("http://localhost:3000/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }

            // stocker token
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            navigate("/dashboard");

        } catch (err) {
            setError("Email ou mot de passe incorrect");
        }
    };
    
    return (
        <div className="auth-container">
            <div className="auth-card">
                <h1>Connexion</h1>

                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Mot de passe"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button type="submit">Se connecter</button>
                </form>

                {error && <p className="auth-error">{error}</p>}

                <div className="auth-footer">
                    <p>
                        API Docs : <a href="#">Voir la documentation</a>
                    </p>
                </div>
            </div>
        </div>
    );
}