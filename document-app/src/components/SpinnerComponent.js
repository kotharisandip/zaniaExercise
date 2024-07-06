import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

const SpinnerComponent = () => {
  return (
    <div className="spinner-container">
      {/* Bootstrap spinner for loading state */}
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    </div>
  );
};

export default SpinnerComponent;
