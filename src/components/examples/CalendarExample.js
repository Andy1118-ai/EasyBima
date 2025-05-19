import React, { useState } from 'react';
import Calendar from '../shared/Calendar';

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
        <p>Selected date: {selectedDate.toLocaleDateString()}</p>
      )}
    </div>
  );
};

export default CalendarExample; 