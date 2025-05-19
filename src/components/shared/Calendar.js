import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './Calendar.css';

const Calendar = ({ selectedDate, onChange, placeholderText = "Select date" }) => {
  return (
    <DatePicker
      selected={selectedDate}
      onChange={onChange}
      className="calendar-input"
      placeholderText={placeholderText}
      dateFormat="dd/MM/yyyy"
      showYearDropdown
      showMonthDropdown
      dropdownMode="select"
    />
  );
};

const DateRangeCalendar = ({ startDate, endDate, onChangeStart, onChangeEnd, startLabel = "Start", endLabel = "End", showSelectedRange = false }) => {
  return (
    <div className="date-range-container">
      <div className="date-input-group">
        <label>{startLabel}</label>
        <DatePicker
          selected={startDate}
          onChange={onChangeStart}
          className="calendar-input"
          dateFormat="dd/MM/yyyy"
          showYearDropdown
          showMonthDropdown
          dropdownMode="select"
        />
      </div>
      <div className="date-input-group">
        <label>{endLabel}</label>
        <DatePicker
          selected={endDate}
          onChange={onChangeEnd}
          className="calendar-input"
          dateFormat="dd/MM/yyyy"
          showYearDropdown
          showMonthDropdown
          dropdownMode="select"
          minDate={startDate}
        />
      </div>
      {showSelectedRange && startDate && endDate && (
        <div className="selected-range">
          Selected: {startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}
        </div>
      )}
    </div>
  );
};

const MonthPicker = ({ selectedDate, onChange, label = "Select Month", showSelectedValue = false }) => {
  return (
    <div className="month-picker-container">
      {label && <label>{label}</label>}
      <DatePicker
        selected={selectedDate}
        onChange={onChange}
        className="calendar-input"
        dateFormat="MMMM yyyy"
        showMonthYearPicker
        showFullMonthYearPicker
      />
      {showSelectedValue && selectedDate && (
        <div className="selected-month">
          {selectedDate.toLocaleDateString('default', { month: 'long', year: 'numeric' })}
        </div>
      )}
    </div>
  );
};

export { DateRangeCalendar, MonthPicker };
export default Calendar; 