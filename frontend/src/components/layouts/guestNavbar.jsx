import { Link, useLocation } from "react-router-dom";
import "../../App.css";

const GuestNavbar = () =>{
    const location = useLocation();
    const menuItems = [
      { path: "/", label: "Acerca de" },
      { path: "/registrarse", label: "Registrarse" },
      { path: "/login", label: "Iniciar Sesión" },
    ];

    return (
      <div className="guest-navbar">
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
       </div>
    );
};

export default GuestNavbar;