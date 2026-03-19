import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Inicio from "./pages/Inicio";
import Lista from "./pages/Lista";
import Fotos from "./pages/Fotos";
import Navbar from "./components/Navbar";
import { useState, useEffect } from "react";

function App() {
  const [autenticado, setAutenticado] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem("autenticado") === "true";
    setAutenticado(auth);
  }, []);

  return (
    <BrowserRouter>
      {autenticado && <Navbar setAutenticado={setAutenticado} />}

      <Routes>
        <Route path="/" element={<Login setAutenticado={setAutenticado} />} />
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/lista" element={<Lista />} />
        <Route path="/fotos" element={<Fotos />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;