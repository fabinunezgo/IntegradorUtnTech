import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ListaProducto from "../components/ListaProducto";
import { getProducts } from "../js/api";
import "../css/inicio.css";

function normalizar(texto) {
  return texto
    ? texto.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim()
    : "";
}

export default function Inicio({ busqueda }) {
  const { nombreCategoria } = useParams();
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  const [pagina, setPagina] = useState(1);
  const productosPorPagina = 8;

  const mapeoCategorias = {
    2: "Computadoras y Tablets",
    3: "Celulares",
    4: "Audio",
    5: "TV y Proyección",
    6: "Hogar y Oficina"
  };

  useEffect(() => {
    function cargarProductos() {
      getProducts()
        .then((data) => {
          const productosAdaptados = (data.data ? data.data : data).map(p => ({
            idProducto: p.IdProducto,
            nombre: p.Nombre,
            descripcion: p.Descripcion,
            precioUnitario: p.PrecioUnitario,
            categoria: mapeoCategorias[p.IdCategoria] || "Sin categoría",
            urlImagen: p.URLImagen
          }));
          setProductos(productosAdaptados);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
    cargarProductos();
    const interval = setInterval(cargarProductos, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

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

  useEffect(() => {
    setPagina(1);
  }, [nombreCategoria, busqueda]);


  const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);
  const indiceInicio = (pagina - 1) * productosPorPagina;
  const productosPaginados = productosFiltrados.slice(indiceInicio, indiceInicio + productosPorPagina);

  if (loading) return <div>Cargando productos...</div>;

  return (
    <div className="main-content">
      <ListaProducto productos={productosPaginados} />
      <div className="paginador">
        <button
          onClick={() => setPagina(p => Math.max(1, p - 1))}
          disabled={pagina === 1}
        >
          Anterior
        </button>
        <span>Página {pagina} de {totalPaginas}</span>
        <button
          onClick={() => setPagina(p => Math.min(totalPaginas, p + 1))}
          disabled={pagina === totalPaginas}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
