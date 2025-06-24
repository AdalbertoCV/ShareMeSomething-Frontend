import { Link, useLocation, useNavigate } from "react-router-dom";
import "../../App.css";
import api from "../../api";

const UserNavbar = ({setToken}) =>{
    const location = useLocation();
    const navigate = useNavigate();
    const menuItems = [
      { path: "/recibidos", label: "Shares Recibidos" },
      { path: "/recibidos", label: "Shares Compartidos" },
      { path: "/recibidos", label: "Usuarios" },
    ];

    const handleLogout = async () => {
        try {
            const refresh = localStorage.getItem("refresh");
            if (refresh) {
              await api.auth.logout(refresh);
            }
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }

        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        setToken(null);
        navigate("/login");
    };

    return (
    <div className="user-navbar">
      <h2>ShareMeSomething!</h2>
      <div className="menu-container">
        <ul className="menu">
          {menuItems.map((item, index) => (
            <li key={index} className={location.pathname === item.path ? "active" : ""}>
              <Link to={item.path}>
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <button className="logout-button" onClick={handleLogout}>
        Cerrar sesión
      </button>
    </div>
    );
};

export default UserNavbar;