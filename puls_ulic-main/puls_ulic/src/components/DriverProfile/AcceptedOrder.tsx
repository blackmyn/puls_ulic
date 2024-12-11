import React from "react";
import "./AcceptedOrder.css";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import TimerIcon from "@mui/icons-material/Timer";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useNavigate } from "react-router-dom";

function AcceptedOrder() {
  const navigate = useNavigate(); // Создаем useNavigate hook

  const handleCancelOrder = () => {
    navigate("/profiledriver"); // Перенаправляем на страницу профиля водителя
  };
  return (
    
    <div className="accepted-order-page">
      <div className="container">
        <h2>Заказ принят</h2>

        <div className="order-details">
          <div className="detail-section">
            <div className="icon-label">
              <LocationOnIcon className="icon" />
              <span>Откуда:</span>
            </div>
            <p>ул. Пушкина, 10</p>
          </div>

          <div className="detail-section">
            <div className="icon-label">
              <LocationOnIcon className="icon" />
              <span>Куда:</span>
            </div>
            <p>ТЦ "Галерея"</p>
          </div>

          <div className="detail-section">
            <div className="icon-label">
              <TimerIcon className="icon" />
              <span>Время заказа:</span>
            </div>
            <p>14:30, 25 августа 2024</p>
          </div>

          <div className="detail-section">
            <div className="icon-label">
              <AttachMoneyIcon className="icon" />
              <span>Стоимость:</span>
            </div>
            <p>2.5 руб.</p>
          </div>

          <div className="detail-section">
            <div className="icon-label">
              <DirectionsCarIcon className="icon" />
              <span>Тариф:</span>
            </div>
            <p>Эконом</p>
          </div>

          <div className="detail-section">
            <div className="icon-label">
              <span>Оплата:</span> {/*  Иконку для оплаты можно не добавлять */}
            </div>
            <p>Наличные</p>
          </div>
        </div>

        <div className="map-container">
          <MapContainer
            center={[55.75, 37.57]}
            zoom={13}
            scrollWheelZoom={true}
            style={{ height: "300px" }}
          >
            <TileLayer
              attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker
              position={[55.75, 37.57]}
              icon={L.icon({
                iconUrl:
                  "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
              })}
            >
              <Popup>Ваше местоположение</Popup>
            </Marker>
          </MapContainer>
        </div>

        <div className="buttons-container"> {/* Создаем контейнер для кнопок */}
          <button className="cancel-button" onClick={handleCancelOrder}>
            Отменить заказ
          </button>
          <button className="back-button" onClick={handleCancelOrder}>
            Вернуться в профиль
          </button>
        </div>
      </div>
      </div>
  );
}

export default AcceptedOrder;