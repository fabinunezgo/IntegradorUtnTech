import React from "react";
import { useNavigate } from "react-router-dom";
import { FaPlusCircle, FaBoxOpen } from "react-icons/fa";
import "../css/dashborad.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const usuario = JSON.parse(sessionStorage.getItem("usuario"));

  if (!usuario) {
    navigate("/login");
    return null;
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h2 className="dashboard-titulo">Bienvenido a {usuario.sucursal}</h2>
        <button
          className="dashboard-btn-logout"
          onClick={() => {
            sessionStorage.removeItem("usuario");
            navigate("/login");
          }}
        >
          Cerrar sesión
        </button>
      </div>
      <div className="dashboard-main">
        <div
          className="dashboard-card dashboard-card-add"
          onClick={() => navigate("/dashboard/add-product")}
        >
          <FaPlusCircle className="dashboard-icon" />
          <h3 className="dashboard-card-titulo">Añadir Producto</h3>
          <p className="dashboard-card-desc">Registrar nuevos productos a la sucursal</p>
        </div>

        <div
          className="dashboard-card dashboard-card-inventory"
          onClick={() => navigate("/dashboard/inventory")}
        >
          <FaBoxOpen className="dashboard-icon" />
          <h3 className="dashboard-card-titulo">Inventario</h3>
          <p className="dashboard-card-desc">Ver y administrar los productos existentes</p>
        </div>
      </div>
    </div>
  );
}