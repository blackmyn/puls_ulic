import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faFacebookF, faTwitter, faYoutube, faGooglePlusG
} from '@fortawesome/free-brands-svg-icons';
import { faUser, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import './Header.css';
import { Link } from "react-router-dom";
import { useAuth } from '../../AuthContext';

function Header() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="left-side">
            {isAuthenticated ? (
              <>
              <Link to="/login" className="sign-in">
                <FontAwesomeIcon icon={faUser} className="icon" />
                <span>Мой аккаунт</span>
              </Link>
                <button onClick={logout} className="sign">
                  Выйти
                </button>
              </>
            ) : (
              <Link to="/login" className="sign-in">
                <FontAwesomeIcon icon={faUser} className="icon" />
                войти в аккаунт
              </Link>
            )}
            <a href="mailto:taxi@puls.com" className="email">
              <FontAwesomeIcon icon={faEnvelope} className="icon" />
              taxi@puls.com
            </a>
          </div>

          <Link to="/" className="logo-link">           <div className="logo">
            <img src="https://i.ibb.co/6J4cQ2H/logo.png" alt="logo" />
          </div></Link>

          <div className="right-side">
            <a href="tel:+8888880000" className="phone">
              <FontAwesomeIcon icon={faPhone} className="icon" />
              <div className="phone-text">
                888 888 0000<br />
                телефонная линия
              </div>
            </a>
            <div className="social-icons">
              <a href="#" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faYoutube} />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faGooglePlusG} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;