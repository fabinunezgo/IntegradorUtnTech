import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import "../css/agregarProducto.css";
import { createProduct } from "../js/api";

const categoriasPorSucursal = {
  7: [{ nombre: "Computadoras y Tablets", id: 2 }],
  3: [{ nombre: "Celulares", id: 3 }],
  4: [{ nombre: "Audio", id: 4 }],
  5: [{ nombre: "TV y Proyección", id: 5 }],
  6: [{ nombre: "Hogar y Oficina", id: 6 }],
};


export default function AgregarProducto() {
  const usuario = JSON.parse(sessionStorage.getItem("usuario") || "{}");
  console.log("Usuario desde sessionStorage:", usuario);

  const idSucursal = usuario.IdSucursal || 0;
  console.log("idSucursal seleccionado:", idSucursal);

  const categoriasPermitidas = categoriasPorSucursal[idSucursal] || [];
  console.log("categoriasPermitidas:", categoriasPermitidas);

  const [nombre, setNombre] = useState("");
  const [categoria, setCategoria] = useState(categoriasPermitidas[0]?.nombre || "");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");
  const [URLImagen, setUrlImagen] = useState("");
  const handleGuardar = async (e) => {
    e.preventDefault();

    const catObj = categoriasPermitidas.find((c) => c.nombre === categoria) || {};
    console.log("catObj seleccionado:", catObj);

    const nuevoProducto = {
      nombre,
      descripcion,
      URLImagen,
      precioUnitario: parseFloat(precio),
      idCategoria: catObj.id || 1,
      idSucursal: idSucursal,
      activo: 1
    };

    console.log("Objeto que se enviará a createProduct:", nuevoProducto);

    try {
      const res = await createProduct(nuevoProducto);
      console.log("Respuesta de createProduct:", res);
      if (res.success) {
        alert("Producto guardado exitosamente");
        setNombre("");
        setCategoria(categoriasPermitidas[0]?.nombre || "");
        setDescripcion("");
        setPrecio("");
        setStock("");
      } else {
        console.error("Error en respuesta de API:", res);
        alert("Error en la respuesta: " + (res.message || "Error al guardar producto"));
      }
    } catch (error) {
      console.error("Error en el catch:", error);
      alert("Error al guardar el producto");
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
    </div>
  );
}
