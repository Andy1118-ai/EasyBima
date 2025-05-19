import React, { useState, useCallback, memo, useRef, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './Calendar.css';
import { formatDate, createTZDate, getLocalTimeZone } from '../../utils/dateUtils';

/**
 * Enhanced Calendar component with accessibility features and performance optimizations
 */
const Calendar = memo(({
  selectedDate,
  onChange,
  placeholderText = "Select date",
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
  label,
  minDate,
  maxDate,
  locale,
  isClearable = false,
  showMonthDropdown = true,
  showYearDropdown = true,
  dropdownMode = "select",
  ariaLabelledBy,
  ariaDescribedBy,
  onBlur,
  onFocus,
  onKeyDown,
  className = "calendar-input",
  calendarClassName = "react-calendar"
}) => {
  const inputRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const uniqueId = id || `calendar-${Math.random().toString(36).substring(2, 9)}`;
  const labelId = `${uniqueId}-label`;

  // Handle date selection with time zone support
  const handleDateChange = useCallback((date) => {
    if (typeof onChange === 'function') {
      // Convert the selected date to the specified time zone
      const tzDate = date ? createTZDate(date, timeZone) : null;
      onChange(tzDate);
    }
  }, [onChange, timeZone]);

  // Handle keyboard events for accessibility
  const handleKeyDown = useCallback((e) => {
    if (onKeyDown) {
      onKeyDown(e);
    }

    // Add keyboard navigation support
    if (e.key === 'Escape') {
      inputRef.current?.blur();
    }
  }, [onKeyDown]);

  // Handle focus events
  const handleFocus = useCallback((e) => {
    setIsFocused(true);
    if (onFocus) {
      onFocus(e);
    }
  }, [onFocus]);

  // Handle blur events
  const handleBlur = useCallback((e) => {
    setIsFocused(false);
    if (onBlur) {
      onBlur(e);
    }
  }, [onBlur]);

  // Handle clear button click
  const handleClear = useCallback(() => {
    if (typeof onChange === 'function') {
      handleDateChange(null);
    }
  }, [handleDateChange, onChange]);

  return (
    <div className="calendar-container">
      {label && (
        <label
          id={labelId}
          htmlFor={uniqueId}
          className="calendar-label"
        >
          {label}
          {required && <span className="required-indicator" aria-hidden="true"> *</span>}
        </label>
      )}
      <div className={`calendar-input-wrapper ${isFocused ? 'focused' : ''}`}>
        <DatePicker
          ref={inputRef}
          id={uniqueId}
          name={name}
          selected={selectedDate}
          onChange={handleDateChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={className}
          calendarClassName={calendarClassName}
          placeholderText={placeholderText}
          dateFormat={dateFormat}
          showTimeSelect={showTimeSelect}
          timeFormat={timeFormat}
          timeIntervals={timeIntervals}
          timeCaption={timeCaption}
          showMonthDropdown={showMonthDropdown}
          showYearDropdown={showYearDropdown}
          dropdownMode={dropdownMode}
          disabled={disabled}
          minDate={minDate}
          maxDate={maxDate}
          locale={locale}
          isClearable={isClearable}
          aria-labelledby={ariaLabelledBy || (label ? labelId : undefined)}
          aria-describedby={ariaDescribedBy}
          aria-required={required}
          aria-invalid={false}
          popperProps={{
            strategy: "fixed",
            modifiers: [
              {
                name: "preventOverflow",
                options: {
                  padding: 8,
                }
              }
            ]
          }}
          popperClassName="calendar-popper"
          showPopperArrow={false}
        />
        {isClearable && selectedDate && (
          <button
            type="button"
            className="calendar-clear-button"
            onClick={handleClear}
            aria-label="Clear date"
            tabIndex={0}
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
});

/**
 * Enhanced DateRangeCalendar component with accessibility features
 */
const DateRangeCalendar = memo(({
  startDate,
  endDate,
  onChangeStart,
  onChangeEnd,
  startLabel = "Start",
  endLabel = "End",
  showSelectedRange = false,
  timeZone = getLocalTimeZone(),
  dateFormat = "dd/MM/yyyy",
  showTimeSelect = false,
  timeFormat = "HH:mm",
  timeIntervals = 15,
  disabled = false,
  required = false,
  locale,
  isClearable = false
}) => {
  // Generate unique IDs for accessibility
  const startId = `date-range-start-${Math.random().toString(36).substring(2, 9)}`;
  const endId = `date-range-end-${Math.random().toString(36).substring(2, 9)}`;
  const rangeDescriptionId = `date-range-description-${Math.random().toString(36).substring(2, 9)}`;

  // Handle start date selection with time zone support
  const handleStartDateChange = useCallback((date) => {
    const tzDate = date ? createTZDate(date, timeZone) : null;
    onChangeStart(tzDate);
  }, [onChangeStart, timeZone]);

  // Handle end date selection with time zone support
  const handleEndDateChange = useCallback((date) => {
    const tzDate = date ? createTZDate(date, timeZone) : null;
    onChangeEnd(tzDate);
  }, [onChangeEnd, timeZone]);

  // Handle clearing the date range
  const handleClearRange = useCallback(() => {
    onChangeStart(null);
    onChangeEnd(null);
  }, [onChangeStart, onChangeEnd]);

  return (
    <div
      className="date-range-container"
      role="group"
      aria-labelledby={rangeDescriptionId}
    >
      <div id={rangeDescriptionId} className="visually-hidden">Date range selection</div>

      <div className="date-input-group">
        <Calendar
          id={startId}
          selectedDate={startDate}
          onChange={handleStartDateChange}
          label={startLabel}
          dateFormat={dateFormat}
          showTimeSelect={showTimeSelect}
          timeFormat={timeFormat}
          timeIntervals={timeIntervals}
          timeZone={timeZone}
          disabled={disabled}
          required={required}
          locale={locale}
          isClearable={isClearable}
          ariaDescribedBy={rangeDescriptionId}
        />
      </div>

      <div className="date-input-group">
        <Calendar
          id={endId}
          selectedDate={endDate}
          onChange={handleEndDateChange}
          label={endLabel}
          dateFormat={dateFormat}
          showTimeSelect={showTimeSelect}
          timeFormat={timeFormat}
          timeIntervals={timeIntervals}
          timeZone={timeZone}
          minDate={startDate}
          disabled={disabled}
          required={required}
          locale={locale}
          isClearable={isClearable}
          ariaDescribedBy={rangeDescriptionId}
        />
      </div>

      {showSelectedRange && startDate && endDate && (
        <div className="selected-range" aria-live="polite">
          Selected: {formatDate(startDate, 'PP', { timeZone })} - {formatDate(endDate, 'PP', { timeZone })}
        </div>
      )}

      {isClearable && (startDate || endDate) && (
        <button
          type="button"
          className="date-range-clear-button"
          onClick={handleClearRange}
          aria-label="Clear date range"
        >
          Clear Range
        </button>
      )}
    </div>
  );
});

/**
 * Enhanced MonthPicker component with accessibility features
 */
const MonthPicker = memo(({
  selectedDate,
  onChange,
  label = "Select Month",
  showSelectedValue = false,
  timeZone = getLocalTimeZone(),
  disabled = false,
  required = false,
  id,
  name,
  locale,
  isClearable = false
}) => {
  const uniqueId = id || `month-picker-${Math.random().toString(36).substring(2, 9)}`;
  const labelId = `${uniqueId}-label`;

  // Handle month selection with time zone support
  const handleMonthChange = useCallback((date) => {
    const tzDate = date ? createTZDate(date, timeZone) : null;
    onChange(tzDate);
  }, [onChange, timeZone]);

  // Handle clearing the selected month
  const handleClear = useCallback(() => {
    onChange(null);
  }, [onChange]);

  return (
    <div className="month-picker-container">
      {label && (
        <label id={labelId} htmlFor={uniqueId} className="month-picker-label">
          {label}
          {required && <span className="required-indicator" aria-hidden="true"> *</span>}
        </label>
      )}

      <div className="month-picker-input-wrapper">
        <DatePicker
          id={uniqueId}
          name={name}
          selected={selectedDate}
          onChange={handleMonthChange}
          className="calendar-input"
          dateFormat="MMMM yyyy"
          showMonthYearPicker
          showFullMonthYearPicker
          disabled={disabled}
          locale={locale}
          aria-labelledby={labelId}
          aria-required={required}
        />

        {isClearable && selectedDate && (
          <button
            type="button"
            className="calendar-clear-button"
            onClick={handleClear}
            aria-label="Clear month selection"
          >
            ×
          </button>
        )}
      </div>

      {showSelectedValue && selectedDate && (
        <div className="selected-month" aria-live="polite">
          {formatDate(selectedDate, 'MMMM yyyy', { timeZone })}
        </div>
      )}
    </div>
  );
});

/**
 * Time picker component
 */
const TimePicker = memo(({
  selectedTime,
  onChange,
  label = "Select Time",
  timeFormat = "HH:mm",
  timeIntervals = 15,
  timeZone = getLocalTimeZone(),
  disabled = false,
  required = false,
  id,
  name,
  minTime,
  maxTime,
  isClearable = false
}) => {
  const uniqueId = id || `time-picker-${Math.random().toString(36).substring(2, 9)}`;
  const labelId = `${uniqueId}-label`;

  // Handle time selection with time zone support
  const handleTimeChange = useCallback((time) => {
    const tzTime = time ? createTZDate(time, timeZone) : null;
    onChange(tzTime);
  }, [onChange, timeZone]);

  return (
    <div className="time-picker-container">
      {label && (
        <label id={labelId} htmlFor={uniqueId} className="time-picker-label">
          {label}
          {required && <span className="required-indicator" aria-hidden="true"> *</span>}
        </label>
      )}

      <DatePicker
        id={uniqueId}
        name={name}
        selected={selectedTime}
        onChange={handleTimeChange}
        className="time-picker-input"
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={timeIntervals}
        timeCaption="Time"
        dateFormat={timeFormat}
        timeFormat={timeFormat}
        minTime={minTime}
        maxTime={maxTime}
        disabled={disabled}
        aria-labelledby={labelId}
        aria-required={required}
      />

      {isClearable && selectedTime && (
        <button
          type="button"
          className="time-picker-clear-button"
          onClick={() => handleTimeChange(null)}
          aria-label="Clear time selection"
        >
          ×
        </button>
      )}
    </div>
  );
});

// Add display names for better debugging
Calendar.displayName = 'Calendar';
DateRangeCalendar.displayName = 'DateRangeCalendar';
MonthPicker.displayName = 'MonthPicker';
TimePicker.displayName = 'TimePicker';

export { DateRangeCalendar, MonthPicker, TimePicker };
export default Calendar;