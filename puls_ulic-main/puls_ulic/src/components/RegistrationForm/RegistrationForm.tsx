import React, { useState } from "react";
import "./RegistrationForm.css";
import Header from "../HeaderSecond/HeaderSecond";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../AuthContext";
import Navigation from "../Navigation/Navigation";

interface FormData {
  fullName: string;
  phone: string;
  email: string;
  password: string;
}

interface FormErrors {
  fullName?: string;
  phone?: string;
  email?: string;
  password?: string;
  general?: string;
}

function RegistrationForm() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    phone: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: FormErrors = {};

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

    try {
      const response = await axios.post("http://localhost:5000/api/reg", formData);
      
      const { role } = response.data;
  
      login(role);
  
      navigate('/');
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error("Ошибка авторизации:", err.response?.data?.message || "Неизвестная ошибка");
        setErrors({ general: err.response?.data?.message || "Не удалось войти" });
      } else {
        console.error("Неизвестная ошибка авторизации:", err);
        setErrors({ general: "Произошла неизвестная ошибка" });
      }
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
