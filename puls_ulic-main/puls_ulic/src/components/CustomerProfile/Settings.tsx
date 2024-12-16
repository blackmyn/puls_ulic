import React, { useState } from "react";
import "./Settings.css";
import axios from "axios";

interface FormData {
  fullName: string;
  phone: string;
  email: string;
  password: string;
}

function Settings() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "Имя Фамилия",
    phone: "1234567890",
    email: "example@mail.com",
    password: "пароль123",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        alert("Ошибка: userId не найден в localStorage");
        return;
      }

      await axios.put(
        `http://localhost:5000/api/customer/editprofile?userId=${userId}`,
        formData
      );
  
      window.location.reload();
    } catch (err) {
      console.error("Ошибка при сохранении данных:", err);
      alert("Не удалось сохранить изменения. Проверьте введенные данные.");
    }
  };
  

  return (
    <section className="settings-page">
      <div className="container">
        <form onSubmit={handleSubmit} className="settings-form">
          <div className="form-group">
            <label htmlFor="fullName">ФИО:</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Телефон:</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Пароль:</label>
            <input />
          </div>
          <button type="submit" className="save-button">
            Сохранить
          </button>
        </form>
      </div>
    </section>
  );
}

export default Settings;
