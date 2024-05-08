import { useState, useEffect } from 'react';

function DateAndTime() {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDateTime(new Date());
    }, 1000); 

    return () => clearInterval(intervalId); 
  }, []);

  const formattedDate = dateTime.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const formattedTime = dateTime.toLocaleTimeString('en-US', {
    second: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  return (
    <div className='date-time-component'>
      <p>{formattedDate}</p>
      <p>{formattedTime}</p>
    </div>
  );
}

export default DateAndTime;