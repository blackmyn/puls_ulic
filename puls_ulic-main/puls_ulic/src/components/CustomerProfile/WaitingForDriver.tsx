import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import './OrderStatus.css';

const WaitingForDriver: React.FC = () => {
  return (
    <div className="order-status waiting-for-driver">
      <h3>Ожидание водителя</h3>
      <div className="progress-container">
        <CircularProgress size={60} thickness={4} color="primary" />
      </div>
      <p>Ищем ближайшего водителя...</p>
    </div>
  );
};

export default WaitingForDriver;