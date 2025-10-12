import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import React, { useState } from "react";
import Encabezado from "./components/Encabezado";
import Footer from "./components/Footer";
import MenuLateral from "./components/MenuLateral";
import Inicio from "./pages/Inicio";
import Servicios from "./pages/Servicios";
import Acerca from "./pages/Acerca";
import Contacto from "./pages/Contacto";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import "./App.css";

function AppContent() {
  const location = useLocation();
  const [busqueda, setBusqueda] = useState("");

  // Detectamos rutas especiales donde no queremos header ni sidebar
  const hideLayout = location.pathname === "/login" || location.pathname === "/dashboard";

  return (
    <div className="app">
      {/* Header solo si no estamos en login ni dashboard */}
      {!hideLayout && <Encabezado onBuscar={setBusqueda} />}

      <div className="contenido-principal">
        {/* Sidebar solo si no estamos en login ni dashboard */}
        {!hideLayout && <MenuLateral />}

        <div className="contenido-scroll" style={{ flex: 1 }}>
          <main>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/" element={<Inicio busqueda={busqueda} />} />
              <Route path="/Servicios" element={<Servicios />} />
              <Route path="/Acerca" element={<Acerca />} />
              <Route path="/Contacto" element={<Contacto />} />
              <Route path="/categoria/:nombreCategoria" element={<Inicio busqueda={busqueda} />} />
            </Routes>
          </main>
        </div>
      </div>

      {/* Footer solo si no estamos en login ni dashboard */}
      {!hideLayout && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}