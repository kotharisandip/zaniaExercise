// src/components/SpinnerComponent.js
import React from 'react';
import { Spinner } from 'react-bootstrap';
import './SpinnerComponent.css'; // Optional CSS file for styling

const SpinnerComponent = () => {
  return (
    <div className="spinner-container">
      <Spinner animation="border" role="status">
        <span className="sr-only">Saving...</span>
      </Spinner>
      <div>Saving...</div>
    </div>
  );
};

export default SpinnerComponent;
