import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import "../css/agregarProducto.css";
import { createProduct } from "../js/api";

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

  const handleGuardar = async (e) => {
    e.preventDefault();

    const nuevoProducto = {
      nombre,
      descripcion,
      URLImagen: "https://miweb.com/imagenes/imagen-generica.jpg", 
      precioUnitario: parseFloat(precio),
      idCategoria: 1, 
      idSucursal: 3,  
      activo: 1
    };

    try {
      const res = await createProduct(nuevoProducto);
      console.log("Producto creado:", res);
      alert("Producto guardado exitosamente");
      
      setNombre("");
      setCategoria(categorias[0]);
      setDescripcion("");
      setPrecio("");
      setStock("");
    } catch (error) {
      console.error("Error al guardar producto:", error);
      alert("Error al guardar el producto");
    }
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
            required
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
            required
          />

          <label>Precio:</label>
          <input
            type="number"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            placeholder="Ingrese el precio"
            required
          />

          <label>Stock:</label>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            placeholder="Ingrese cantidad disponible"
            required
          />

          <button type="submit" className="btn-guardar">Guardar Producto</button>
        </form>
      </div>
    </div>
  );
}
