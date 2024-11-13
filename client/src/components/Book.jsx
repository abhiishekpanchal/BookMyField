import React, { useState, useEffect } from 'react';
import Calendar from './Calender.jsx'; 
import { errorHandler } from '../../../server/utils/error';
import { response } from 'express';

function Book() {
  const [duration, setDuration] = useState(60); 
  const [totalAmount, setTotalAmount] = useState(1200);
  const [value, setValue] = useState('');
  const [dateTime, setDateTime] = useState({ date: '', time: '' });
  const [bookedSlots, setBookedSlots] = useState([]);
  const [excludedTimes, setExcludedTimes] = useState([]);
  const [maxDuration, setMaxDuration] = useState(120); 

  const amount = totalAmount;
  const currency = "INR";
  const receipt = "";

  const calculateTotalAmount = (duration) => {
    const pricePerHour = 1200;
    const totalHours = duration / 60;
    const totalAmount = totalHours * pricePerHour;
    setTotalAmount(totalAmount);
  };

  const handleDurationChange = (e) => {
    const newDuration = parseInt(e.target.value, 10);

    if (newDuration <= maxDuration) {
      setDuration(newDuration);
      calculateTotalAmount(newDuration);
    }
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleDateTimeChange = (value) => {
    const hrs = value.getHours();
    const mins = value.getMinutes();

    const hours = hrs < 10 ? `0${hrs}` : `${hrs}`;
    const minutes = mins < 10 ? `0${mins}` : `${mins}`;

    setDateTime({ date: value, time: `${hours}:${minutes}` });

    calculateMaxDuration(value);
    updateExcludedTimes(value);
  };

  const convertToIST = (date) => {
    const istOffset = 5.5 * 60; // IST is UTC+5:30
    const localTime = date.getTime();
    const istTime = localTime + (istOffset * 60 * 1000);
    return new Date(istTime);
  };

  const calculateMaxDuration = (selectedDateTime) => {
    const selectedDate = convertToIST(new Date(selectedDateTime));
    const selectedTime = selectedDate.getTime();

    let nextBookedTime = null;

    // Find the next booked slot after the selected time for the specific date
    for (const slot of bookedSlots) {
      const slotDate = convertToIST(new Date(slot.date));
      const [slotHours, slotMinutes] = slot.time.split(':');
      slotDate.setHours(parseInt(slotHours, 10));
      slotDate.setMinutes(parseInt(slotMinutes, 10));

      // If the booked slot is after the selected time and on the same date, use it to calculate max duration
      if (slotDate.toDateString() === selectedDate.toDateString()) {
        const slotStartTime = slotDate.getTime();
        if (slotStartTime > selectedTime) {
          nextBookedTime = slotStartTime;
          break;
        }
      }
    }

    if (nextBookedTime) {
      // Calculate the difference between the selected time and the next booked slot
      const availableDuration = (nextBookedTime - selectedTime) / (1000 * 60); // Convert to minutes
      setMaxDuration(Math.max(availableDuration, 60)); // Minimum booking is 60 mins
    } else {
      // If no upcoming booking, allow a longer max duration
      setMaxDuration(240); // Allow up to 4 hours
    }
  };

  const updateExcludedTimes = (selectedDateTime) => {
    const selectedDate = convertToIST(new Date(selectedDateTime));
    const newExcludedTimes = [];

    // Filter booked slots for the selected date
    const filteredBookedSlots = bookedSlots.filter(slot => {
      const slotDate = convertToIST(new Date(slot.date));
      return slotDate.toDateString() === selectedDate.toDateString();
    });

    filteredBookedSlots.forEach(slot => {
      const [hours, minutes] = slot.time.split(':');
      const bookedDate = convertToIST(new Date(slot.date));
      bookedDate.setHours(hours);
      bookedDate.setMinutes(minutes);

      // Calculate the times to exclude based on duration and 30 minutes buffer
      const timesToExclude = getExcludedTimes(bookedDate, slot.duration);
      newExcludedTimes.push(...timesToExclude);
    });

    setExcludedTimes(newExcludedTimes);
  };

  const getExcludedTimes = (startDate, duration) => {
    const timesToExclude = [];

    // Buffer of 30 minutes before the booked time
    const bufferTime = new Date(startDate);
    bufferTime.setMinutes(bufferTime.getMinutes() - 30);

    // Add all times in the range [bufferTime, startDate + duration], but not including the last time slot
    let currentTime = bufferTime;
    const endTime = new Date(startDate);
    endTime.setMinutes(endTime.getMinutes() + parseInt(duration, 10));

    while (currentTime < endTime) {
      timesToExclude.push(new Date(currentTime));
      currentTime.setMinutes(currentTime.getMinutes() + 30);
    }

    return timesToExclude;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { date, time } = dateTime;
      const name = document.getElementById('name').value;
      const phone = document.getElementById('number').value;

      if (!name || !phone || !date || !time) {
        throw new Error('Please fill in all fields');
      }

      const istDate = convertToIST(new Date(date));

      const formData = {
        name,
        phone: Number(phone),
        date: istDate,
        time,
        duration,
        totalAmount,
      };

      const res = await fetch('/server/booking/book', {
        method: 'POST',
        mode: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error(errorHandler(res.status, res.statusText));
      }

      const data = await res.json();

      // Add the newly booked slot to excludedTimes dynamically, with buffer and duration in mind
      const bookedDate = convertToIST(new Date(date));
      const [hours, minutes] = time.split(':');
      bookedDate.setHours(hours);
      bookedDate.setMinutes(minutes);

      // Calculate the times to exclude based on duration and 30 minutes buffer
      const newExcludedTimes = getExcludedTimes(bookedDate, duration);

      // Update excludedTimes without refreshing
      setExcludedTimes((prevExcludedTimes) => [...prevExcludedTimes, ...newExcludedTimes]);

      setValue('');
      setDateTime({ date: '', time: '' });
      setDuration(60);
      setTotalAmount(1200);
      document.getElementById('name').value = '';
      document.getElementById('number').value = '';

      alert('Booking successful!');
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  const paymentHandler = async (e) => {
    const paymentRes = await fetch('/server/payment/pay', {
      method: 'POST',
      mode: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: totalAmount,
          currency,
          receipt: receiptId,
        }),
    })

    const order = await paymentRes.json();
    console.log(order);

    var options = {
        "key": "YOUR_KEY_ID", // Enter the Key ID generated from the Dashboard
        amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency,
        "name": "Acme Corp",
        "description": "Test Transaction",
        "image": "https://example.com/your_logo",
        "order_id": order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        handler: async function (response) {
          const body = {
            ...response,
          };

          const validateResponse = await fetch('/server/payment/validatePayment', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
              'Content-Type': 'application/json',
            },
          });

          const jsonRes = await validateResponse.json();
          console.log(jsonRes);
        },
        "callback_url": "https://eneqd3r9zrjok.x.pipedream.net/",
        "prefill": {
            "name": "Gaurav Kumar",
            "email": "gaurav.kumar@example.com",
            "contact": "9000090000"
        },
        "notes": {
            "address": "Razorpay Corporate Office"
        },
        "theme": {
            "color": "#3399cc"
        }
    };

    var rzp1 = new window.Razorpay(options);
    document.getElementById('rzp-button1').onclick = function(e){
        rzp1.open();
        e.preventDefault();
    }
  };

  // Fetch booked slots and initialize excluded times
  useEffect(() => {
    const fetchBookedSlots = async () => {
      try {
        const response = await fetch('/server/booked/bookedDetails');
        const data = await response.json();
        setBookedSlots(data.data);

        // Get today's date
        const today = convertToIST(new Date());
        const todayDateString = today.toDateString();

        // Filter booked slots for today's date
        const todayBookedSlots = data.data.filter(slot => {
          const slotDate = convertToIST(new Date(slot.date));
          return slotDate.toDateString() === todayDateString;
        });

        // Initialize excluded times for today only
        const allExcludedTimes = [];
        todayBookedSlots.forEach(slot => {
          const [hours, minutes] = slot.time.split(':');
          const bookedDate = convertToIST(new Date(slot.date));
          bookedDate.setHours(hours);
          bookedDate.setMinutes(minutes);

          const timesToExclude = getExcludedTimes(bookedDate, slot.duration);
          allExcludedTimes.push(...timesToExclude);
        });

        setExcludedTimes(allExcludedTimes);
      } catch (error) {
        console.error('Error fetching booked slots:', error);
      }
    };

    fetchBookedSlots();
  }, []);


  return (
    <div className='shadow-2xl shadow-tertiary rounded-lg w-[90%] sm:w-[80%] md:w-[60%] lg:w-[40%] bg-primary mx-auto'>
      <form onSubmit={handleSubmit} method="post" className='px-6 sm:px-10 pt-10 flex flex-col gap-8'>
        <div className='flex flex-col sm:flex-row justify-start gap-4'>
          <input
            onChange={handleChange}
            className='bg-primary text-white focus:outline-none focus:ring-0 w-full sm:w-[45%]'
            autoComplete='off'
            type="text"
            placeholder="Enter your name"
            id="name"
          />
          <input
            onChange={handleChange}
            className='bg-primary text-white focus:outline-none focus:ring-0 w-full sm:w-[45%]'
            autoComplete='off'
            type="tel"
            max={10}
            placeholder="Contact number"
            id="number"
          />
        </div>
        <div className='flex flex-col sm:flex-row justify-start gap-4'>
          <label className='text-gray-400' htmlFor="date">Select a Date & Time</label>
          <Calendar onChange={handleDateTimeChange} excludedTimes={excludedTimes} />
        </div>
        <div className='flex flex-col sm:flex-row justify-start gap-4'>
          <div className='text-gray-400'>Duration of Booking (in mins)</div>
          <input
            className='bg-primary text-white focus:outline-none focus:ring-0'
            type="number"
            placeholder='60'
            id="duration"
            min={60}
            step={30}
            value={duration}
            onChange={handleDurationChange}
          />
        </div>
        <div className='flex flex-col sm:flex-row justify-start gap-4'>
          <div className='text-gray-400'>Total Amount</div>
          <div className='text-white'>Rs.{totalAmount}</div>
        </div>
        <button onClick={paymentHandler} className='bg-tertiary text-xl font-bold rounded-lg w-auto p-2 hover:opacity-95'>PAY AND BOOK</button>
      </form>
      <h1 className='text-gray-600 text-xs px-6 sm:px-10 p-2 pb-8'>Amount once paid, cannot be refunded*</h1>
    </div>
  );
}

export default Book;
