import React from "react";
import { useNavigate } from "react-router-dom";
import { FaPlusCircle, FaBoxOpen } from "react-icons/fa"; // Íconos para las cards

export default function Dashboard() {
  const navigate = useNavigate();
  const usuario = JSON.parse(sessionStorage.getItem("usuario"));

  if (!usuario) {
    navigate("/login");
    return null;
  }

  return (
    <div className="dashboard-page">
      {/* Header propio */}
      <div className="dashboard-header">
        <h2>Bienvenido a {usuario.sucursal}</h2>
        <button
          className="btn-logout"
          onClick={() => {
            sessionStorage.removeItem("usuario");
            navigate("/login");
          }}
        >
          Cerrar sesión
        </button>
      </div>

      {/* Main con cards */}
      <div className="dashboard-main">
        <div
          className="dashboard-card"
          onClick={() => navigate("/dashboard/add-product")}
        >
          <FaPlusCircle size={50} color="#5EC2F1" style={{ marginBottom: "10px" }} />
          <h3>Añadir Producto</h3>
          <p>Registrar nuevos productos a la sucursal</p>
        </div>

        <div
          className="dashboard-card"
          onClick={() => navigate("/dashboard/inventory")}
        >
          <FaBoxOpen size={50} color="#5EC2F1" style={{ marginBottom: "10px" }} />
          <h3>Inventario</h3>
          <p>Ver y administrar los productos existentes</p>
        </div>
      </div>
    </div>
  );
}
