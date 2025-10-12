import React, { useState } from "react";
import { FaEdit, FaTrash, FaArrowLeft } from "react-icons/fa";
import "../css/inventario.css";

const productosEjemplo = [
  {
    nombre: "Laptop HP",
    categoria: "Computadoras y Tablets",
    descripcion: "Laptop de 15 pulgadas con procesador i5",
    precio: 500,
    stock: 10,
  },
  {
    nombre: "iPhone 14",
    categoria: "Celulares",
    descripcion: "Smartphone Apple iPhone 14",
    precio: 1000,
    stock: 5,
  },
  {
    nombre: "Auriculares Sony",
    categoria: "Audio",
    descripcion: "Auriculares inalámbricos con cancelación de ruido",
    precio: 150,
    stock: 20,
  },
];

export default function Inventario() {
  const [productos, setProductos] = useState(productosEjemplo);

  const handleVolver = () => {
    window.history.back();
  };

  const handleEditar = (index) => {
    console.log("Editar producto:", productos[index]);
  };

  const handleEliminar = (index) => {
    console.log("Eliminar producto:", productos[index]);
  };

  return (
    <div className="inventario-page">
      <div className="inventario-card">
        <button className="btn-volver" onClick={handleVolver}>
          <FaArrowLeft />
        </button>

        <h2 className="titulo-inventario">Inventario de Productos</h2>
        <div className="linea-amarilla-inventario"></div>

        <table className="tabla-inventario">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((p, i) => (
              <tr key={i}>
                <td>{p.nombre}</td>
                <td>{p.categoria}</td>
                <td>{p.descripcion}</td>
                <td>${p.precio}</td>
                <td>{p.stock}</td>
                <td className="acciones">
                  <div className="botones-accion">
                    <button onClick={() => handleEditar(i)} className="btn-editar">
                      <FaEdit />
                    </button>
                    <button onClick={() => handleEliminar(i)} className="btn-eliminar">
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
