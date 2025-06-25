import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="message-overlay">
      <div className="message-container">
        <h2 className="message-title">Elemento no encontrado</h2>
        <p className="message-text">
          El elemento solicitado no fue encontrado. Por favor vuelva al inicio.
        </p>
        <button className="btn btn-gray" onClick={() => navigate("/recibidos")}>
          Volver al Inicio
        </button>
      </div>
    </div>
  );
};

export default NotFound;