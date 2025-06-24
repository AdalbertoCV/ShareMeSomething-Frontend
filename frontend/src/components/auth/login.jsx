import { useState } from "react";
import api from "../../api";
import { useNavigate } from 'react-router-dom';


const Login = ({setToken}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.auth.login({ username, password });
            localStorage.setItem("access", response.data.access);
            localStorage.setItem("refresh", response.data.refresh);
            setToken(response.data.refresh);
            navigate('/recibidos')
        } catch (err) {
            navigate('/login')
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
