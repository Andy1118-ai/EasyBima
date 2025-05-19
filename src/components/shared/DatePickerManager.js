import React from 'react';
import Calendar from './Calendar';
import './DatePickerManager.css';

const DatePickerManager = ({
  selectedDate,
  onChange,
  placeholder,
  required,
  label,
  name,
  minDate,
  maxDate,
  theme,
  disabled,
  error,
  helperText
}) => {
  return (
    <div className="date-picker-manager">
      <Calendar
        selectedDate={selectedDate}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        label={label}
        name={name}
        minDate={minDate}
        maxDate={maxDate}
        theme={theme}
        disabled={disabled}
      />
      {error && <div className="date-picker-error">{error}</div>}
      {helperText && !error && <div className="date-picker-helper">{helperText}</div>}
    </div>
  );
};

export default DatePickerManager; 