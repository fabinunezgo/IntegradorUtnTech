import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import TarjetaProducto from "./TarjetaProducto";
import SimpleModal from "./modalemensaje"; // ...added...
import "../css/carrito.css";
import { getCart, clearCart } from "../js/addtocart";

// ...existing code...
export default function Carrito({ abierto, onClose }) {
  const [productos, setProductos] = useState([]);
  const [pagoModal, setPagoModal] = useState({ show: false, title: "", message: "" }); // <-- nuevo estado

  useEffect(() => {
    if (abierto) setProductos(getCart());
  }, [abierto]);

  const saveCart = (items) => {
    try {
      const now = Date.now();
      const oneHourLater = now + 60 * 60 * 1000;
      sessionStorage.setItem("cart_utt", JSON.stringify({ items, expires: oneHourLater }));
    } catch { }
  };

  const handleVaciar = () => {
    clearCart();
    setProductos([]);
  };

  const handleEliminar = (producto) => {
    const nuevos = productos.filter(p => p.idProducto !== producto.idProducto);
    setProductos(nuevos);
    saveCart(nuevos);
  };

  const total = productos.reduce((s, p) => s + (parseFloat(p.precioUnitario) || 0), 0);

  if (!abierto) return null;

  const handlePagar = () => {
    setPagoModal({
      show: true,
      title: "Pasar a pagar",
      message: "Pasar a pagar (pendiente)"
    });
  };

  const modal = (
    <div className="carrito-backdrop" role="dialog" aria-modal="true">
      <div className="carrito-modal">
        <header className="carrito-header">
          <div>
            <h2 className="carrito-titulo">Tu Carrito</h2>
            <p className="carrito-sub">Tienes <strong>{productos.length}</strong> {productos.length === 1 ? "producto" : "productos"}</p>
          </div>
          <div className="carrito-header-actions">
            <button className="carrito-cerrar" onClick={onClose} aria-label="Cerrar">×</button>
          </div>
        </header>

        <section className="carrito-body">
          {productos.length === 0 ? (
            <div className="carrito-vacio">Tu carrito está vacío.</div>
          ) : (
            <div className="carrito-cards-lista">
              {productos.map((prod) => (
                <div className="carrito-card-wrapper" key={prod.idProducto}>
                  <TarjetaProducto
                    producto={prod}
                    modoInventario={false}
                    modoCarrito={true}
                    onEliminar={() => handleEliminar(prod)}
                  />
                </div>
              ))}
            </div>
          )}
        </section>

        <footer className="carrito-footer">
          <div className="carrito-total">
            <span>Total</span>
            <span className="carrito-total-amount">₡{total.toLocaleString('es-CR')}</span>
          </div>
          <div className="carrito-actions">
            <button className="btn-secondary" onClick={handleVaciar} disabled={productos.length === 0}>Vaciar</button>
            <button className="btn-primary" onClick={handlePagar} disabled={productos.length === 0}>Pagar</button>
          </div>
        </footer>
      </div>


      <SimpleModal
        show={pagoModal.show}
        title={pagoModal.title}
        message={pagoModal.message}
        onClose={() => setPagoModal({ show: false, title: "", message: "" })}
        primary={null}
      />
    </div>
  );

  return createPortal(modal, document.body);
}