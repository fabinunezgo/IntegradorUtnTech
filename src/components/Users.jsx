import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaUserTie } from "react-icons/fa";
import "../css/users.css";
import { getUsers } from "../js/api";
import { useNavigate } from "react-router-dom";

export default function Users() {
    const [usuarios, setUsuarios] = useState([]);
    const navigate = useNavigate();

    // Obtener sucursal activa del usuario actual
    let sucursalUsuario = null;
    try {
        const storedUser = sessionStorage.getItem("usuario");
        sucursalUsuario = storedUser && storedUser !== "undefined"
            ? (JSON.parse(storedUser).IdSucursal || JSON.parse(storedUser).idSucursal)
            : null;
    } catch {
        sucursalUsuario = null;
    }

    useEffect(() => {
        getUsers().then(res => {
            if (res && res.data) {
                const soloSuc = res.data.filter(u => Number(u.Sucursal) === Number(sucursalUsuario)==1);
                setUsuarios(soloSuc);
            }
        });
    }, [sucursalUsuario]);

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
                {usuarios.map(u => (
                    <div className="user-card" key={u.IdUsuario}>
                        <FaUserTie className="user-icon" />
                        <div>
                            <div className="user-nombre">{u.Nombre}</div>
                            <div className="user-correo">{u.Correo}</div>
                            <div className="user-rol">{u.Rol}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    );
}
