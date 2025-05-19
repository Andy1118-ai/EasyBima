import React, { useState, useCallback, useRef, useEffect, memo } from 'react';
import { DateRangeCalendar } from './Calendar';
import { formatDate, getLocalTimeZone } from '../../utils/dateUtils';
import './ModalDatePicker.css';

/**
 * Modal Date Range Picker component that displays a date range picker in a modal dialog
 */
const ModalDateRangePicker = memo(({
  startDate,
  endDate,
  onChangeStart,
  onChangeEnd,
  startLabel = "Start Date",
  endLabel = "End Date",
  placeholder = "Select date range",
  label,
  dateFormat = "dd/MM/yyyy",
  timeZone = getLocalTimeZone(),
  disabled = false,
  required = false,
  name,
  id,
  minDate,
  maxDate,
  locale,
  isClearable = true,
  className = "",
  modalTitle = "Select Date Range",
  onClose,
  theme
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tempStartDate, setTempStartDate] = useState(startDate);
  const [tempEndDate, setTempEndDate] = useState(endDate);
  const modalRef = useRef(null);
  const inputRef = useRef(null);
  const uniqueId = id || `modal-date-range-picker-${Math.random().toString(36).substring(2, 9)}`;
  const labelId = `${uniqueId}-label`;
  const modalId = `${uniqueId}-modal`;
  const titleId = `${uniqueId}-title`;

  // Handle opening the modal
  const handleOpen = useCallback(() => {
    if (!disabled) {
      setTempStartDate(startDate);
      setTempEndDate(endDate);
      setIsOpen(true);
    }
  }, [disabled, startDate, endDate]);

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

  // Handle start date selection
  const handleStartDateChange = useCallback((date) => {
    setTempStartDate(date);
  }, []);

  // Handle end date selection
  const handleEndDateChange = useCallback((date) => {
    setTempEndDate(date);
  }, []);

  // Handle applying the selected date range
  const handleApply = useCallback(() => {
    onChangeStart(tempStartDate);
    onChangeEnd(tempEndDate);
    handleClose();
  }, [onChangeStart, onChangeEnd, tempStartDate, tempEndDate, handleClose]);

  // Handle clearing the date range
  const handleClear = useCallback(() => {
    setTempStartDate(null);
    setTempEndDate(null);
    onChangeStart(null);
    onChangeEnd(null);
    handleClose();
  }, [onChangeStart, onChangeEnd, handleClose]);

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

  // Format the displayed date range
  const getDisplayValue = () => {
    if (!startDate && !endDate) return '';
    
    try {
      let displayText = '';
      
      if (startDate) {
        const startDateObj = startDate instanceof Date ? startDate : new Date(startDate);
        displayText += startDateObj.toLocaleDateString(locale);
      }
      
      displayText += ' - ';
      
      if (endDate) {
        const endDateObj = endDate instanceof Date ? endDate : new Date(endDate);
        displayText += endDateObj.toLocaleDateString(locale);
      }
      
      return displayText;
    } catch (error) {
      console.error('Error formatting date range:', error);
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
          aria-label="Open date range picker"
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
            className={`modal-date-picker-dialog modal-date-range-picker-dialog ${theme ? `theme-${theme}` : ''}`}
            id={modalId}
          >
            <div className="modal-date-picker-header">
              <h2 id={titleId} className="modal-date-picker-title">{modalTitle}</h2>
              <button 
                type="button" 
                className="modal-date-picker-close" 
                onClick={handleClose}
                aria-label="Close date range picker"
              >
                ×
              </button>
            </div>
            
            <div className="modal-date-picker-body">
              <DateRangeCalendar
                startDate={tempStartDate}
                endDate={tempEndDate}
                onChangeStart={handleStartDateChange}
                onChangeEnd={handleEndDateChange}
                startLabel={startLabel}
                endLabel={endLabel}
                showSelectedRange={true}
                dateFormat={dateFormat}
                timeZone={timeZone}
                minDate={minDate}
                maxDate={maxDate}
                locale={locale}
                isClearable={false}
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
ModalDateRangePicker.displayName = 'ModalDateRangePicker';

export default ModalDateRangePicker;
