import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import "../css/agregarProducto.css";

const categorias = [
  "Computadoras y Tablets",
  "Celulares",
  "Audio",
  "TV y Proyección",
  "Hogar y Oficina",
];

export default function AgregarProducto() {
  const [nombre, setNombre] = useState("");
  const [categoria, setCategoria] = useState(categorias[0]);
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");

  const handleGuardar = (e) => {
    e.preventDefault();
    console.log({ nombre, categoria, descripcion, precio, stock });
  };

  const handleVolver = () => {
    window.history.back();
  };

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
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ingrese el nombre del producto"
          />

          <label>Categoría:</label>
          <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
            {categorias.map((cat, idx) => (
              <option key={idx} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <label>Descripción:</label>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            placeholder="Ingrese una descripción del producto"
            rows="3"
          />

          <label>Precio:</label>
          <input
            type="number"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            placeholder="Ingrese el precio"
          />

          <label>Stock:</label>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            placeholder="Ingrese cantidad disponible"
          />

          <button type="submit" className="btn-guardar">Guardar Producto</button>
        </form>
      </div>
    </div>
  );
}
