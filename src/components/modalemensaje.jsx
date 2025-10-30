import React from "react";
import { createPortal } from "react-dom";
import "../css/modalmensaje.css";

export default function SimpleModal({
  show = false,
  title = "",
  message = "",
  onClose = () => {},
  primary = null, // { label: string, onClick: fn } opcional
}) {
  if (!show) return null;
  return createPortal(
    <div className="sm-backdrop" onClick={onClose}>
      <div className="sm-card" onClick={(e) => e.stopPropagation()}>
        <button className="sm-close" onClick={onClose}>×</button>
        {title !== "" && <h3 className="sm-title">{title}</h3>}
        <div className="sm-body">{message}</div>
        <div className="sm-actions">
          {primary && (
            <button
              className="sm-btn sm-btn-primary"
              onClick={() => { primary.onClick?.(); onClose?.(); }}
            >
              {primary.label || "OK"}
            </button>
          )}
          <button className="sm-btn sm-btn-secondary" onClick={onClose}>Cerrar</button>
        </div>
      </div>
    </div>,
    document.body
  );
}