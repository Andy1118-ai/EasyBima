import React from 'react';
import './Modal.css';

const Modal = ({
  isOpen,
  onClose,
  children,
  title,
  className = '',
  size = 'medium'
}) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className={`modal-content ${size} ${className}`}>
        {title && <div className="modal-header">
          <h2>{title}</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>}
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal; 