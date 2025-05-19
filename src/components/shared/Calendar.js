import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './Calendar.css';
import { formatDate, createTZDate, getLocalTimeZone } from '../../utils/dateUtils';

const Calendar = ({ selectedDate, onChange, placeholderText = "Select date", timeZone = getLocalTimeZone() }) => {
  // Handle date selection with time zone support
  const handleDateChange = (date) => {
    // Convert the selected date to the specified time zone
    const tzDate = date ? createTZDate(date, timeZone) : null;
    onChange(tzDate);
  };

  return (
    <DatePicker
      selected={selectedDate}
      onChange={handleDateChange}
      className="calendar-input"
      placeholderText={placeholderText}
      dateFormat="dd/MM/yyyy"
      showYearDropdown
      showMonthDropdown
      dropdownMode="select"
    />
  );
};

const DateRangeCalendar = ({
  startDate,
  endDate,
  onChangeStart,
  onChangeEnd,
  startLabel = "Start",
  endLabel = "End",
  showSelectedRange = false,
  timeZone = getLocalTimeZone()
}) => {
  // Handle start date selection with time zone support
  const handleStartDateChange = (date) => {
    const tzDate = date ? createTZDate(date, timeZone) : null;
    onChangeStart(tzDate);
  };

  // Handle end date selection with time zone support
  const handleEndDateChange = (date) => {
    const tzDate = date ? createTZDate(date, timeZone) : null;
    onChangeEnd(tzDate);
  };

  return (
    <div className="date-range-container">
      <div className="date-input-group">
        <label>{startLabel}</label>
        <DatePicker
          selected={startDate}
          onChange={handleStartDateChange}
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
          onChange={handleEndDateChange}
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
          Selected: {formatDate(startDate, 'PP', { timeZone: getLocalTimeZone() })} - {formatDate(endDate, 'PP', { timeZone: getLocalTimeZone() })}
        </div>
      )}
    </div>
  );
};

const MonthPicker = ({
  selectedDate,
  onChange,
  label = "Select Month",
  showSelectedValue = false,
  timeZone = getLocalTimeZone()
}) => {
  // Handle month selection with time zone support
  const handleMonthChange = (date) => {
    const tzDate = date ? createTZDate(date, timeZone) : null;
    onChange(tzDate);
  };

  return (
    <div className="month-picker-container">
      {label && <label>{label}</label>}
      <DatePicker
        selected={selectedDate}
        onChange={handleMonthChange}
        className="calendar-input"
        dateFormat="MMMM yyyy"
        showMonthYearPicker
        showFullMonthYearPicker
      />
      {showSelectedValue && selectedDate && (
        <div className="selected-month">
          {formatDate(selectedDate, 'MMMM yyyy', { timeZone: getLocalTimeZone() })}
        </div>
      )}
    </div>
  );
};

export { DateRangeCalendar, MonthPicker };
export default Calendar;