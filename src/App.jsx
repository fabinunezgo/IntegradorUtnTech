import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Encabezado from "./components/Encabezado";
import Footer from "./components/Footer";
import MenuLateral from "./components/MenuLateral";
import Inicio from "./pages/Inicio";
import Servicios from "./pages/Servicios";
import Acerca from "./pages/Acerca";
import Contacto from "./pages/Contacto";
import "./App.css";

export default function App() {
  return (
    <Router>
      <div className="app">
        <Encabezado />
        <div className="contenido-principal">
          <MenuLateral />
          <div className="contenido-scroll">
          <main>
            <Routes>
              <Route path="/" element={<Inicio />} />
              <Route path="/Servicios" element={<Servicios />} />
              <Route path="/Acerca" element={<Acerca />} />
              <Route path="/Contacto" element={<Contacto />} />
            </Routes>
          </main>
        </div>
        </div>
        <Footer />
      </div>
    </Router>
  );
}
