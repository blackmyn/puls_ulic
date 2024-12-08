import React, { useState } from "react";
import "./RegistrationForm.css";
import Header from "../HeaderSecond/HeaderSecond";
import Navigation from "../Navigation/Navigation";
import { Link } from "react-router-dom";

function RegistrationForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = {};

    if (formData.fullName.trim() === "") {
      newErrors.fullName = "ФИО обязательно для заполнения";
    }

    if (formData.phone.trim() === "") {
      newErrors.phone = "Телефон обязателен для заполнения";
    }

    if (formData.email.trim() === "") {
      newErrors.email = "Email обязателен для заполнения";
    }

    if (formData.password.trim() === "") {
      newErrors.password = "Пароль обязателен для заполнения";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Здесь можно добавить логику отправки данных на сервер
      console.log("Форма отправлена:", formData);
    }
  };

  return (
    <><section>
      <Header />
      <Navigation></Navigation>
    </section>
    <section className="registration-form">
      <div className="container">
        <h2>Регистрация</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="fullName">ФИО:</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className={errors.fullName ? "error" : ""} />
            {errors.fullName && (
              <span className="error-message">{errors.fullName}</span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="phone">Телефон:</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={errors.phone ? "error" : ""} />
            {errors.phone && (
              <span className="error-message">{errors.phone}</span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? "error" : ""} />
            {errors.email && (
              <span className="error-message">{errors.email}</span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="password">Пароль:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? "error" : ""} />
            {errors.password && (
              <span className="error-message">{errors.password}</span>
            )}
          </div>
          <button type="submit">Зарегистрироваться</button>
          <div className="links">
            <Link to="/login">Уже есть аккаунт?</Link>
          </div>
        </form>
      </div>
    </section></>
  );
}

export default RegistrationForm;
