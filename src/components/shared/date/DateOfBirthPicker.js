import React, { useCallback } from 'react';
import { ModalCalendar } from './DatePicker';
import './DatePickerManager.css';

/**
 * Date of Birth Picker component that uses a modal calendar
 * This component is specifically designed for collecting date of birth information
 */
const DateOfBirthPicker = ({
  selectedDate,
  onChange,
  placeholder = "Pick Date of Birth",
  label = "Date of Birth",
  required = false,
  name = "dateOfBirth",
  id,
  error,
  helperText,
  theme,
  disabled = false,
  maxDate = new Date(), // Default max date is today (can't be born in the future)
  minDate = new Date(1900, 0, 1), // Default min date is January 1, 1900
  dateFormat = "dd/MM/yyyy",
  locale,
  isClearable = true,
  onBlur,
  onFocus
}) => {
  // Generate unique ID for accessibility
  const uniqueId = id || `dob-picker-${Math.random().toString(36).substring(2, 9)}`;
  const errorId = error ? `${uniqueId}-error` : undefined;
  const helperId = helperText && !error ? `${uniqueId}-helper` : undefined;

  // Handle date change
  const handleDateChange = useCallback((date) => {
    if (typeof onChange === 'function') {
      onChange(date);
    }
  }, [onChange]);

  // Combine aria-describedby values
  const getAriaDescribedBy = () => {
    const ids = [];
    if (errorId) ids.push(errorId);
    if (helperId) ids.push(helperId);
    return ids.length > 0 ? ids.join(' ') : undefined;
  };

  return (
    <div className={`date-picker-manager ${theme ? `theme-${theme}` : ''}`}>
      <ModalCalendar
        id={uniqueId}
        selectedDate={selectedDate}
        onChange={handleDateChange}
        placeholder={placeholder}
        required={required}
        label={label}
        name={name}
        minDate={minDate}
        maxDate={maxDate}
        disabled={disabled}
        dateFormat={dateFormat}
        locale={locale}
        isClearable={isClearable}
        onBlur={onBlur}
        onFocus={onFocus}
        ariaDescribedBy={getAriaDescribedBy()}
        className={`date-picker-input ${error ? 'date-picker-input-error' : ''}`}
        modalTitle="Select Date of Birth"
        showMonthDropdown={true}
        showYearDropdown={true}
        dropdownMode="select"
      />

      {error && (
        <div id={errorId} className="date-picker-error" role="alert">
          {error}
        </div>
      )}

      {helperText && !error && (
        <div id={helperId} className="date-picker-helper">
          {helperText}
        </div>
      )}
    </div>
  );
};

// Add display name for better debugging
DateOfBirthPicker.displayName = 'DateOfBirthPicker';

export default DateOfBirthPicker;
