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
import AgregarProducto from "./components/AgregarProducto";
import Inventario from "./components/Inventario";
import Users from "./components/Users";
import "./App.css";

function AppContent() {
  const location = useLocation();
  const [busqueda, setBusqueda] = useState("");
  const hideLayout = location.pathname === "/login" || location.pathname.startsWith("/dashboard");

  return (
    <div className="app">
      {!hideLayout && <Encabezado onBuscar={setBusqueda} />}
      <div className="contenido-principal">
        {!hideLayout && <MenuLateral />}
        <div className="contenido-scroll" style={{ flex: 1 }}>
          <main>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/add-product" element={<AgregarProducto />} />
              <Route path="/dashboard/inventory" element={<Inventario />} />
              <Route path="/dashboard/users" element={<Users />} />
              <Route path="/" element={<Inicio busqueda={busqueda} />} />
              <Route path="/servicios" element={<Servicios />} />
              <Route path="/acerca" element={<Acerca />} />
              <Route path="/contacto" element={<Contacto />} />
              <Route path="/categoria/:nombreCategoria" element={<Inicio busqueda={busqueda} />} />
            </Routes>
          </main>
        </div>
      </div>
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