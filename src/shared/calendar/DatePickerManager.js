import React, { useState } from 'react';
import './DatePickerManager.css';

const DatePickerManager = ({ onDateSelect, selectedDate, label, minDate, maxDate }) => {
  const [date, setDate] = useState(selectedDate || '');

  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setDate(newDate);
    onDateSelect(newDate);
  };

  return (
    <div className="date-picker-manager">
      {label && <label>{label}</label>}
      <input
        type="date"
        value={date}
        onChange={handleDateChange}
        min={minDate || new Date().toISOString().split('T')[0]}
        max={maxDate}
        className="date-input"
      />
    </div>
  );
};

export default DatePickerManager; 