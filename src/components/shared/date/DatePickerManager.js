import React, { memo, useCallback } from 'react';
import Calendar, { TimePicker } from './Calendar';
import './DatePickerManager.css';
import { getLocalTimeZone } from '../../../utils/dateUtils';

/**
 * Enhanced DatePickerManager component with accessibility features and performance optimizations
 */
const DatePickerManager = memo(({
  selectedDate,
  onChange,
  placeholder,
  required = false,
  label,
  name,
  id,
  minDate,
  maxDate,
  theme,
  disabled = false,
  error,
  helperText,
  timeZone = getLocalTimeZone(),
  dateFormat = "dd/MM/yyyy",
  locale,
  isClearable = false,
  onBlur,
  onFocus
}) => {
  // Generate unique ID for accessibility
  const uniqueId = id || `date-picker-${Math.random().toString(36).substring(2, 9)}`;
  const errorId = error ? `${uniqueId}-error` : undefined;
  const helperId = helperText && !error ? `${uniqueId}-helper` : undefined;

  // Combine aria-describedby values
  const getAriaDescribedBy = () => {
    const ids = [];
    if (errorId) ids.push(errorId);
    if (helperId) ids.push(helperId);
    return ids.length > 0 ? ids.join(' ') : undefined;
  };

  // Handle date change
  const handleDateChange = useCallback((date) => {
    if (typeof onChange === 'function') {
      onChange(date);
    }
  }, [onChange]);

  return (
    <div className={`date-picker-manager ${theme ? `theme-${theme}` : ''}`}>
      <Calendar
        id={uniqueId}
        selectedDate={selectedDate}
        onChange={handleDateChange}
        placeholderText={placeholder}
        required={required}
        label={label}
        name={name}
        minDate={minDate}
        maxDate={maxDate}
        disabled={disabled}
        timeZone={timeZone}
        dateFormat={dateFormat}
        locale={locale}
        isClearable={isClearable}
        onBlur={onBlur}
        onFocus={onFocus}
        ariaDescribedBy={getAriaDescribedBy()}
        className={`date-picker-input ${error ? 'date-picker-input-error' : ''}`}
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
});

/**
 * DateTimePickerManager component that combines date and time selection
 */
const DateTimePickerManager = memo(({
  selectedDateTime,
  onChange,
  dateLabel = "Date",
  timeLabel = "Time",
  datePlaceholder = "Select date",
  required = false,
  name,
  id,
  minDate,
  maxDate,
  minTime,
  maxTime,
  theme,
  disabled = false,
  error,
  helperText,
  timeZone = getLocalTimeZone(),
  dateFormat = "dd/MM/yyyy",
  timeFormat = "HH:mm",
  timeIntervals = 15,
  locale,
  isClearable = false
}) => {
  // Generate unique IDs for accessibility
  const uniqueId = id || `datetime-picker-${Math.random().toString(36).substring(2, 9)}`;
  const dateId = `${uniqueId}-date`;
  const timeId = `${uniqueId}-time`;
  const groupLabelId = `${uniqueId}-group-label`;
  const errorId = error ? `${uniqueId}-error` : undefined;
  const helperId = helperText && !error ? `${uniqueId}-helper` : undefined;

  // Handle date change
  const handleDateChange = useCallback((date) => {
    if (!date) {
      onChange(null);
      return;
    }

    // Preserve time if there's an existing selection
    if (selectedDateTime) {
      const newDate = new Date(date);
      newDate.setHours(
        selectedDateTime.getHours(),
        selectedDateTime.getMinutes(),
        selectedDateTime.getSeconds(),
        selectedDateTime.getMilliseconds()
      );
      onChange(newDate);
    } else {
      onChange(date);
    }
  }, [onChange, selectedDateTime]);

  // Handle time change
  const handleTimeChange = useCallback((time) => {
    if (!time) {
      // If time is cleared but we have a date, keep the date part only
      if (selectedDateTime) {
        const dateOnly = new Date(selectedDateTime);
        dateOnly.setHours(0, 0, 0, 0);
        onChange(dateOnly);
      } else {
        onChange(null);
      }
      return;
    }

    // If we have a selected date, combine date and time
    if (selectedDateTime) {
      const newDateTime = new Date(selectedDateTime);
      newDateTime.setHours(
        time.getHours(),
        time.getMinutes(),
        time.getSeconds(),
        time.getMilliseconds()
      );
      onChange(newDateTime);
    } else {
      // If no date is selected, use today's date with the selected time
      const today = new Date();
      today.setHours(
        time.getHours(),
        time.getMinutes(),
        time.getSeconds(),
        time.getMilliseconds()
      );
      onChange(today);
    }
  }, [onChange, selectedDateTime]);

  return (
    <div
      className={`datetime-picker-manager ${theme ? `theme-${theme}` : ''}`}
      role="group"
      aria-labelledby={groupLabelId}
    >
      <div id={groupLabelId} className="visually-hidden">Date and time selection</div>

      <div className="datetime-picker-fields">
        <div className="date-field">
          <Calendar
            id={dateId}
            selectedDate={selectedDateTime}
            onChange={handleDateChange}
            placeholderText={datePlaceholder}
            required={required}
            label={dateLabel}
            name={`${name}-date`}
            minDate={minDate}
            maxDate={maxDate}
            disabled={disabled}
            timeZone={timeZone}
            dateFormat={dateFormat}
            locale={locale}
            isClearable={isClearable}
            ariaDescribedBy={`${groupLabelId} ${errorId || ''} ${helperId || ''}`}
            className={`date-picker-input ${error ? 'date-picker-input-error' : ''}`}
          />
        </div>

        <div className="time-field">
          <TimePicker
            id={timeId}
            selectedTime={selectedDateTime}
            onChange={handleTimeChange}
            label={timeLabel}
            timeFormat={timeFormat}
            timeIntervals={timeIntervals}
            timeZone={timeZone}
            disabled={disabled}
            required={required}
            minTime={minTime}
            maxTime={maxTime}
            isClearable={isClearable}
            locale={locale}
          />
        </div>
      </div>

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
});

// Add display names for better debugging
DatePickerManager.displayName = 'DatePickerManager';
DateTimePickerManager.displayName = 'DateTimePickerManager';

export { DateTimePickerManager };
export default DatePickerManager;