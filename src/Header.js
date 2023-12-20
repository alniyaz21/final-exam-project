// Header.js

import React from 'react';
import { Link } from 'react-router-dom';
import iconApp from './img/icon_main.png';

function Header() {
  return (
    <div className="header">
      <Link to="/">
        <img src={iconApp} alt='icon' />
      </Link>
      <nav>
        <ul>
          <li>
            <Link className='to-page' to="/">Home</Link>
          </li>
          <li>
            <Link className='to-page' to="/search">Search</Link>
          </li>
          <li>
            <Link className='to-page' to="/favorites">Favorites</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Header;
