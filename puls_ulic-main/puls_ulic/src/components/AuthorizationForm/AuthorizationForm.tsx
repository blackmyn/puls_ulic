import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AuthorizationForm.css";
import { useAuth } from "../../AuthContext";
import HeaderSecond from "../HeaderSecond/HeaderSecond";
import Navigation from "../Navigation/Navigation";

interface FormData {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
  general?: string;
}

function AuthorizationForm() {
  const [formData, setFormData] = useState<FormData>({
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

    if (formData.email.trim() === "") {
      newErrors.email = "Email is required";
    }

    if (formData.password.trim() === "") {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await fetch("http://localhost:5000/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          const userData = await response.json();
           login();
          localStorage.setItem("user", JSON.stringify(userData));
          navigate("/");
        } else {
            const errorData = await response.json();
          console.error("Ошибка авторизации:", errorData.message);
          setErrors({ general: errorData.message });


        }
      } catch (error) {
         console.error("Ошибка соединения с сервером:", error);
        setErrors({ general: "Не удалось соединиться с сервером" });
      }
    }

  };


  return (
    <><section>
         <HeaderSecond></HeaderSecond>
         <Navigation></Navigation>
       </section><section className="authorization-form">
           <div className="container">
             <h2>Авторизация</h2>
             <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? "error" : ""} />
              {errors.email && <span className="error-message">{errors.email}</span>}
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
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>
            <button type="submit">Войти</button>
            <div className="links">
              <Link to="/forgot-password">Забыли пароль?</Link>
              <span> | </span>
              <Link to="/registration">Нет аккаунта?</Link>
            </div>
          </form>
          {errors.general && <span className="error-message">{errors.general}</span>}
        </div>
      </section></>
  );
}

export default AuthorizationForm;