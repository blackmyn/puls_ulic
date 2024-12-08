import React, { useState } from "react";
import "./WarehouseManagerSettings.css";
import {
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

interface SettingsData {
  email: string;
  password: string;
  supplier: string;
}

function WarehouseManagerSettings() {
  const [formData, setFormData] = useState<SettingsData>({
    email: "manager@example.com",
    password: "",
    supplier: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Логика отправки данных на сервер
    console.log("Настройки сохранены:", formData);
  };

  return (
    <div className="warehouse-manager-settings-page">
      <div className="container">
        <Typography variant="h4" component="h2">
          Настройки
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
            label="Старый пароль"
            variant="outlined"
            name="password"
            type="password"
            value={formData.password}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Новый пароль"
            variant="outlined"
            name="password"
            type="password"
            value={formData.password}
            fullWidth
            margin="normal"
          />
          {/*  Добавьте другие поля для настроек  */}
          <Button type="submit" variant="contained" color="primary">
            Сохранить
          </Button>
        </form>
      </div>
    </div>
  );
}

export default WarehouseManagerSettings;
