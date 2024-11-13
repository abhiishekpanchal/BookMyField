import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function Calendar({ onChange, excludedTimes = [] }) {
  const currentDate = new Date();
  const defaultDate = new Date(new Date().setHours(0, 0, 0, 0)); // Set time to 00:00:00 AM
  const maxDate = new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000); // Allow booking for up to 7 days
  const [selectedDate, setSelectedDate] = useState(defaultDate);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    onChange(date); // Trigger parent callback
  };

  return (
    <div>
      <DatePicker
        className="text-white bg-primary focus:outline-none"
        selected={selectedDate}
        onChange={handleDateChange} 
        dateFormat="MM/dd/yyyy - hh:mm a"
        minDate={currentDate}
        maxDate={maxDate}
        showTimeSelect
        timeIntervals={30}
        timeFormat="hh:mm a"
        excludeTimes={excludedTimes} // Only use the already calculated excludedTimes from Book.jsx
      />
    </div>
  );
}

export default Calendar;
