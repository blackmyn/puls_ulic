import React, { useState } from "react";
import "./MaintenanceSettings.css";
import { TextField, Button, Typography } from "@mui/material";

interface SettingsData {
  email: string;
  password: string;
}

function MaintenanceSettings() {
  const [formData, setFormData] = useState<SettingsData>({
    email: "worker@example.com",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Логика отправки данных на сервер
    console.log("Настройки сохранены:", formData);
  };

  return (
    <div className="maintenance-settings">
      <Typography variant="h6" component="h3">
        Настройки
      </Typography>
      <form onSubmit={handleSubmit} className="settings-form">
        <TextField
          label="Email"
          variant="outlined"
          name="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Старый пароль"
          variant="outlined"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Новый пароль"
          variant="outlined"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Повторите пароль"
          variant="outlined"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Сохранить
        </Button>
      </form>
    </div>
  );
}

export default MaintenanceSettings;
