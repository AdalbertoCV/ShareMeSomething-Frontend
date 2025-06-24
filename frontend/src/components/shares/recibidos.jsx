import { useEffect, useState } from "react";
import api from "../../api";

const Recibidos = () =>{
    const [shares, setShares] = useState([]);

    const ObtenerShares = async () =>{
        try{
            const response = await api.shares.get({'tipo':'recibidos'});
            setShares(response.data);
        }catch{
            console.log('Ocurrió un problema al obtener los datos.')
        }
    };

    useEffect(() => {
        ObtenerShares();
    }, []);

    return (
        <div className="shares-container">
          <h2>Shares Recibidos</h2>
          <table className="shares-table">
            <thead>
              <tr>
                <th>Remitente</th>
                <th>Título</th>
                <th>Descripción</th>
                <th>Categoría</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {shares.length === 0 ? (
                <tr>
                  <td colSpan="5">No hay elementos para mostrar.</td>
                </tr>
              ) : (
                shares.map((share, index) => (
                  <tr key={index}>
                    <td>{share.remitente}</td>
                    <td>{share.titulo}</td>
                    <td>{share.descripcion}</td>
                    <td>{share.categoria}</td>
                    <td>{share.fecha_creacion}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
    );
};

export default Recibidos;