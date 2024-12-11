import React, { useState } from "react";
import OrderList from "./OrderList";
import "./DriverProfile.css";
import {  Typography, Switch, FormControlLabel } from "@mui/material";
import DriverSettings from "./DriverSettings";
import { useAuth } from "../../AuthContext";
import Avatar from '@mui/material/Avatar';


interface DriverData {
  name: string;
  phone: string;
  email: string;
  car: string;
  plate: string;
  rating: number;
  photo: string;
  status: string; //  Статус водителя (онлайн/офлайн)
}

function DriverProfile() {
  const { isAuthenticated, logout, role } = useAuth();
  const [driverData, setDriverData] = useState<DriverData>({
    name: "Иван Иванов",
    phone: "+7 (999) 123-45-67",
    email: "ivan.ivanov@example.com",
    car: "Hyundai Solaris, серый",
    plate: "A123BC 199",
    rating: 4.8,
    photo:
      "https://media.istockphoto.com/id/978258506/photo/crowdsourced-taxi-driver-in-england.jpg?s=612x612&w=0&k=20&c=iLre7SExG3h26-KZiww1PX_73rqYgjBZc8dCR1Ev7VU=",
    status: "Онлайн",
  });

  const [showSettings, setShowSettings] = useState(false); // Состояние для видимости настроек

  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDriverData({
      ...driverData,
      status: event.target.checked ? "Онлайн" : "Офлайн",
    });
  };

  const handleSettingsClick = () => {
    setShowSettings(!showSettings); // Изменяем состояние при клике
  };

  return (
    <div className="driver-profile">
      <div className="container">
        <div className="profile-header">
          <Avatar
            alt="Аватар"
            src={driverData.photo}
            sx={{ width: 100, height: 100 }}
          />
          <div className="driver-info">
            <Typography variant="h4" component="h2">
              {driverData.name}
            </Typography>
            <Typography variant="body1" component="p">
              <span className="label">Статус:</span> {driverData.status}
            </Typography>
            <Typography variant="body1" component="p">
              <span className="label">Рейтинг:</span> {driverData.rating}
            </Typography>
          </div>
        </div>
        <div className="profile-actions">
          <button onClick={handleSettingsClick} className="settings-link">
            Настройки
          </button>
          <button onClick={logout} className="settings-link">
            Выйти
          </button>
          <FormControlLabel
            control={
              <Switch
                checked={driverData.status === "Онлайн"}
                onChange={handleStatusChange}
              />
            }
            label={driverData.status === "Онлайн" ? "В сети" : "Не в сети"}
          />
        </div>
        <OrderList />
        {showSettings && <DriverSettings />} {/* Условно отображаем DriverSettings */}
      </div>
    </div>
  );
}

export default DriverProfile;