
const API_BASE_URL = "https://backendintegrador2-production.up.railway.app"; 

// --- Sucursales ---
export const getBranches = async () => {
  return fetch(`${API_BASE_URL}/branch`).then(res => res.json());
};

// --- Categorías ---
export const getCategories = async () => {
  return fetch(`${API_BASE_URL}/category`).then(res => res.json());
};

// --- Productos ---
export const getProducts = async () => {
  return fetch(`${API_BASE_URL}/products`).then(res => res.json());
};

export const getProductById = async (id) => {
  return fetch(`${API_BASE_URL}/products/${id}`).then(res => res.json());
};

export const createProduct = async (producto) => {
  return fetch(`${API_BASE_URL}/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(producto),
  }).then(res => res.json());
};

export const updateProduct = async (id, producto) => {
  return fetch(`${API_BASE_URL}/products/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(producto),
  }).then(res => res.json());
};

export const deleteProduct = async (id) => {
  return fetch(`${API_BASE_URL}/products/${id}`, { method: "DELETE" }).then(res => res.json());
};

export const buyProduct = async (compra) => {
  return fetch(`${API_BASE_URL}/products/comprar`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(compra),
  }).then(res => res.json());
};

// --- Usuarios ---
export const registerUser = async (usuario) => {
  return fetch(`${API_BASE_URL}/users/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(usuario),
  }).then(res => res.json());
};

export const loginUser = async (credenciales) => {
  return fetch(`${API_BASE_URL}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credenciales),
  }).then(res => res.json());
};
