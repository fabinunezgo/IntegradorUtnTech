// ...existing code...
import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import "../css/agregarProducto.css";
import { createProduct } from "../js/api";
import SimpleModal from "./modalemensaje"; // <-- añadido

const categoriasPorSucursal = {
  7: [{ nombre: "Computadoras y Tablets", id: 2 }],
  3: [{ nombre: "Celulares", id: 3 }],
  4: [{ nombre: "Audio", id: 4 }],
  5: [{ nombre: "TV y Proyección", id: 5 }],
  6: [{ nombre: "Hogar y Oficina", id: 6 }],
};


export default function AgregarProducto() {
  const usuario = JSON.parse(sessionStorage.getItem("usuario") || "{}");

  const idSucursal = usuario.IdSucursal || 0;
  const categoriasPermitidas = categoriasPorSucursal[idSucursal] || [];

  const [nombre, setNombre] = useState("");
  const [categoria, setCategoria] = useState(categoriasPermitidas[0]?.nombre || "");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");
  const [URLImagen, setUrlImagen] = useState("");

  // estado para el modal de mensaje
  const [modalInfo, setModalInfo] = useState({
    show: false,
    title: "",
    message: "",
    onConfirm: null, // función a ejecutar al aceptar
  });

  const limpiarFormulario = () => {
    setNombre("");
    setCategoria(categoriasPermitidas[0]?.nombre || "");
    setDescripcion("");
    setPrecio("");
    setStock("");
    setUrlImagen("");
  };

  const handleGuardar = async (e) => {
    e.preventDefault();

    const catObj = categoriasPermitidas.find((c) => c.nombre === categoria) || {};

    const nuevoProducto = {
      nombre,
      descripcion,
      URLImagen,
      precioUnitario: parseFloat(precio),
      idCategoria: catObj.id || 1,
      idSucursal: idSucursal,
      activo: 1
    };

    try {
      const res = await createProduct(nuevoProducto);
      if (res.success) {
        // mostrar modal en vez de alert; al aceptar limpiar formulario (mismo efecto que antes)
        setModalInfo({
          show: true,
          title: "Producto guardado",
          message: "El producto se guardó exitosamente.",
          onConfirm: () => {
            limpiarFormulario();
            // si antes hacías algo extra (redirect, recarga), agrégalo aquí
          }
        });
      } else {
        setModalInfo({
          show: true,
          title: "Error",
          message: "Error al guardar: " + (res.message || "respuesta inválida"),
          onConfirm: null
        });
      }
    } catch (error) {
      setModalInfo({
        show: true,
        title: "Error",
        message: "Error al guardar el producto.",
        onConfirm: null
      });
    }
  };

  const handleVolver = () => window.history.back();

  return (
    <div className="agregar-producto-page">
      <div className="agregar-producto-card">
        <button className="btn-volver" onClick={handleVolver}>
          <FaArrowLeft />
        </button>
        <h2 className="titulo-agregar">Agregar Producto</h2>
        <div className="linea-amarilla-agregar"></div>
        <form onSubmit={handleGuardar}>
          <label>Nombre del Producto:</label>
          <input
            type="text"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
            placeholder="Ingrese el nombre del producto"
            required
          />

          <label>Categoría:</label>
          <select value={categoria} onChange={e => setCategoria(e.target.value)}>
            {categoriasPermitidas.map((cat, idx) => (
              <option key={idx} value={cat.nombre}>{cat.nombre}</option>
            ))}
          </select>

          <label>Descripción:</label>
          <textarea
            value={descripcion}
            onChange={e => setDescripcion(e.target.value)}
            placeholder="Ingrese una descripción del producto"
            rows="3"
            required
          />

          <label>Precio:</label>
          <input
            type="number"
            value={precio}
            onChange={e => setPrecio(e.target.value)}
            placeholder="Ingrese el precio"
            required
          />

          <label>Stock:</label>
          <input
            type="number"
            value={stock}
            onChange={e => setStock(e.target.value)}
            placeholder="Ingrese cantidad disponible"
            required
          />

          <label>URL de la Imagen:</label>
          <input
            type="text"
            value={URLImagen}
            onChange={e => setUrlImagen(e.target.value)}
            placeholder="Ingrese la URL de la imagen"
            required
          />

          <button type="submit" className="btn-guardar">Guardar Producto</button>
        </form>
      </div>

      {/* Modal de mensaje: botón "Aceptar" ejecuta onConfirm si existe y cierra el modal */}
      <SimpleModal
        show={modalInfo.show}
        title={modalInfo.title}
        message={modalInfo.message}
        onClose={() => setModalInfo({ show: false, title: "", message: "", onConfirm: null })}
        primary={modalInfo.onConfirm ? { label: "Aceptar", onClick: modalInfo.onConfirm } : null}
      />
    </div>
  );
}
// ...existing code...