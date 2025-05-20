import React from 'react';
import { Calendar, DateRangeCalendar, MonthPicker, TimePicker } from './Calendar';
import withModal from './withModal';
import './Calendar.css';

/**
 * Unified DatePicker module that exports all date picker components
 * This consolidates all date picker functionality in one place
 */

// Create modal versions of each component
const ModalCalendar = withModal(Calendar, { 
  modalTitle: 'Select Date',
  className: 'modal-date-picker-dialog'
});

const ModalDateRangeCalendar = withModal(DateRangeCalendar, { 
  modalTitle: 'Select Date Range',
  className: 'modal-date-picker-dialog'
});

const ModalMonthPicker = withModal(MonthPicker, { 
  modalTitle: 'Select Month',
  className: 'modal-date-picker-dialog'
});

const ModalTimePicker = withModal(TimePicker, { 
  modalTitle: 'Select Time',
  className: 'modal-date-picker-dialog'
});

// Export all components
export {
  Calendar,
  DateRangeCalendar,
  MonthPicker,
  TimePicker,
  ModalCalendar,
  ModalDateRangeCalendar,
  ModalMonthPicker,
  ModalTimePicker
};

// For backward compatibility
export const ModalDatePicker = ModalCalendar;
export const ModalDateRangePicker = ModalDateRangeCalendar;

export default Calendar;
