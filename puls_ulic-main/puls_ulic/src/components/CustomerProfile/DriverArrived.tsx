import React, { useState, useEffect } from 'react';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import './OrderStatus.css';

const DriverArrived: React.FC = () => {
  const [secondsRemaining, setSecondsRemaining] = useState(30); // 30 секунд по умолчанию

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prevSeconds) => Math.max(0, prevSeconds - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="order-status driver-arrived">
      <h3>Водитель прибыл!</h3>
      <div className="arrival-info">
        <CheckCircleOutlineIcon className="check-icon" color="success" fontSize="large" />
        {secondsRemaining > 0 ? (
          <p>Водитель ожидает вас: {secondsRemaining} сек.</p>
        ) : (
          <p>Водитель ожидает вас.</p>
        )}
      </div>
    </div>
  );
};

export default DriverArrived;