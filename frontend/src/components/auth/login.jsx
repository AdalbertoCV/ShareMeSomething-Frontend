import { useEffect, useState } from "react";
import api from "../../api";
import { useNavigate } from 'react-router-dom';
import { messageState } from "../utils/utils";


const Login = ({setToken}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [message, setMessage] = useState(null);
    const [alertType, setAlertType] = useState("SUCCESS");


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.auth.login({ username, password });
            localStorage.setItem("access", response.data.access);
            localStorage.setItem("refresh", response.data.refresh);
            setToken(response.data.refresh);
            navigate('/recibidos')
        } catch (err) {
            setAlertType("ERROR");
            setMessage(err.response.data.detail);
        }
    };

    useEffect(() => {
        messageState(message, setMessage)
    }, [message]);

    return (
        <div className="app-container">
        {message && (
          <div className={`alert ${alertType === "SUCCESS" ? "success" : "error"}`}>
            {message}
          </div>
        )}
        <h2 className="pages-title">¡Inicia Sesión en tu plataforma de recuerdos favorita!</h2>
            <form onSubmit={handleSubmit} className="login-container">
                <h1>ShareMeSomething!</h1>
                <div className="form-container">
                    <h2>Nombre de usuario:</h2>
                    <input 
                        className="form-input"
                        type="text" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        placeholder="Ingresa tu nombre de usuario"
                    />
                    <h2>Contraseña:</h2>
                    <input 
                        className="form-input"
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        placeholder="Ingresa tu contraseña"
                    />
                </div>
                <button type="submit" className="btn btn-blue">Iniciar sesión</button>
            </form>
        </div>
    );
};

export default Login;
