import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaUserTie, FaTrash, FaPlusCircle } from "react-icons/fa";
import "../css/users.css";
import { getUsers, registerUser, deactivateUser } from "../js/api";
import { useNavigate } from "react-router-dom";

export default function Users() {
  const [usuarios, setUsuarios] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [rol, setRol] = useState("admin");
  const navigate = useNavigate();

  // Obtener sucursal activa del usuario actual
  let sucursalUsuario = null;
  try {
    const storedUser = sessionStorage.getItem("usuario");
    sucursalUsuario =
      storedUser && storedUser !== "undefined"
        ? JSON.parse(storedUser).IdSucursal || JSON.parse(storedUser).idSucursal
        : null;
  } catch {
    sucursalUsuario = null;
  }

  const fetchUsuarios = () => {
    getUsers().then((res) => {
      if (res && res.data) {
        const soloActivos = res.data.filter(
          (u) => Number(u.Sucursal) === Number(sucursalUsuario) && Number(u.Activo) === 1
        );
        setUsuarios(soloActivos);
      }
    });
  };

  useEffect(() => {
    fetchUsuarios();
    
  }, [sucursalUsuario]);

  
  const abrirModal = () => {
    setNombre("");
    setCorreo("");
    setContrasena("");
    setRol("admin");
    setShowModal(true);
  };

  
  const AgregarUsuario = async (e) => {
    e.preventDefault();

    const usuarioNuevo = {
      Nombre: nombre,
      Correo: correo,
      Contraseña: contrasena,
      Rol: rol,
      IdSucursal: Number(sucursalUsuario)
    };

    try {
      const res = await registerUser(usuarioNuevo);
      if (res.success) {
        setShowModal(false);
        fetchUsuarios();
      } else {
        alert(res.message || "No se pudo agregar el usuario");
      }
    } catch (err) {
      alert("Error al agregar usuario");
    }
  };

 
  const DesactivarUsuario = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este usuario?")) {
      try {
        await deactivateUser(id);
        setUsuarios((us) => us.filter((u) => u.IdUsuario !== id));
      } catch {
        alert("No se pudo eliminar el usuario");
      }
    }
  };

  return (
    <div className="users-page">
      <div className="user-layout">
        <button className="btn-volver" onClick={() => navigate("/dashboard")}>
          <FaArrowLeft />
        </button>
        <h2 className="users-titulo">Trabajadores de la Sucursal</h2>
      </div>

      <div className="users-list">
        {usuarios.length === 0 && (
          <div className="sin-usuarios">No hay trabajadores registrados en esta sucursal.</div>
        )}
        {usuarios.map((u) => (
          <div className="user-card" key={u.IdUsuario}>
            <FaUserTie className="user-icon" />
            <div>
              <div className="user-nombre">{u.Nombre}</div>
              <div className="user-correo">{u.Correo}</div>
              <div className="user-rol">{u.Rol}</div>
            </div>
            <button
              className="btn-eliminar-usuario"
              title="Eliminar usuario"
              onClick={() => DesactivarUsuario(u.IdUsuario)}
            >
              <FaTrash />
            </button>
          </div>
        ))}
      </div>
      <button className="btn-agregar-usuario" onClick={abrirModal}>
        <FaPlusCircle />
      </button>
      {showModal && (
        <div className="modal-agregar-user-backdrop">
          <div className="agregar-producto-card">
            <button
              className="btn-volver"
              style={{ top: 15, left: 18, position: "absolute" }}
              onClick={() => setShowModal(false)}
            >
              <FaArrowLeft />
            </button>
            <h2 className="titulo-agregar">Agregar Usuario</h2>
            <div className="linea-amarilla-agregar"></div>
            <form onSubmit={AgregarUsuario}>
              <label>Nombre:</label>
              <input
                type="text"
                value={nombre}
                onChange={e => setNombre(e.target.value)}
                placeholder="Ingrese el nombre"
                required
              />

              <label>Correo electrónico:</label>
              <input
                type="email"
                value={correo}
                onChange={e => setCorreo(e.target.value)}
                placeholder="Ingrese el correo"
                required
              />

              <label>Contraseña:</label>
              <input
                type="password"
                value={contrasena}
                onChange={e => setContrasena(e.target.value)}
                placeholder="Ingrese la contraseña"
                required
              />

              <label>Rol:</label>
              <select value={rol} onChange={e => setRol(e.target.value)} required>
                <option value="admin">Admin</option>
                <option value="usuario">Usuario</option>
              </select>

              <button type="submit" className="btn-guardar">
                Guardar Usuario
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
