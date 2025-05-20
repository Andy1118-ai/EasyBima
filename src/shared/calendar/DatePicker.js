import React, { useState } from 'react';
import './DatePicker.css';

export const DateRangeCalendar = ({ onStartDateChange, onEndDateChange, startDate, endDate }) => {
  const [selectedStartDate, setSelectedStartDate] = useState(startDate || null);
  const [selectedEndDate, setSelectedEndDate] = useState(endDate || null);

  const handleStartDateChange = (e) => {
    const date = e.target.value;
    setSelectedStartDate(date);
    onStartDateChange(date);
  };

  const handleEndDateChange = (e) => {
    const date = e.target.value;
    setSelectedEndDate(date);
    onEndDateChange(date);
  };

  return (
    <div className="date-range-calendar">
      <div className="date-input-group">
        <label>Start Date</label>
        <input
          type="date"
          value={selectedStartDate || ''}
          onChange={handleStartDateChange}
          min={new Date().toISOString().split('T')[0]}
        />
      </div>
      <div className="date-input-group">
        <label>End Date</label>
        <input
          type="date"
          value={selectedEndDate || ''}
          onChange={handleEndDateChange}
          min={selectedStartDate || new Date().toISOString().split('T')[0]}
        />
      </div>
    </div>
  );
};

export const MonthPicker = ({ onMonthChange, selectedMonth }) => {
  const [month, setMonth] = useState(selectedMonth || '');

  const handleMonthChange = (e) => {
    const selectedMonth = e.target.value;
    setMonth(selectedMonth);
    onMonthChange(selectedMonth);
  };

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="month-picker">
      <label>Select Month</label>
      <select value={month} onChange={handleMonthChange}>
        <option value="">Select a month</option>
        {months.map((monthName, index) => (
          <option key={index} value={index + 1}>
            {monthName}
          </option>
        ))}
      </select>
    </div>
  );
}; 