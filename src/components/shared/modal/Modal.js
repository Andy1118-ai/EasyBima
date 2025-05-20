import React, { useState, useCallback, useRef, useEffect, memo } from 'react';
import './Modal.css';

/**
 * Reusable Modal component
 * 
 * @param {Object} props - Component props
 * @param {boolean} props.isOpen - Whether the modal is open
 * @param {Function} props.onClose - Function to call when the modal is closed
 * @param {string} props.title - Modal title
 * @param {React.ReactNode} props.children - Modal content
 * @param {React.ReactNode} props.footer - Modal footer content
 * @param {string} props.className - Additional class name for the modal
 * @param {string} props.size - Modal size (small, medium, large)
 * @param {boolean} props.closeOnOutsideClick - Whether to close the modal when clicking outside
 * @param {boolean} props.showCloseButton - Whether to show the close button
 * @param {string} props.theme - Theme (light or dark)
 */
const Modal = memo(({
  isOpen,
  onClose,
  title,
  children,
  footer,
  className = '',
  size = 'medium',
  closeOnOutsideClick = true,
  showCloseButton = true,
  theme = 'light'
}) => {
  const modalRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const modalId = `modal-${Math.random().toString(36).substring(2, 9)}`;
  const titleId = `${modalId}-title`;

  // Handle animation timing
  useEffect(() => {
    let timer;
    if (isOpen) {
      setIsVisible(true);
      // Prevent scrolling of the body when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      // Add a delay for the closing animation
      timer = setTimeout(() => {
        setIsVisible(false);
        document.body.style.overflow = '';
      }, 300);
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle clicking outside the modal to close it
  const handleOutsideClick = useCallback((e) => {
    if (closeOnOutsideClick && modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  }, [closeOnOutsideClick, onClose]);

  // Handle keyboard events
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  // Add event listeners when the modal is open
  useEffect(() => {
    if (!isOpen) return;

    const currentModalRef = modalRef.current;
    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleKeyDown);
    
    // Focus trap - focus the first focusable element in the modal
    if (currentModalRef) {
      const focusableElements = currentModalRef.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      if (focusableElements && focusableElements.length > 0) {
        focusableElements[0].focus();
      }
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleOutsideClick, handleKeyDown]);

  if (!isOpen && !isVisible) {
    return null;
  }

  return (
    <div 
      className={`modal-overlay ${isOpen ? 'open' : 'closing'} ${theme}-mode`} 
      role="dialog" 
      aria-modal="true" 
      aria-labelledby={titleId}
    >
      <div 
        ref={modalRef} 
        className={`modal-dialog ${size} ${className} ${isOpen ? 'open' : 'closing'}`}
        id={modalId}
      >
        <div className="modal-header">
          {title && <h2 id={titleId} className="modal-title">{title}</h2>}
          {showCloseButton && (
            <button 
              type="button" 
              className="modal-close" 
              onClick={onClose}
              aria-label="Close modal"
            >
              ×
            </button>
          )}
        </div>
        
        <div className="modal-body">
          {children}
        </div>
        
        {footer && (
          <div className="modal-footer">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
});

// Add display name for better debugging
Modal.displayName = 'Modal';

export default Modal;
