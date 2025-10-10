import { useParams } from "react-router-dom";
import productos from "../Jsdata";
import ListaProducto from "../components/ListaProducto";

function normalizar(texto) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

export default function Inicio() {
  const { nombreCategoria } = useParams();

  const productosFiltrados = nombreCategoria
    ? productos.filter(
        p =>
          normalizar(p.categoria) === normalizar(decodeURIComponent(nombreCategoria))
      )
    : productos;

  console.log("Filtrando por:", nombreCategoria);
  console.log("Productos filtrados:", productosFiltrados);

  return <ListaProducto productos={productosFiltrados} />;
}