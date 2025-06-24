import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './components/auth/login';
import { useEffect, useState } from 'react';
import GuestNavbar from './components/layouts/guestNavbar';
import About from './components/home/about';

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
        <Route path="/" element={<div><GuestNavbar /><div className="no-auth-content"><About/></div></div>} />
        <Route path="/login" element={<div><GuestNavbar /><div className="no-auth-content"><Login/></div></div>} />
      </Routes>
    </>
    ) : (
      <Routes>
        <Route path="/home"/>
      </Routes>
    )}
    </Router>
  );
}

export default App;
