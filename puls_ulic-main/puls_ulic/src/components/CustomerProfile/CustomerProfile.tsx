import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./CustomerProfile.css";
import OrderHistory from "./OrderHistory";
import Settings from "./Settings";
import Header from "../HeaderSecond/HeaderSecond";
import Navigation from "../Navigation/Navigation";
import { useAuth } from "../../AuthContext";
import axios from "axios";

interface Customer {
  full_name: string;
  email: string;
  phone_number: string;
}

function CustomerProfile() {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const response = await axios.get(`http://localhost:5000/api/customer/profile?userId=${userId}`);
        setCustomer(response.data); 
      } catch (error) {
        console.error("Ошибка загрузки данных клиента:", error);
      }
    };

    fetchCustomerData();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/"); 
  };

  return (
    <section className="customer-profile">
      <div className="container">
        <div className="profile-content">
          <div className="user-card">
            <div className="avatar">
              <img
                src="https://www.svgrepo.com/show/9695/avatar.svg"
                alt="Аватар"
              />
            </div>
            <div className="user-details">
              <h2>{customer?.full_name}</h2>
              <p>
                <span className="label">Email:</span> {customer?.email}
              </p>
              <p>
                <span className="label">Телефон:</span> {customer?.phone_number}
              </p>
            </div>
          </div>
          <div className="profile-links">
            <a className="settings-link">Настройки профиля</a> {/* Added a div for buttons */}
            <Link to="/" className="settings-link">На главную</Link>
            <button className="settings-link" onClick={handleLogout}>
              Выйти из аккаунта
            </button>
          </div>

          <div className="user-stats">
            <h3>Статистика поездок</h3>
            <div className="stat-item">
              <div className="stat-label">Всего поездок:</div>
              <div className="stat-value">3</div>
            </div>
            <div className="stat-item">
              <div className="stat-label">Пройдено километров:</div>
              <div className="stat-value">3,456 км</div>
            </div>
          </div>
          <div className="user-stats">
            <h3>История заказов</h3>
            <OrderHistory />
          </div>
          <div className="user-stats">
            <h3>Настройки профиля</h3>
            <Settings />
          </div>
          
        </div>
      </div>
    </section>
  );
}

export default CustomerProfile;