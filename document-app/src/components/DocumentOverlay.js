import React from 'react';
import { Modal } from 'react-bootstrap';

const DocumentOverlay = ({ show, document, onHide }) => {
  if (!document) return null;

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Body>
        {/* Display the full image in the overlay */}
        <img src={`/thumbnails/${document.type}.png`} alt={document.title} />
      </Modal.Body>
    </Modal>
  );
};

export default DocumentOverlay;
