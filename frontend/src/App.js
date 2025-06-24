import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './components/auth/login';
import { useEffect, useState } from 'react';
import GuestNavbar from './components/layouts/guestNavbar';
import About from './components/home/about';
import UserNavbar from './components/layouts/userNavbar';
import Recibidos from './components/shares/recibidos';

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
      </Routes>
    </>
    ) : (
      <Routes>
        <Route path="/recibidos" element={<div><UserNavbar setToken={setToken} /><div><Recibidos/></div></div>} />
      </Routes>
    )}
    </Router>
  );
}

export default App;
