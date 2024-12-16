import React from 'react';
import StarIcon from '@mui/icons-material/Star';
import './OrderStatus.css';

type Driver = {
  name: string;
  car: string;
  rating: number;
  photo: string;
  phone: string;
} | null;

const DriverFound: React.FC<{ driver: Driver }> = ({ driver }) => {
  return (
    <div className="order-status driver-found">
      <h3>Водитель найден!</h3>
      <div className="driver-info">
        <img src={driver?.photo} alt={`Фото водителя ${driver?.name}`} className="driver-photo" />
        <div className="driver-details">
          <p>
            <span className="label">Водитель:</span> {driver?.name}
          </p>
          <p>
            <span className="label">Машина:</span> {driver?.car}
          </p>
          <p>
            <span className="label">Рейтинг:</span> {driver?.rating} <StarIcon className="star-icon" />
          </p>
          <p>
            <span className="label">Телефон:</span> <a href={`tel:${driver?.phone}`} className="phone-link">{driver?.phone}</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DriverFound;