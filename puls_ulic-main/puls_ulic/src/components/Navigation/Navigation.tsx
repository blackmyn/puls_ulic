import React from 'react';
import './Navigation.css';
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav className="main-menu">
      <div className="container">
        <ul>
          <li>
            <Link to="/" className="active">ДОМОЙ</Link>
          </li>
          <li>
            <Link to="/about">О НАС</Link>
          </li>
          <li>
            <Link to="/neworderclient">ЗАКАЗАТЬ ТАКСИ</Link>
          </li>
          <li>
            <Link to="/news">НОВОСТИ</Link>
          </li>
          <li>
            <Link to="/contacts">КОНТАКТЫ</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
