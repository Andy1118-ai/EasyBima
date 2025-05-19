import React, { useState, useCallback, useRef, useEffect, memo } from 'react';
import Calendar, { DateRangeCalendar, MonthPicker, TimePicker } from './Calendar';
import { createTZDate, getLocalTimeZone } from '../../utils/dateUtils';
import './ModalDatePicker.css';

/**
 * Modal Date Picker component that displays a date picker in a modal dialog
 */
const ModalDatePicker = memo(({
  selectedDate,
  onChange,
  placeholder = "Select date",
  label,
  dateFormat = "dd/MM/yyyy",
  timeZone = getLocalTimeZone(),
  showTimeSelect = false,
  timeFormat = "HH:mm",
  timeIntervals = 15,
  timeCaption = "Time",
  disabled = false,
  required = false,
  name,
  id,
  minDate,
  maxDate,
  locale,
  isClearable = true,
  className = "",
  modalTitle = "Select Date",
  onClose,
  theme
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tempDate, setTempDate] = useState(selectedDate);
  const modalRef = useRef(null);
  const inputRef = useRef(null);
  const uniqueId = id || `modal-date-picker-${Math.random().toString(36).substring(2, 9)}`;
  const labelId = `${uniqueId}-label`;
  const modalId = `${uniqueId}-modal`;
  const titleId = `${uniqueId}-title`;

  // Handle opening the modal
  const handleOpen = useCallback(() => {
    if (!disabled) {
      setTempDate(selectedDate);
      setIsOpen(true);
    }
  }, [disabled, selectedDate]);

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

  // Handle date selection
  const handleDateChange = useCallback((date) => {
    setTempDate(date);
  }, []);

  // Handle applying the selected date
  const handleApply = useCallback(() => {
    onChange(tempDate);
    handleClose();
  }, [onChange, tempDate, handleClose]);

  // Handle clearing the date
  const handleClear = useCallback(() => {
    setTempDate(null);
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
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
      document.addEventListener('keydown', handleKeyDown);
      
      // Prevent scrolling of the body when modal is open
      document.body.style.overflow = 'hidden';
      
      // Focus trap - focus the first focusable element in the modal
      const focusableElements = modalRef.current?.querySelectorAll(
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

  // Format the displayed date
  const getDisplayValue = () => {
    if (!selectedDate) return '';
    
    try {
      const dateObj = selectedDate instanceof Date ? selectedDate : new Date(selectedDate);
      return dateObj.toLocaleDateString(locale, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        ...(showTimeSelect && {
          hour: '2-digit',
          minute: '2-digit'
        })
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return '';
    }
  };

  return (
    <div className={`modal-date-picker-container ${className} ${theme ? `theme-${theme}` : ''}`}>
      {label && (
        <label 
          id={labelId} 
          htmlFor={uniqueId} 
          className="modal-date-picker-label"
        >
          {label}
          {required && <span className="required-indicator" aria-hidden="true"> *</span>}
        </label>
      )}
      
      <div className="modal-date-picker-input-wrapper">
        <input
          ref={inputRef}
          id={uniqueId}
          type="text"
          className="modal-date-picker-input"
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
          className="modal-date-picker-toggle-button"
          onClick={handleOpen}
          disabled={disabled}
          aria-label="Open date picker"
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
            className={`modal-date-picker-dialog ${theme ? `theme-${theme}` : ''}`}
            id={modalId}
          >
            <div className="modal-date-picker-header">
              <h2 id={titleId} className="modal-date-picker-title">{modalTitle}</h2>
              <button 
                type="button" 
                className="modal-date-picker-close" 
                onClick={handleClose}
                aria-label="Close date picker"
              >
                ×
              </button>
            </div>
            
            <div className="modal-date-picker-body">
              <Calendar
                selectedDate={tempDate}
                onChange={handleDateChange}
                dateFormat={dateFormat}
                showTimeSelect={showTimeSelect}
                timeFormat={timeFormat}
                timeIntervals={timeIntervals}
                timeCaption={timeCaption}
                timeZone={timeZone}
                minDate={minDate}
                maxDate={maxDate}
                locale={locale}
                isClearable={false}
                className="modal-calendar-input"
                calendarClassName="modal-calendar"
              />
            </div>
            
            <div className="modal-date-picker-footer">
              {isClearable && (
                <button 
                  type="button" 
                  className="modal-date-picker-clear-button" 
                  onClick={handleClear}
                >
                  Clear
                </button>
              )}
              <button 
                type="button" 
                className="modal-date-picker-cancel-button" 
                onClick={handleClose}
              >
                Cancel
              </button>
              <button 
                type="button" 
                className="modal-date-picker-apply-button" 
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
});

// Add display name for better debugging
ModalDatePicker.displayName = 'ModalDatePicker';

export default ModalDatePicker;
