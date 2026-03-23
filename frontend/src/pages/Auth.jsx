import { useNavigate } from "react-router-dom";

import "../css/Auth.css";

export default function Auth() {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate("/dashboard")
    }
    
    return (
        <div className="auth-container">
            <div className="auth-card">
                <h1>Connexion</h1>

                <form>
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Mot de passe" />

                    <button onClick={handleLogin}>Se connecter</button>
                </form>

                <div className="auth-footer">
                    <p>
                        API Docs : <a href="#">Voir la documentation</a>
                    </p>
                </div>
            </div>
        </div>
    );
}