import React, { useState, useEffect } from 'react';
import WaitingForDriver from './WaitingForDriver';
import DriverFound from './DriverFound';
import DriverArrived from './DriverArrived';
import OrderCompleted from './OrderCompleted';
import './OrderStatus.css';

const OrderStatusContainer: React.FC = () => {
  const [orderStatus, setOrderStatus] = useState<'Поиск машины' | 'Водитель найден' | 'Водитель прибыл' | 'Заказ завершен'>('Поиск машины');
  const [driver, setDriver] = useState<Driver | null>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const updateStatus = () => {
      switch (orderStatus) {
        case 'Поиск машины':
          timer = setTimeout(() => {
            setOrderStatus('Водитель найден');
            setDriver({
              name: 'Иван Иванов',
              car: 'Hyundai Solaris, серый',
              plate: 'A123BC 199',
              rating: 4.8,
              photo:
                'https://media.istockphoto.com/id/978258506/photo/crowdsourced-taxi-driver-in-england.jpg?s=612x612&w=0&k=20&c=iLre7SExG3h26-KZiww1PX_73rqYgjBZc8dCR1Ev7VU=',
              phone: '+7 (999) 123-45-67',
            });
          }, 15000);
          break;
        case 'Водитель найден':
          timer = setTimeout(() => {
            setOrderStatus('Водитель прибыл');
          }, 15000);
          break;
        case 'Водитель прибыл':
          timer = setTimeout(() => {
            setOrderStatus('Заказ завершен');
          }, 15000);
          break;
        default:
          clearTimeout(timer); // Очищаем таймер, если статус уже завершен
      }
    };

    updateStatus();

      return () => clearTimeout(timer);
  }, [orderStatus]);

  let statusComponent;
  switch (orderStatus) {
    case 'Поиск машины':
      statusComponent = <WaitingForDriver />;
      break;
    case 'Водитель найден':
      statusComponent = <DriverFound driver={driver!} />;
      break;
    case 'Водитель прибыл':
      statusComponent = <DriverArrived />;
      break;
    case 'Заказ завершен':
      statusComponent = <OrderCompleted />;
      break;
    default:
      statusComponent = <p>Неизвестный статус</p>;
  }

  return (
    <div className="order-status-container">
        {statusComponent}
    </div>
  );
};

export default OrderStatusContainer;