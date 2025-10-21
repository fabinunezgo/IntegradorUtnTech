import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import TarjetaProducto from "./TarjetaProducto";
import Footer from "./Footer";
import "../css/inicio.css";
import "../css/agregarProducto.css";
import "../css/cards.css";
import "../css/inventario.css";
import { getProducts, deleteProduct, updateProduct } from "../js/api";

const ITEMS_POR_PAGINA = 8;

export default function Inventario() {
  const [productos, setProductos] = useState([]);
  const [productoEditando, setProductoEditando] = useState(null);
  const [formData, setFormData] = useState({
    Nombre: "",
    Descripcion: "",
    URLImagen: "",
    PrecioUnitario: "",
    IdCategoria: "",
    IdSucursal: "",
    Activo: ""
  });
  const [pagina, setPagina] = useState(1);

  // Solo productos de la sucursal activa
  const fetchProductos = async () => {
    try {
      const res = await getProducts();
      const todos = res.data;
      const storedUser = JSON.parse(sessionStorage.getItem("usuario"));
      const idSucursal = Number(storedUser?.IdSucursal);
      const filtrados = todos.filter(p => Number(p.IdSucursal) === idSucursal);
      setProductos(filtrados);
    } catch (error) {
      console.error("Error al obtener productos:", error);
    }
  };

  useEffect(() => { fetchProductos(); }, []);

  const totalPaginas = Math.max(Math.ceil(productos.length / ITEMS_POR_PAGINA), 1);
  const indiceInicio = (pagina - 1) * ITEMS_POR_PAGINA;
  const productosPag = productos.slice(indiceInicio, indiceInicio + ITEMS_POR_PAGINA);

  const handleEditar = (producto) => {
    setProductoEditando(producto);
    setFormData({
      Nombre: producto.Nombre,
      Descripcion: producto.Descripcion,
      URLImagen: producto.URLImagen,
      PrecioUnitario: producto.PrecioUnitario,
      IdCategoria: producto.IdCategoria || producto.idCategoria,
      IdSucursal: producto.IdSucursal || producto.idSucursal,
      Activo: producto.Activo
    });
  };

  const handleEliminar = async (producto) => {
    const confirmacion = window.confirm(`¿Eliminar "${producto.Nombre}"?`);
    if (!confirmacion) return;
    try {
      await deleteProduct(producto.IdProducto);
      const nuevos = productos.filter(p => p.IdProducto !== producto.IdProducto);
      setProductos(nuevos);
      alert("Producto eliminado correctamente");
    } catch (error) {
      alert("No se pudo eliminar el producto");
    }
  };

  const handleCerrarModal = () => setProductoEditando(null);

  const handleGuardarCambios = async () => {
    try {
      const productoActualizado = {
        nombre: formData.Nombre,
        descripcion: formData.Descripcion,
        URLImagen: formData.URLImagen,
        precioUnitario: parseFloat(formData.PrecioUnitario),
        idCategoria: Number(formData.IdCategoria),
        idSucursal: Number(formData.IdSucursal),
        activo: Number(formData.Activo)
      };
      await updateProduct(productoEditando.IdProducto, productoActualizado);
      await fetchProductos();
      setProductoEditando(null);
      alert("Producto actualizado correctamente");
    } catch {
      alert("No se pudo actualizar el producto");
    }
  };

  return (
    <div className="main-content">
      <div className="inventario-card">
        <button className="btn-volver" onClick={() => window.history.back()}>
          <FaArrowLeft />
        </button>
        <h2 className="titulo-inventario">Inventario de Productos</h2>
        <div className="linea-amarilla-inventario"></div>
        <div className="inventario-cards-grid">
          {productosPag.map(p => (
            <TarjetaProducto
              key={p.IdProducto}
              producto={{
                ...p,
                nombre: p.Nombre,
                descripcion: p.Descripcion,
                precioUnitario: p.PrecioUnitario,
                urlImagen: p.URLImagen,
                categoria: p.Categoria || p.categoria
              }}
              onEditar={() => handleEditar(p)}
              onEliminar={() => handleEliminar(p)}
              modoInventario={true}
            />
          ))}
        </div>
        <div className="paginador">
          <button onClick={() => setPagina(p => Math.max(1, p - 1))} disabled={pagina === 1}>Anterior</button>
          <span>Página {pagina} de {totalPaginas}</span>
          <button onClick={() => setPagina(p => Math.min(totalPaginas, p + 1))} disabled={pagina === totalPaginas}>Siguiente</button>
        </div>
      </div>
      <Footer />

      {productoEditando && (
        <div className="modal-editar-backdrop">
          <div className="agregar-producto-card">
            <button className="btn-volver" onClick={handleCerrarModal}>
              <FaArrowLeft />
            </button>
            <h2 className="titulo-agregar">Editar Producto</h2>
            <div className="linea-amarilla-agregar"></div>
            <form
              onSubmit={e => {
                e.preventDefault();
                handleGuardarCambios();
              }}
            >
              <label>Nombre:</label>
              <input
                type="text"
                value={formData.Nombre}
                onChange={e => setFormData({ ...formData, Nombre: e.target.value })}
                required
              />

              <label>Descripción:</label>
              <textarea
                value={formData.Descripcion}
                onChange={e => setFormData({ ...formData, Descripcion: e.target.value })}
                required
              />

              <label>Imagen (URL):</label>
              <input
                type="text"
                value={formData.URLImagen}
                onChange={e => setFormData({ ...formData, URLImagen: e.target.value })}
                required
              />

              <label>Precio:</label>
              <input
                type="number"
                value={formData.PrecioUnitario}
                onChange={e => setFormData({ ...formData, PrecioUnitario: e.target.value })}
                required
              />

              <label>Categoría (ID):</label>
              <input
                type="number"
                value={formData.IdCategoria}
                onChange={e => setFormData({ ...formData, IdCategoria: e.target.value })}
                required
              />

              <label>Sucursal (ID):</label>
              <input
                type="number"
                value={formData.IdSucursal}
                onChange={e => setFormData({ ...formData, IdSucursal: e.target.value })}
                required
              />

              <label>Activo:</label>
              <select
                value={formData.Activo}
                onChange={e => setFormData({ ...formData, Activo: Number(e.target.value) })}
              >
                <option value={1}>Sí</option>
                <option value={0}>No</option>
              </select>

              <button type="submit" className="btn-guardar">
                Guardar Cambios
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
