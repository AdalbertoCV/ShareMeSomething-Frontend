import { useEffect, useState } from "react";
import { messageState } from "../utils/utils";
import api from "../../api";
import { useNavigate } from 'react-router-dom';

const Registrarse = () =>{
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirm_password, setConfirmPassword] = useState("");
    const [message, setMessage] = useState(null);
    const [alertType, setAlertType] = useState("SUCCESS");
    const [fieldErrors, setFieldErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        messageState(message, setMessage)
    }, [message]);


    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            await api.auth.register({username, password, confirm_password});
            navigate("/registro-exitoso");
        }catch (err) {
            setAlertType("ERROR");
            if (err.response && err.response.data) {
                const errores = err.response.data;
                const { non_field_errors, ...fieldSpecificErrors } = errores;
                setFieldErrors(fieldSpecificErrors);
                if (non_field_errors) {
                  setMessage(non_field_errors.join(" "));
                } else {
                  setMessage(null);
                }
            } else {
              setMessage("Ocurrió un error inesperado.");
            }
        }
    };

    return (
        <div className="app-container">
        {message && (
          <div className={`alert ${alertType === "SUCCESS" ? "success" : "error"}`}>
            {message}
          </div>
        )}
        <h2 className="pages-title">¡Crea una cuenta en ShareMeSomething!</h2>
            <div className="color-container">
                <form onSubmit={handleSubmit} className="form-container">
                    <h2>Nombre de usuario:</h2>
                    <input className="form-input" type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Ingresa el nombre de usuario"/>
                    {fieldErrors.username && (
                        <h1 className="form-container-error">{fieldErrors.username.join(" ")}</h1>
                    )}
                    <h2>Contraseña:</h2>
                    <input className="form-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Ingresa tu contraseña"/>
                    {fieldErrors.password && (
                        <h1 className="form-container-error">{fieldErrors.password.join(" ")}</h1>
                    )}
                    <h2>Confirmar Constraseña:</h2>
                    <input className="form-input" type="password" value={confirm_password} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirma tu contraseña"/>
                    {fieldErrors.confirm_password && (
                        <h1 className="form-container-error">{fieldErrors.confirm_password.join(" ")}</h1>
                    )}
                    <div className="btn-container">
                        <button className="btn btn-gray" onClick={() => navigate("/")}>volver</button>
                        <button type="submit" className="btn btn-blue">Registrarse</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Registrarse;

