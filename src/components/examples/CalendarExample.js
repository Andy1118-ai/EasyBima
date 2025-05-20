import React, { useState } from 'react';
import { Calendar } from '../shared/date/DatePicker';
import { formatDate, getLocalTimeZone } from '../../utils/dateUtils';

const CalendarExample = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="calendar-example">
      <h2>Calendar Example</h2>
      <Calendar
        selectedDate={selectedDate}
        onChange={handleDateChange}
        placeholderText="Select a date"
      />
      {selectedDate && (
        <p>Selected date: {formatDate(selectedDate, 'MMMM d, yyyy', { timeZone: getLocalTimeZone() })}</p>
      )}
    </div>
  );
};

export default CalendarExample;