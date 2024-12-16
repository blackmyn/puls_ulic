import React, { useState } from 'react';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import './OrderStatus.css';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';

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

const OrderCompleted: React.FC<{ order: Order }> = ({ order }) => {
  const [feedback, setFeedback] = useState<string>(''); 
  const [successMessage, setSuccessMessage] = useState<string | null>(null); 

  const navigate = useNavigate();
  const handleFeedbackSubmit = () => {
    if (!feedback.trim()) {
      alert('Пожалуйста, введите текст отзыва.'); 
      return;
    }

    const requestData = {
      order_id: order?.order_id, 
      driver_id: order?.driver_id,
      users_id: order?.users_id,
      dispatcher_id: order?.dispatcher_id,
      tariffs_id: order?.tariffs_id,
      pickup_location: order?.pickup_location,
      dropoff_location: order?.dropoff_location,
      cost: order?.cost,
      mileage: order?.mileage,
      payment_method: order?.payment_method,
      comments: feedback, 
    };

    axios
      .post('http://localhost:5000/api/ordercompleted', requestData)
      .then(() => {
        return axios.delete(`http://localhost:5000/api/deleteuncompletedorder`, {
          data: { order_id: order?.order_id }, 
        });
      })
      .then(() => {
        navigate('/'); 
      })
      .catch((error) => {
        console.error('Ошибка при обработке запроса:', error);
        setSuccessMessage('Ошибка при отправке данных. Попробуйте снова.');
      });
  };

  const handleMainMenuSubmit = () => {
    const requestData = {
      order_id: order?.order_id, 
      driver_id: order?.driver_id,
      users_id: order?.users_id,
      dispatcher_id: order?.dispatcher_id,
      tariffs_id: order?.tariffs_id,
      pickup_location: order?.pickup_location,
      dropoff_location: order?.dropoff_location,
      cost: order?.cost,
      mileage: order?.mileage,
      payment_method: order?.payment_method,
      comments: "", 
    };

    axios
      .post('http://localhost:5000/api/ordercompleted', requestData)
      .then(() => {
        return axios.delete(`http://localhost:5000/api/deleteuncompletedorder`, {
          data: { order_id: order?.order_id }, 
        });
      })
      .then(() => {
        navigate('/'); 
      })
      .catch((error) => {
        console.error('Ошибка при обработке запроса:', error);
        setSuccessMessage('Ошибка при отправке данных. Попробуйте снова.');
      });
  };

  return (
    <div className="order-status order-completed">
      <h3>Заказ завершен!</h3>
      <div className="completed-info">
        <CheckCircleOutlineIcon className="check-icon" color="success" fontSize="large" />
        <p>Поездка успешно завершена.</p>
      </div>
      <div className="order-stats">
        <h3>Статистика поездки</h3>
        <p>
          <span className="label">Расстояние:</span> {order?.mileage} км
        </p>
        <p>
          <span className="label">Стоимость:</span> {order?.cost} руб.
        </p>
      </div>
      <div className="feedback-form">
        <h3>Оставьте отзыв</h3>
        <textarea
          placeholder="Оставьте свой отзыв..."
          rows={4}
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />
        <button className="submit-feedback-button" onClick={handleFeedbackSubmit}>
          Отправить отзыв
        </button>
        {successMessage && <p className="success-message">{successMessage}</p>}
        <button className="submit-feedback-button" onClick={handleMainMenuSubmit}>Вернуться на главную</button>
      </div>
    </div>
  );
};

export default OrderCompleted;
