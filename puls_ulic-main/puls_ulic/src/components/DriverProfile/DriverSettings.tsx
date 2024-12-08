import React, { useState } from "react";
import "./DriverSettings.css";
import {
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

interface DriverSettingsData {
  email: string;
  phone: string;
  carModel: string;
  carColor: string;
  plateNumber: string;
}

function DriverSettings() {
  const [formData, setFormData] = useState<DriverSettingsData>({
    email: "ivan.ivanov@example.com",
    phone: "+375 (29) 123-45-67",
    carModel: "Hyundai Solaris",
    carColor: "Серый",
    plateNumber: "A123BC 199",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Настройки сохранены:", formData);
  };

  return (
    <section className="driver-settings-page">
      <div className="container">
        <Typography variant="h4" component="h2">
          Настройки профиля
        </Typography>
        <form onSubmit={handleSubmit} className="settings-form">
          <TextField
            label="Email"
            variant="outlined"
            name="email"
            value={formData.email}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Телефон"
            variant="outlined"
            name="phone"
            value={formData.phone}
            fullWidth
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="carModel-label">Модель машины</InputLabel>
            <Select
              labelId="carModel-label"
              id="carModel"
              name="carModel"
              value={formData.carModel}
            >
              <MenuItem value="Hyundai Solaris">Hyundai Solaris</MenuItem>
              <MenuItem value="Kia Rio">Kia Rio</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Старый пароль"
            variant="outlined"
            name="plateNumber"
            fullWidth
          />
          <TextField
            label="Новый пароль"
            variant="outlined"
            name="plateNumber"
            fullWidth
          />
          <TextField
            label="Повторите пароль"
            variant="outlined"
            name="plateNumber"
            fullWidth
          />
          {/*  Добавь другие поля для настроек, 
              например, пароль */}
          <Button type="submit" variant="contained" color="warning">
            Сохранить
          </Button>
        </form>
      </div>
    </section>
  );
}

export default DriverSettings;
