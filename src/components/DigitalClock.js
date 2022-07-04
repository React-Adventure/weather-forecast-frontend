import React, { useState, useEffect } from 'react';

const DigitalClock = () => {
  const [today, setToday] = useState(new Date());

  const refreshClock = () => {
    setToday(new Date());
  };

  useEffect(() => {
    const timerId = setInterval(refreshClock, 1000);

    return function cleanup() {
      clearInterval(timerId);
    };
  }, []);

  return (
    <span className="w-145">
      {today.toLocaleString()}
    </span>
  );
};
  
export default DigitalClock;