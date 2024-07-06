// src/components/OverlayComponent.js
import React from 'react';
import './OverlayComponent.css';

const OverlayComponent = ({ doc, onClose }) => {
  return (
    <div className="overlay" onClick={onClose}>
      <img src={`/${doc.type}.jpg`} alt={doc.title} />
    </div>
  );
};

export default OverlayComponent;
