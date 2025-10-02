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
    <div>
      {/* Header */}
      <Header />

      <div>
        {/* Sidebar */}
        <Sidebar setView={setView} setShowAcerca={setShowAcerca} />

        {/* Contenido principal */}
        <Main view={view} setModalSucursal={setShowModalSucursal} />
      </div>

      {/* Modales */}
      {showModalSucursal && (
        <ModalSucursal
          sucursal={showModalSucursal}
          onClose={() => setShowModalSucursal(null)}
        />
      )}
      {showAcerca && <ModalAcerca onClose={() => setShowAcerca(false)} />}
    </div>
  );
}

export default App;
