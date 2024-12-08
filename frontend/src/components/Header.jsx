import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <div
      style={{
        padding: '12px 0px',
        backgroundColor: 'rgb(232, 227, 227)',
        textAlign: 'center',
        position: "sticky",
        top: '0',
        width: '100%',
        height: '85px',
        zIndex: '999',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
      }}
    >
      <div className="text-center">
        <h5>
          <a href="/" style={{ textDecoration: 'none', color: 'red' }}>
            AVM CANTEEN MANAGEMENT
          </a>
        </h5>
      </div>

      <div className="text-center pt-1">
        <Link to="/menu" style={{ textDecoration: 'none', color: 'black', margin: '0 15px' }}>
          <i className="bi bi-menu-button mx-2" style={{ fontSize: '20px' }}></i>
          Menu
        </Link>
        <Link to="/cart" style={{ textDecoration: 'none', color: 'black', margin: '0 15px' }}>
          <i className="bi bi-cart mx-2" style={{ fontSize: '20px' }}></i>
          Cart
        </Link>
        <Link to="/profile" style={{ textDecoration: 'none', color: 'black', margin: '0 15px' }}>
          <i className="bi bi-person-circle mx-2" style={{ fontSize: '20px' }}></i>
          Profile
        </Link>
        <Link to="/login" style={{ textDecoration: 'none', color: 'black', margin: '0 15px' }}>
          <i className="bi bi-box-arrow-right mx-2" style={{ fontSize: '20px' }}></i>
          Logout
        </Link>
      </div>
    </div>
  );
}
