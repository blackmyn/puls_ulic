import React from 'react';
import './Navigation.css';
import { Link } from 'react-scroll';

function Navigation() {
  return (
    <nav className="main-menu">
      <div className="container">
        <ul>
          <li>
            <Link to="/"> <a href ="/" className="active">ДОМОЙ</a></Link>
          </li>
          <li>
            <a href="#">О НАС</a>
          </li>
          <li>
            <a href="#">ЗАКАЗАТЬ ТАКСИ</a>
          </li>
          <li>
            <a href="#">НОВОСТИ</a>
          </li>
          <li>
            <a href="#">КОНТАКТЫ</a>
          </li>
        </ul>
      </div>
    </nav> 
  );
}

export default Navigation;