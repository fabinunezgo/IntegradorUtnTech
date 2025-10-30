import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import TarjetaProducto from "./TarjetaProducto";
import Footer from "./Footer";
import SimpleModal from "./modalemensaje";
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

  const [modalMsg, setModalMsg] = useState({ show: false, title: "", message: "", primary: null });

  const fetchProductos = async () => {
    try {
      const res = await getProducts();
      const todos = res.data;
      const storedUser = JSON.parse(sessionStorage.getItem("usuario"));
      const idSucursal = Number(storedUser?.IdSucursal);
      const filtrados = todos.filter(p => Number(p.IdSucursal) === idSucursal);
      setProductos(filtrados);
    } catch (error) {
      setModalMsg({ show: true, title: "Error", message: "Error al obtener productos", primary: null });
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
    setModalMsg({
      show: true,
      title: "Eliminar producto",
      message: `¿Está seguro de que desea eliminar el producto "${producto.Nombre}"?.`,
      primary: {
        label: "Eliminar",
        onClick: async () => {
          try {
            await deleteProduct(producto.IdProducto);
            const nuevos = productos.filter(p => p.IdProducto !== producto.IdProducto);
            setProductos(nuevos);
            setModalMsg({ show: true, title: "Éxito", message: "Producto eliminado correctamente", primary: null });
          } catch {
            setModalMsg({ show: true, title: "Error", message: "No se pudo eliminar el producto", primary: null });
          }
        }
      }
    });
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
      setModalMsg({ show: true, title: "Éxito", message: "Producto actualizado correctamente", primary: null });
    } catch {
      setModalMsg({ show: true, title: "Error", message: "No se pudo actualizar el producto", primary: null });
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

      <SimpleModal
        show={modalMsg.show}
        title={modalMsg.title}
        message={modalMsg.message}
        onClose={() => setModalMsg({ show: false, title: "", message: "", primary: null })}
        primary={modalMsg.primary}
      />

     {productoEditando && (
  <SimpleModal
    show={true}
    title="Editar Producto"
    message={
      <form
        className="form-editar-producto"
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
    }
    onClose={handleCerrarModal}
  />
)}
    </div>
  );
}