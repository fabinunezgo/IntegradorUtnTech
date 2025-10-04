import React from "react";
import ListaProducto from "../components/ListaProducto";
import productos from "../Jsdata";

export default function Inicio() {
  return <ListaProducto productos={productos} />;
}
