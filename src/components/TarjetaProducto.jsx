import React, { useState } from "react";
import { FaEdit, FaTrash, FaShoppingCart, FaTimes } from "react-icons/fa";
import SimpleModal from "./modalemensaje";
import "../css/cards.css";
import { addToCart } from "../js/addtocart";

export default function TarjetaProducto({ producto, onEditar, onEliminar, modoInventario }) {
  const [modal, setModal] = useState(false);
  const [simpleModalVisible, setSimpleModalVisible] = useState(false);

  const handleComprarClick = (e) => {
    e.stopPropagation();
    setSimpleModalVisible(true);
  };

  return (
    <>
      <div className="producto-card" onClick={() => setModal(true)}>
        <img src={producto.urlImagen} alt={producto.nombre} className="producto-imagen" />
        <h3 className="producto-titulo">{producto.nombre}</h3>
        <p className="producto-precio">
          ₡{parseFloat(producto.precioUnitario).toLocaleString('es-CR')}
        </p>
        <p className="cat-tag">{producto.categoria}</p>
        {modoInventario ? (
          <div className="botones-accion" style={{ marginTop: "10px", justifyContent: "center" }}>
            <button
              className="btn-editar"
              title="Editar"
              onClick={e => { e.stopPropagation(); onEditar(producto); }}
            >
              <FaEdit /> Editar
            </button>
            <button
              className="btn-eliminar"
              title="Eliminar"
              onClick={e => { e.stopPropagation(); onEliminar(producto); }}
            >
              <FaTrash /> Eliminar
            </button>
          </div>
        ) : (
          <button className="btn-comprar" onClick={handleComprarClick}>
            <FaShoppingCart className="icono-carrito" /> Comprar
          </button>
        )}
      </div>

      <SimpleModal
        show={simpleModalVisible}
        title="Compra"
        message={`¿Desea agregar "${producto.nombre}" al carrito de compras?`}
        onClose={() => setSimpleModalVisible(false)}
        primary={{
          label: "Confirmar",
          onClick: () => {
            addToCart(producto);
            setSimpleModalVisible(false);
          }
        }}
      />

      {modal && (
        <div className="modal-overlay" onClick={() => setModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setModal(false)}>
              <FaTimes />
            </button>
            <div className="modal-detalle-header">
              <img
                src={producto.urlImagen}
                alt={producto.nombre}
                className="modal-producto-imagen"
              />
              <h2 className="modal-nombre">{producto.nombre}</h2>
              <h3 className="modal-precio">
                <b>Precio:</b> <span>
                  ₡{parseFloat(producto.precioUnitario).toLocaleString('es-CR')}
                </span>
              </h3>
            </div>
            <div className="modal-detalle-body">
              <p>
                <b>Categoría:</b> <span>{producto.categoria}</span>
              </p>
              <p>
                <b>Descripción:</b> <span>{producto.descripcion}</span>
              </p>
            </div>
            {modoInventario && (
              <div className="botones-accion">
                <button className="btn-editar"
                  title="Editar"
                  onClick={e => { e.stopPropagation(); onEditar(producto); setModal(false); }}>
                  <FaEdit /> Editar
                </button>
                <button className="btn-eliminar"
                  title="Eliminar"
                  onClick={e => { e.stopPropagation(); onEliminar(producto); setModal(false); }}>
                  <FaTrash /> Eliminar
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}