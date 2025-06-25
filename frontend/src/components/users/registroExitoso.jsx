import { useNavigate } from "react-router-dom";

const RegistroExitoso = () => {
  const navigate = useNavigate();

  return (
    <div className="message-overlay">
      <div className="message-container">
        <h2 className="message-title">¡¡¡Registro Exitoso!!!</h2>
        <p className="message-text">
          Tu nombre de usuario ha sido registrado en la plataforma, ya puedes iniciar Sesión :D
        </p>
        <button className="btn btn-gray" onClick={() => navigate("/login")}>
          Iniciar Sesión
        </button>
      </div>
    </div>
  );
};

export default RegistroExitoso;