import React, { useState, useEffect } from "react";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import PhoneIcon from "@mui/icons-material/Phone";
import StarIcon from "@mui/icons-material/Star";
import "./OrderStatus.css";

type Driver = {
  name: string;
  car: string;
  rating: number;
  photo: string;
  phone: string;
} | null;

function OrderStatus() {
  const [status, setStatus] = useState("Поиск машины");
  const [driver, setDriver] = useState<Driver>(null);
  const [secondsRemaining, setSecondsRemaining] = useState(5);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (status === "Поиск машины") {
      timer = setTimeout(() => {
        axios
          .get("/api/drivers")
          .then((response) => {
            setDriver(response.data);
            setStatus("Водитель найден");
          })
          .catch((error) => {
            console.error("Ошибка при загрузке данных о водителе:", error);
          });
      }, 5000);
    } else if (status === "Водитель найден") {
      timer = setTimeout(() => {
        setStatus("Водитель прибыл");
        setSecondsRemaining(10);
      }, 5000);
    } else if (status === "Водитель прибыл") {
      timer = setTimeout(() => {
        setStatus("Поездка началась");
      }, 5000);
    } else if (status === "Поездка началась") {
      timer = setTimeout(() => {
        setStatus("Заказ завершен");
      }, 5000);
    }

    return () => clearTimeout(timer);
  }, [status]);

  return (
    <div className="order-status">
      <div className="status-header">
        <h3>Статус заказа</h3>
        <div className="status-text">{status}</div>
      </div>

      <div className="details-container">
        <div className={`detail-item ${status !== "Поиск машины" ? "completed" : ""}`}>
          <CheckCircleOutlineIcon className="icon" color="success" />
          <span>Поиск машины</span>
        </div>
        <div className={`detail-item ${status !== "Поиск машины" && status !== "Водитель найден" ? "completed" : ""}`}>
          <CheckCircleOutlineIcon className="icon" color="success" />
          <span>Водитель найден</span>
        </div>
        <div className={`detail-item ${status === "Поездка началась" || status === "Заказ завершен" ? "completed" : ""}`}>
          <CheckCircleOutlineIcon className="icon" color="success" />
          <span>Водитель прибыл</span>
        </div>
        <div className={`detail-item ${status === "Заказ завершен" ? "completed" : ""}`}>
          <CheckCircleOutlineIcon className="icon" color="success" />
          <span>Заказ завершен</span>
        </div>
      </div>

      {driver && (
        <div className="driver-info">
          <img src={driver.photo} alt="Фото водителя" className="driver-photo" />
          <div className="driver-details">
            <p><span className="label">Водитель:</span> {driver.name}</p>
            <p><span className="label">Машина:</span> {driver.car}</p>
            <p><span className="label">Рейтинг:</span> {driver.rating} <StarIcon className="star-icon" color="warning" /></p>
            <a href={`tel:${driver.phone}`} className="phone-link"><PhoneIcon /> {driver.phone}</a>
          </div>
        </div>
      )}

      {status === "Водитель прибыл" && <div className="arrival-timer">Водитель ожидает вас: {secondsRemaining} сек.</div>}

      {status === "Заказ завершен" && (
        <>
          <div className="order-stats">
            <h3>Статистика поездки</h3>
            <p><span className="label">Время поездки:</span> 15 минут</p>
            <p><span className="label">Расстояние:</span> 7.5 км</p>
            <p><span className="label">Стоимость:</span> 350 руб.</p>
          </div>

          <div className="feedback-form">
            <h3>Оцените поездку</h3>
            <textarea placeholder="Оставьте свой отзыв" rows={4} />
            <button className="submit-feedback-button">Отправить отзыв</button>
          </div>
        </>
      )}

      {(status === "Поиск машины" || status === "Водитель найден") && <button className="cancel-button">Отменить заказ</button>}
    </div>
  );
}

export default OrderStatus;
