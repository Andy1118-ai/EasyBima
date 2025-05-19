import React, { useState } from 'react';
import DatePickerManager, { DateTimePickerManager } from '../shared/DatePickerManager';
import {
  Calendar,
  DateRangeCalendar,
  MonthPicker,
  TimePicker,
  ModalCalendar,
  ModalDateRangeCalendar,
  ModalMonthPicker,
  ModalTimePicker
} from '../shared/DatePicker';
import { getLocalTimeZone, formatDate } from '../../utils/dateUtils';
import { registerLocale } from 'react-datepicker';
import enGB from 'date-fns/locale/en-GB';
import es from 'date-fns/locale/es';
import fr from 'date-fns/locale/fr';
import './DatePickerExample.css';

// Register some locales for the examples
registerLocale('en-GB', enGB);
registerLocale('es', es);
registerLocale('fr', fr);

const DatePickerExample = () => {
  // State for basic date picker
  const [selectedDate, setSelectedDate] = useState(null);

  // State for date picker with time
  const [selectedDateTime, setSelectedDateTime] = useState(null);

  // State for date range
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null
  });

  // State for month picker
  const [selectedMonth, setSelectedMonth] = useState(null);

  // State for time picker
  const [selectedTime, setSelectedTime] = useState(null);

  // State for modal date picker
  const [modalDate, setModalDate] = useState(null);

  // State for modal date-time picker
  const [modalDateTime, setModalDateTime] = useState(null);

  // State for modal date range picker
  const [modalDateRange, setModalDateRange] = useState({
    startDate: null,
    endDate: null
  });

  // State for modal month picker (using HOC)
  const [modalMonth, setModalMonth] = useState(null);

  // State for locale selection
  const [locale, setLocale] = useState(null);

  // State for date format
  const [dateFormat, setDateFormat] = useState('dd/MM/yyyy');

  // State for time format
  const [timeFormat, setTimeFormat] = useState('HH:mm');

  // State for theme
  const [theme, setTheme] = useState(null);

  // Handle date range changes
  const handleStartDateChange = (date) => {
    setDateRange(prev => ({ ...prev, startDate: date }));
  };

  const handleEndDateChange = (date) => {
    setDateRange(prev => ({ ...prev, endDate: date }));
  };

  // Handle modal date range changes
  const handleModalStartDateChange = (date) => {
    setModalDateRange(prev => ({ ...prev, startDate: date }));
  };

  const handleModalEndDateChange = (date) => {
    setModalDateRange(prev => ({ ...prev, endDate: date }));
  };

  // Handle locale change
  const handleLocaleChange = (e) => {
    setLocale(e.target.value === 'default' ? null : e.target.value);
  };

  // Handle date format change
  const handleDateFormatChange = (e) => {
    setDateFormat(e.target.value);
  };

  // Handle time format change
  const handleTimeFormatChange = (e) => {
    setTimeFormat(e.target.value);
  };

  // Handle theme change
  const handleThemeChange = (e) => {
    setTheme(e.target.value === 'default' ? null : e.target.value);
  };

  return (
    <div className="date-picker-examples">
      <h1>Date Picker Examples</h1>

      <div className="example-controls">
        <div className="control-group">
          <label htmlFor="locale-select">Locale:</label>
          <select id="locale-select" value={locale || 'default'} onChange={handleLocaleChange}>
            <option value="default">Default</option>
            <option value="en-GB">English (UK)</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
          </select>
        </div>

        <div className="control-group">
          <label htmlFor="format-select">Date Format:</label>
          <select id="format-select" value={dateFormat} onChange={handleDateFormatChange}>
            <option value="dd/MM/yyyy">dd/MM/yyyy</option>
            <option value="MM/dd/yyyy">MM/dd/yyyy</option>
            <option value="yyyy-MM-dd">yyyy-MM-dd</option>
            <option value="MMMM d, yyyy">MMMM d, yyyy</option>
            <option value="d MMMM yyyy">d MMMM yyyy</option>
          </select>
        </div>

        <div className="control-group">
          <label htmlFor="time-format-select">Time Format:</label>
          <select id="time-format-select" value={timeFormat} onChange={handleTimeFormatChange}>
            <option value="HH:mm">24-hour (HH:mm)</option>
            <option value="hh:mm a">12-hour (hh:mm AM/PM)</option>
          </select>
        </div>

        <div className="control-group">
          <label htmlFor="theme-select">Theme:</label>
          <select id="theme-select" value={theme || 'default'} onChange={handleThemeChange}>
            <option value="default">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
      </div>

      <div className={`examples-container ${theme ? `theme-${theme}` : ''}`}>
        <section className="example-section">
          <h2>Basic Date Picker</h2>
          <DatePickerManager
            selectedDate={selectedDate}
            onChange={setSelectedDate}
            placeholder="Select a date"
            label="Date"
            required={true}
            dateFormat={dateFormat}
            locale={locale}
            theme={theme}
            isClearable={true}
            helperText="Click to select a date"
          />
          {selectedDate && (
            <div className="selected-value">
              Selected: {formatDate(selectedDate, 'MMMM d, yyyy', { timeZone: getLocalTimeZone() })}
            </div>
          )}
        </section>

        <section className="example-section">
          <h2>Date & Time Picker</h2>
          <DateTimePickerManager
            selectedDateTime={selectedDateTime}
            onChange={(date) => setSelectedDateTime(date)}
            dateLabel="Date"
            timeLabel="Time"
            datePlaceholder="Select date"
            required={false}
            dateFormat={dateFormat}
            timeFormat={timeFormat}
            timeIntervals={15}
            locale={locale}
            theme={theme}
            isClearable={true}
          />
          {selectedDateTime && (
            <div className="selected-value">
              Selected: {formatDate(selectedDateTime, 'MMMM d, yyyy HH:mm', { timeZone: getLocalTimeZone() })}
            </div>
          )}
        </section>

        <section className="example-section">
          <h2>Date Range Picker</h2>
          <DateRangeCalendar
            startDate={dateRange.startDate}
            endDate={dateRange.endDate}
            onChangeStart={handleStartDateChange}
            onChangeEnd={handleEndDateChange}
            startLabel="Start Date"
            endLabel="End Date"
            showSelectedRange={true}
            dateFormat={dateFormat}
            locale={locale}
            isClearable={true}
          />
        </section>

        <section className="example-section">
          <h2>Month Picker</h2>
          <MonthPicker
            selectedDate={selectedMonth}
            onChange={setSelectedMonth}
            label="Select Month"
            showSelectedValue={true}
            locale={locale}
            isClearable={true}
          />
        </section>

        <section className="example-section">
          <h2>Time Picker</h2>
          <TimePicker
            selectedTime={selectedTime}
            onChange={setSelectedTime}
            label="Select Time"
            timeFormat="HH:mm"
            timeIntervals={15}
            locale={locale}
            isClearable={true}
          />
          {selectedTime && (
            <div className="selected-value">
              Selected Time: {formatDate(selectedTime, 'HH:mm', { timeZone: getLocalTimeZone() })}
            </div>
          )}
        </section>

        <section className="example-section">
          <h2>Modal Date Picker</h2>
          <p className="section-description">
            This date picker appears in a modal dialog in the center of the screen when clicked.
          </p>
          <ModalCalendar
            selectedDate={modalDate}
            onChange={setModalDate}
            label="Select Date (Modal)"
            placeholder="Click to select a date"
            dateFormat={dateFormat}
            locale={locale}
            theme={theme}
            isClearable={true}
            modalTitle="Select a Date"
          />
          {modalDate && (
            <div className="selected-value">
              Selected: {formatDate(modalDate, 'MMMM d, yyyy', { timeZone: getLocalTimeZone() })}
            </div>
          )}
        </section>

        <section className="example-section">
          <h2>Modal Date & Time Picker</h2>
          <p className="section-description">
            This date & time picker appears in a modal dialog with time selection.
          </p>
          <ModalCalendar
            selectedDate={modalDateTime}
            onChange={setModalDateTime}
            label="Select Date & Time (Modal)"
            placeholder="Click to select date & time"
            dateFormat={`${dateFormat} ${timeFormat}`}
            showTimeSelect={true}
            timeFormat="HH:mm"
            timeIntervals={15}
            locale={locale}
            theme={theme}
            isClearable={true}
            modalTitle="Select Date & Time"
          />
          {modalDateTime && (
            <div className="selected-value">
              Selected: {formatDate(modalDateTime, 'MMMM d, yyyy HH:mm', { timeZone: getLocalTimeZone() })}
            </div>
          )}
        </section>

        <section className="example-section">
          <h2>Modal Date Range Picker</h2>
          <p className="section-description">
            This date range picker appears in a modal dialog in the center of the screen.
          </p>
          <ModalDateRangeCalendar
            startDate={modalDateRange.startDate}
            endDate={modalDateRange.endDate}
            onChangeStart={handleModalStartDateChange}
            onChangeEnd={handleModalEndDateChange}
            label="Select Date Range (Modal)"
            placeholder="Click to select date range"
            startLabel="Start Date"
            endLabel="End Date"
            dateFormat={dateFormat}
            locale={locale}
            theme={theme}
            isClearable={true}
            modalTitle="Select Date Range"
          />
          {(modalDateRange.startDate || modalDateRange.endDate) && (
            <div className="selected-value">
              Selected Range:
              {modalDateRange.startDate ? formatDate(modalDateRange.startDate, 'MMMM d, yyyy', { timeZone: getLocalTimeZone() }) : 'None'}
              {' - '}
              {modalDateRange.endDate ? formatDate(modalDateRange.endDate, 'MMMM d, yyyy', { timeZone: getLocalTimeZone() }) : 'None'}
            </div>
          )}
        </section>

        <section className="example-section">
          <h2>Modal Month Picker (using HOC)</h2>
          <p className="section-description">
            This month picker uses the withModal HOC to create a modal version of the MonthPicker component.
          </p>
          <ModalMonthPicker
            selectedDate={modalMonth}
            onChange={setModalMonth}
            label="Select Month (Modal HOC)"
            placeholder="Click to select month"
            showSelectedValue={false}
            locale={locale}
            theme={theme}
            isClearable={true}
          />
          {modalMonth && (
            <div className="selected-value">
              Selected Month: {formatDate(modalMonth, 'MMMM yyyy', { timeZone: getLocalTimeZone() })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default DatePickerExample;
