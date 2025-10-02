import { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";
import ModalSucursal from "./components/ModalSucursal";
import ModalAcerca from "./components/ModalAcerca";

function App() {
  const [view, setView] = useState("inicio");
  const [showModalSucursal, setShowModalSucursal] = useState(null);
  const [showAcerca, setShowAcerca] = useState(false);

  return (
    <div className="bg-gray-100 text-gray-800 font-sans">
      {/* Header */}
      <Header />

      {/* Hero */}
      <section className="text-center py-12 bg-gradient-to-r from-blue-50 to-blue-100">
        <h2 className="text-3xl font-bold text-gray-800">Bienvenido a UtnTech</h2>
        <p className="mt-2 text-gray-600">
          Encuentra lo último en tecnología en nuestras sucursales especializadas
        </p>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-12 flex gap-6">
        {/* Sidebar */}
        <Sidebar setView={setView} setShowAcerca={setShowAcerca} />

        {/* Contenido principal */}
        <Main view={view} setModalSucursal={setShowModalSucursal} />
      </div>

      {/* Modales */}
      {showModalSucursal && (
        <ModalSucursal sucursal={showModalSucursal} onClose={() => setShowModalSucursal(null)} />
      )}
      {showAcerca && <ModalAcerca onClose={() => setShowAcerca(false)} />}
    </div>
  );
}

export default App;
