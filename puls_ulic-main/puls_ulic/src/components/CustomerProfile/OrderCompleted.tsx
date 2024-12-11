import React from 'react';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import './OrderStatus.css';
import { Link } from 'react-router-dom';

const OrderCompleted: React.FC = () => {
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
          <span className="label">Время поездки:</span> 15 минут
        </p>
        <p>
          <span className="label">Расстояние:</span> 7.5 км
        </p>
        <p>
          <span className="label">Стоимость:</span> 350 руб.
        </p>
      </div>
      <div className="feedback-form">
        <h3>Оставьте отзыв</h3>
        <textarea placeholder="Оставьте свой отзыв..." rows={4} />
        <button className="submit-feedback-button">Отправить отзыв</button>
        <Link to="/">        <button className="submit-feedback-button">Вернуться на главную</button></Link>
      </div>
    </div>
  );
};

export default OrderCompleted;