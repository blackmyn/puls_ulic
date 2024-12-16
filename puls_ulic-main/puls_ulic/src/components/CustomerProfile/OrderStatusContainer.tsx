import React, { useState, useEffect } from 'react';
import WaitingForDriver from './WaitingForDriver';
import DriverFound from './DriverFound';
import DriverArrived from './DriverArrived';
import OrderCompleted from './OrderCompleted';
import './OrderStatus.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';

type Driver = {
  name: string;
  car: string;
  rating: number;
  photo: string;
  phone: string;
} | null;

type Order = {
  order_id: number;
  driver_id: number;
  users_id: number;
  dispatcher_id: number;
  tariffs_id: number;
  pickup_location: string;
  dropoff_location: string;
  cost: number;
  mileage: number;
  payment_method: string;
} | null;

const OrderStatusContainer: React.FC = () => {
const { orderId } = useParams<{ orderId: string }>();
const [orderStatus, setOrderStatus] = useState<
  'Поиск машины' | 'Водитель найден' | 'Водитель прибыл' | 'Заказ завершен'
>('Поиск машины');
const [driver, setDriver] = useState<Driver | null>(null);
const [order, setOrder] = useState<Order | null>(null);

useEffect(() => {
  let timer: ReturnType<typeof setTimeout>;

  
  if (orderStatus === 'Поиск машины') {
    timer = setTimeout(() => {
      axios
        .get("http://localhost:5000/api/drivers")
        .then((response) => {
          if (response.data) {
            setDriver(response.data);
            
            const driverId = response.data.driver_id;
            axios.put(`http://localhost:5000/api/orders/edituncompletedorders/${orderId}`, {
              drivers_id: driverId
            })
            .then((putResponse) => {
              console.log("Статус заказа обновлен:", putResponse.data);
            })
            .catch((putError) => {
              console.error("Ошибка при обновлении статуса заказа:", putError.response ? putError.response.data : putError.message);
            });
          } else {
            console.error("Данные о водителе отсутствуют");
          }
          setOrderStatus("Водитель найден");
        })
        .catch((error) => {
          console.error("Ошибка при загрузке данных о водителе:", error);
          setOrderStatus("Поиск машины");
        });
    }, 5000);
  } else if (orderStatus === 'Водитель найден') {
    timer = setTimeout(() => {
      setOrderStatus('Водитель прибыл');
    }, 15000);
  } else if (orderStatus === 'Водитель прибыл') {
    timer = setTimeout(() => {
      axios
        .get(`http://localhost:5000/api/foundorder/${orderId}`)
        .then((response) => {
          setOrder(response.data);
        })
      .catch((error) => {
        console.error("Error fetching order:", error);
      });
    
      setOrderStatus('Заказ завершен');
    }, 15000);
  }

  return () => clearTimeout(timer);
}, [orderStatus, orderId]); 
 

    const renderStatusComponent = () => {
      switch (orderStatus) {
        case 'Поиск машины':
          return <WaitingForDriver />;
        case 'Водитель найден':
          if (!driver) return <p>Загрузка данных о водителе...</p>;
          return <DriverFound driver={driver} />;
        case 'Водитель прибыл':
          return <DriverArrived />;
        case 'Заказ завершен':
          return order ? <OrderCompleted order={order} /> : <p>Загрузка данных о заказе...</p>;
        default:
          return <p>Ошибка: статус заказа не распознан.</p>;
      }
    };


  return <div className="order-status-container">{renderStatusComponent()}</div>;
};

export default OrderStatusContainer;
