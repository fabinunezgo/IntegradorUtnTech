import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlusCircle, FaBoxOpen, FaUserCog } from "react-icons/fa";
import "../css/dashborad.css";

export default function Dashboard() {
  const navigate = useNavigate();
  let usuario = null;

  try {
    const storedUser = sessionStorage.getItem("usuario");
    usuario = storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.error("Error al parsear usuario:", error);
    usuario = null;
  }

  useEffect(() => {
    if (!usuario) {
      navigate("/login");
    }
  }, [usuario, navigate]);

  if (!usuario) return null;

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h2 className="dashboard-titulo">Bienvenido a {usuario.sucursal}</h2>
        <button
          className="dashboard-btn-logout"
          onClick={() => {
            sessionStorage.removeItem("usuario");
            sessionStorage.removeItem("token");
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
        <div
          className="dashboard-card dashboard-card-users"
          onClick={() => navigate("/dashboard/users")}
        >
          <FaUserCog className="dashboard-icon" />
          <h3 className="dashboard-card-titulo">Administrar Trabajadores</h3>
          <p className="dashboard-card-desc">Gestionar usuarios y permisos del sistema</p>
        </div>
      </div>
    </div>
  );
}
