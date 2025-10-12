import React, { useState } from "react";
import { useParams } from "react-router-dom";
import productos from "../Jsdata";
import ListaProducto from "../components/ListaProducto";

function normalizar(texto) {
  return texto
    ? texto.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim()
    : "";
}

export default function Inicio({ busqueda }) {
  const { nombreCategoria } = useParams();

  let productosFiltrados = nombreCategoria
    ? productos.filter(
        (p) =>
          normalizar(p.categoria) ===
          normalizar(decodeURIComponent(nombreCategoria))
      )
    : productos;

  if (busqueda) {
    productosFiltrados = productosFiltrados.filter(
      (p) =>
        normalizar(p.nombre).includes(normalizar(busqueda)) ||
        normalizar(p.categoria).includes(normalizar(busqueda)) ||
        (p.marca && normalizar(p.marca).includes(normalizar(busqueda)))
    );
  }

  return (
    <>
      <ListaProducto productos={productosFiltrados} />
    </>
  );
}
