import { useState } from "react";
import api from "../../api";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.auth.login({ username, password });
            localStorage.setItem("access", response.data.access);
            localStorage.setItem("refresh", response.data.refresh);
        } catch (err) {
            console.error("Error al iniciar sesión.", err);
        }
    };

    return (
        <div className="app-container">
        <h2 className="pages-title">¡Inicia Sesión en tu plataforma de recuerdos favorita!</h2>
            <form onSubmit={handleSubmit} className="login-container">
                <h1>ShareMeSomething!</h1>
                <input 
                    className="form-input"
                    type="text" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    placeholder="Ingresa tu nombre de usuario"
                />
                <input 
                    className="form-input"
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="Ingresa tu contraseña"
                />
                <button type="submit" className="submit-button">Iniciar sesión</button>
            </form>
        </div>
    );
};

export default Login;
