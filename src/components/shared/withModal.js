import React, { useState, useCallback, useRef, useEffect } from 'react';
import './ModalDatePicker.css';

/**
 * Higher-order component that wraps any component in a modal dialog
 * 
 * @param {React.ComponentType} WrappedComponent - The component to wrap in a modal
 * @param {Object} options - Options for the modal
 * @param {string} options.modalTitle - The title of the modal
 * @returns {React.ComponentType} - The wrapped component
 */
const withModal = (WrappedComponent, options = {}) => {
  const { modalTitle = 'Select' } = options;
  
  /**
   * Modal wrapper component
   */
  const ModalWrapper = (props) => {
    const {
      onChange,
      placeholder = "Click to select",
      label,
      disabled = false,
      required = false,
      name,
      id,
      className = "",
      theme,
      onClose,
      ...restProps
    } = props;
    
    const [isOpen, setIsOpen] = useState(false);
    const [tempValue, setTempValue] = useState(props.value || props.selectedDate || null);
    const modalRef = useRef(null);
    const inputRef = useRef(null);
    const uniqueId = id || `modal-wrapper-${Math.random().toString(36).substring(2, 9)}`;
    const labelId = `${uniqueId}-label`;
    const modalId = `${uniqueId}-modal`;
    const titleId = `${uniqueId}-title`;

    // Handle opening the modal
    const handleOpen = useCallback(() => {
      if (!disabled) {
        setTempValue(props.value || props.selectedDate || null);
        setIsOpen(true);
      }
    }, [disabled, props.value, props.selectedDate]);

    // Handle closing the modal
    const handleClose = useCallback(() => {
      setIsOpen(false);
      if (onClose) {
        onClose();
      }
      // Return focus to the input element
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, [onClose]);

    // Handle value change
    const handleChange = useCallback((value) => {
      setTempValue(value);
    }, []);

    // Handle applying the selected value
    const handleApply = useCallback(() => {
      onChange(tempValue);
      handleClose();
    }, [onChange, tempValue, handleClose]);

    // Handle clearing the value
    const handleClear = useCallback(() => {
      setTempValue(null);
      onChange(null);
      handleClose();
    }, [onChange, handleClose]);

    // Handle clicking outside the modal to close it
    const handleOutsideClick = useCallback((e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        handleClose();
      }
    }, [handleClose]);

    // Handle keyboard events
    const handleKeyDown = useCallback((e) => {
      if (e.key === 'Escape') {
        handleClose();
      } else if (e.key === 'Enter' && !isOpen) {
        handleOpen();
      }
    }, [handleClose, handleOpen, isOpen]);

    // Add event listeners when the modal is open
    useEffect(() => {
      if (!isOpen) return;

      const currentModalRef = modalRef.current;
      document.addEventListener('mousedown', handleOutsideClick);
      document.addEventListener('keydown', handleKeyDown);
      
      // Prevent scrolling of the body when modal is open
      document.body.style.overflow = 'hidden';
      
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
        document.body.style.overflow = '';
      };
    }, [isOpen, handleOutsideClick, handleKeyDown]);

    // Format the displayed value
    const getDisplayValue = () => {
      const value = props.value || props.selectedDate;
      if (!value) return '';
      
      try {
        if (typeof value === 'object' && value.toString) {
          return value.toString();
        }
        return String(value);
      } catch (error) {
        console.error('Error formatting value:', error);
        return '';
      }
    };

    return (
      <div className={`modal-wrapper-container ${className} ${theme ? `theme-${theme}` : ''}`}>
        {label && (
          <label 
            id={labelId} 
            htmlFor={uniqueId} 
            className="modal-wrapper-label"
          >
            {label}
            {required && <span className="required-indicator" aria-hidden="true"> *</span>}
          </label>
        )}
        
        <div className="modal-wrapper-input-wrapper">
          <input
            ref={inputRef}
            id={uniqueId}
            type="text"
            className="modal-wrapper-input"
            placeholder={placeholder}
            value={getDisplayValue()}
            onClick={handleOpen}
            onKeyDown={handleKeyDown}
            readOnly
            disabled={disabled}
            aria-haspopup="dialog"
            aria-expanded={isOpen}
            aria-labelledby={label ? labelId : undefined}
            aria-required={required}
            name={name}
          />
          <button 
            type="button" 
            className="modal-wrapper-toggle-button"
            onClick={handleOpen}
            disabled={disabled}
            aria-label={`Open ${modalTitle.toLowerCase()}`}
            tabIndex="-1"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
              <path d="M16 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M8 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M3 10H21" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>
        </div>

        {isOpen && (
          <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby={titleId}>
            <div 
              ref={modalRef} 
              className={`modal-wrapper-dialog ${theme ? `theme-${theme}` : ''}`}
              id={modalId}
            >
              <div className="modal-wrapper-header">
                <h2 id={titleId} className="modal-wrapper-title">{modalTitle}</h2>
                <button 
                  type="button" 
                  className="modal-wrapper-close" 
                  onClick={handleClose}
                  aria-label={`Close ${modalTitle.toLowerCase()}`}
                >
                  ×
                </button>
              </div>
              
              <div className="modal-wrapper-body">
                <WrappedComponent
                  {...restProps}
                  value={tempValue}
                  selectedDate={tempValue}
                  onChange={handleChange}
                />
              </div>
              
              <div className="modal-wrapper-footer">
                {props.isClearable && (
                  <button 
                    type="button" 
                    className="modal-wrapper-clear-button" 
                    onClick={handleClear}
                  >
                    Clear
                  </button>
                )}
                <button 
                  type="button" 
                  className="modal-wrapper-cancel-button" 
                  onClick={handleClose}
                >
                  Cancel
                </button>
                <button 
                  type="button" 
                  className="modal-wrapper-apply-button" 
                  onClick={handleApply}
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Add display name for better debugging
  ModalWrapper.displayName = `withModal(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return ModalWrapper;
};

export default withModal;
