import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom";
import Login from './components/auth/login';
import { useEffect, useState } from 'react';
import GuestNavbar from './components/layouts/guestNavbar';
import About from './components/home/about';
import UserNavbar from './components/layouts/userNavbar';
import Recibidos from './components/shares/recibidos';
import NotFound from './components/auth/notFound';
import RegistroExitoso from './components/users/registroExitoso';
import Registrarse from './components/users/register';

function App() {

  const [token, setToken] = useState(localStorage.getItem("refresh"));
  

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("refresh"));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);


  return (
    <Router>
    {!token ? (
    <>
      <Routes>
        <Route path="/" element={<div><GuestNavbar /><div><About/></div></div>} />
        <Route path="/login" element={<div><GuestNavbar /><div><Login setToken={setToken} /></div></div>} />
        <Route path="/registrarse" element={<div><GuestNavbar /><div><Registrarse/></div></div>} />
        <Route path="/registro-exitoso" element={<div><RegistroExitoso /></div>} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </>
    ) : (
      <Routes>
        <Route path="/recibidos" element={<div><UserNavbar setToken={setToken} /><div><Recibidos/></div></div>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    )}
    </Router>
  );
}

export default App;
