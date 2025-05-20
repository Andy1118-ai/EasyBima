import React from 'react';
import { Calendar } from './date/Calendar';

const DateOfBirthPicker = (props) => {
  const maxDate = new Date();
  const minDate = new Date();
  minDate.setFullYear(minDate.getFullYear() - 100); // Allow dates up to 100 years ago

  return (
    <Calendar
      {...props}
      maxDate={maxDate}
      minDate={minDate}
      showYearDropdown={true}
      showMonthDropdown={true}
      dropdownMode="select"
      dateFormat="dd/MM/yyyy"
      placeholderText="Select date of birth"
    />
  );
};

export default DateOfBirthPicker; 