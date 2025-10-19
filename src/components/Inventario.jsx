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
    PrecioUnitario: ""
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

  // Editar/Eliminar...
  const handleEditar = (producto) => {
    setProductoEditando(producto);
    setFormData({
      Nombre: producto.Nombre,
      Descripcion: producto.Descripcion,
      PrecioUnitario: producto.PrecioUnitario
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
    console.log("--- Producto editando (original) ---", productoEditando);
    const productoActualizado = {
      nombre: formData.Nombre,
      descripcion: formData.Descripcion,
      URLImagen: productoEditando.URLImagen,
      precioUnitario: parseFloat(formData.PrecioUnitario),
      idCategoria: Number(productoEditando.idCategoria || productoEditando.IdCategoria),
      idSucursal: Number(productoEditando.idSucursal || productoEditando.IdSucursal),
      activo: Number(productoEditando.Activo)
    };
    console.log("--- Producto enviado en PUT ---", productoActualizado);
      console.log("IdProducto:", productoEditando.IdProducto);
    await updateProduct(productoEditando.IdProducto, productoActualizado);
       const respuesta = await updateProduct(productoEditando.IdProducto, productoActualizado);
    console.log("--- Respuesta update product ---", respuesta);
    await fetchProductos();
    setProductoEditando(null);
    alert("Producto actualizado correctamente");
  } catch {
    alert("No se pudo actualizar el producto");
  }
};



  return (
    <div className="main-content"> {/* Usa la misma clase de inicio */}
      <div className="inventario-card">
        <button className="btn-volver" onClick={() => window.history.back()}>
          <FaArrowLeft />
        </button>
        <h2 className="titulo-inventario">Inventario de Productos</h2>
        <div className="linea-amarilla-inventario"></div>
        <div className="inventario-cards-grid"> {/* igual que .cards-grid de inicio */}
          {productosPag.map(p => (
            <TarjetaProducto
              key={p.IdProducto}
              producto={{
                ...p,
                nombre: p.Nombre,
                descripcion: p.Descripcion,
                precioUnitario: p.PrecioUnitario,
                urlImagen: p.URLImagen,
                categoria: p.Categoria || p.categoria // si tienes string
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
        <label>Nombre del Producto:</label>
        <input
          type="text"
          value={formData.Nombre}
          onChange={e => setFormData({ ...formData, Nombre: e.target.value })}
          placeholder="Ingrese el nombre del producto"
          required
        />

        <label>Descripción:</label>
        <textarea
          value={formData.Descripcion}
          onChange={e => setFormData({ ...formData, Descripcion: e.target.value })}
          placeholder="Ingrese una descripción del producto"
          rows="3"
          required
        />

        <label>Precio:</label>
        <input
          type="number"
          value={formData.PrecioUnitario}
          onChange={e => setFormData({ ...formData, PrecioUnitario: e.target.value })}
          placeholder="Ingrese el precio"
          required
        />

        <label>En stock:</label>
        <select
          value={productoEditando.Activo ? "1" : "0"}
          onChange={e =>
            setProductoEditando({
              ...productoEditando,
              Activo: Number(e.target.value)  // 1: sí, 0: no
            })
          }
        >
          <option value="1">Sí</option>
          <option value="0">No</option>
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
