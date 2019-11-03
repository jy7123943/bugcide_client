import React from 'react';
import './css/style.scss';

const Modal = ({ onModalClose, children }) => {
  return (
    <div className="modal-container">
      <div className="modal-content">
        <button
          type="button"
          className="btn-close"
          onClick={onModalClose}
        >
          X
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
