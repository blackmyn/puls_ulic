import React from "react";
import "./OrderHistory.css";
import { Link } from "react-router-dom";

function OrderHistory() {
  const orderHistory = [
    {
      id: "1",
      date: "25.08.2023",
      time: "14:30",
      from: "ул. Пушкина, 10",
      to: 'ТЦ "Галерея"',
      price: "10 руб.",
      status: "Завершен",
      feedback: "Отличная поездка! Водитель был вежлив и пунктуален.",
    },
    {
      id: "2",
      date: "22.08.2023",
      time: "20:15",
      from: 'ТЦ "Авиапарк"',
      to: "ул. Ленина, 5",
      price: "3.8 руб.",
      status: "Завершен",
    },
    {
      id: "3",
      date: "19.08.2023",
      time: "09:45",
      from: "ул. Советская, 25",
      to: "Ж/д вокзал",
      price: "1.9 руб.",
      status: "Завершен",
      feedback: "Машина была чистой, водитель помог с багажом.",
    },
  ];

  return (
    <ul className="order-list">
      {orderHistory.map((order) => (
        <li key={order.id} className="order-item">
          <div className="order-details">
            <p>
              <span className="label">Дата:</span> {order.date}
            </p>
            <p>
              <span className="label">Время:</span> {order.time}
            </p>
            <p>
              <span className="label">Откуда:</span> {order.from}
            </p>
            <p>
              <span className="label">Куда:</span> {order.to}
            </p>
            <p>
              <span className="label">Стоимость:</span> {order.price}
            </p>
            <p>
              <span className="label">Статус:</span> {order.status}
            </p>
          </div>
          <div className="order-actions">
          <Link to="/neworderclient">
              <button className="repeat-order">Повторить заказ</button>
          </Link>
          </div>
          {order.feedback && (
            <div className="order-feedback">
              <p>"{order.feedback}"</p>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}

export default OrderHistory;
