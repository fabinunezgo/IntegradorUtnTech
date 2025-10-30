
export function addToCart(producto) {
  const now = Date.now();
  const oneHourLater = now + 60 * 60 * 1000; 
  let carrito = [];
  try {
    const raw = sessionStorage.getItem("cart_utt");
    if (raw) {
      const { items, expires } = JSON.parse(raw);
      if (!expires || expires > now) {
        carrito = items;
      }
    }
  } catch {}
  if (!carrito.some(x => x.idProducto === producto.idProducto)) {
    carrito.push(producto);
  }
  sessionStorage.setItem("cart_utt", JSON.stringify({ items: carrito, expires: oneHourLater }));
}

export function getCart() {
  try {
    const raw = sessionStorage.getItem("cart_utt");
    if (!raw) return [];
    const { items, expires } = JSON.parse(raw);
    if (!expires || expires > Date.now()) return items || [];
    sessionStorage.removeItem("cart_utt");
    return [];
  } catch {
    return [];
  }
}

export function clearCart() {
  try {
    sessionStorage.removeItem("cart_utt");
  } catch {}
}
