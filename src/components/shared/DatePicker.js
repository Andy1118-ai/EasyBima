import React, { memo } from 'react';
import Calendar, { DateRangeCalendar, MonthPicker, TimePicker } from './Calendar';
import withModal from './withModal';
import './DatePicker.css';

/**
 * Unified DatePicker module that exports all date picker components
 * This consolidates all date picker functionality in one place
 */

// Export the base components
export { Calendar, DateRangeCalendar, MonthPicker, TimePicker };

// Create modal versions of each component using the withModal HOC
const ModalCalendar = withModal(Calendar, { modalTitle: 'Select Date' });
const ModalDateRangeCalendar = withModal(DateRangeCalendar, { modalTitle: 'Select Date Range' });
const ModalMonthPicker = withModal(MonthPicker, { modalTitle: 'Select Month' });
const ModalTimePicker = withModal(TimePicker, { modalTitle: 'Select Time' });

// Export the modal components
export {
  ModalCalendar,
  ModalDateRangeCalendar,
  ModalMonthPicker,
  ModalTimePicker
};

// For backward compatibility, provide the same names as the original components
const ModalDatePicker = ModalCalendar;
const ModalDateRangePicker = ModalDateRangeCalendar;

export {
  ModalDatePicker,
  ModalDateRangePicker
};

// Default export for convenience
export default Calendar;
