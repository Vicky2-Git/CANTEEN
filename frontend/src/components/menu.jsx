import React, { useState } from 'react';
import Header from './Header';
import burger from './img/burger.jpeg';
import tea from './img/tea.jpeg';
import coffee from './img/coffee.jpeg';
import sandwich from './img/sandwich.jpeg';
import juice from './img/juice.jpeg';
import icecream from './img/icecream.jpeg';
import coke from './img/coke.jpeg';

const menuItems = [
  { id: 1, name: 'Burger', description: 'Juicy beef burger with cheese', price: 100, image: burger },
  { id: 2, name: 'Tea', description: 'Refreshing tea', price: 50, image: tea },
  { id: 3, name: 'Coffee', description: 'Italian-style coffee', price: 150, image: coffee },
  { id: 4, name: 'Sandwich', description: 'Grilled sandwich with veggies', price: 80, image: sandwich },
  { id: 5, name: 'Ice Cream', description: 'Chocolate and vanilla ice cream', price: 120, image: icecream },
  { id: 6, name: 'Coke', description: 'Chilled cola', price: 40, image: coke },
  { id: 7, name: 'Juice', description: 'Fresh fruit juice', price: 60, image: juice },
];

const Menu = ({ addToCart }) => {
  const [quantities, setQuantities] = useState(
    menuItems.reduce((acc, item) => {
      acc[item.id] = 0; // Initialize quantities to 0
      return acc;
    }, {})
  );

  const handleQuantityChange = (id, quantity) => {
    setQuantities({
      ...quantities,
      [id]: quantity,
    });
  };

  const handleAddToCart = (item) => {
    if (quantities[item.id] > 0) {
      addToCart({ ...item, quantity: quantities[item.id] });
      alert(`${item.name} added to cart with quantity: ${quantities[item.id]}`);
    } else {
      alert('Please select a quantity first');
    }
  };

  return (
    <div>
      <Header />
      <div className="container" style={{ paddingTop: '100px' , // Semi-transparent white background
          backdropFilter: "blur(10px)" }}>
        <div className="row">
          {menuItems.map((item) => (
            <div className="col-md-4 mb-4" key={item.id}>
              <div className="card">
                <img
                  src={item.image}
                  className="card-img-top"
                  alt={item.name}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text">{item.description}</p>
                  <p className="card-text">
                    <strong>₹{item.price}</strong>
                  </p>
                  <div className="d-flex justify-content-between align-items-center">
                    <input
                      type="number"
                      min="0"
                      value={quantities[item.id]}
                      onChange={(e) =>
                        handleQuantityChange(item.id, Math.max(0, parseInt(e.target.value) || 0))
                      }
                      className="form-control"
                      style={{ width: '60px' }}
                    />
                    <button
                      className="btn btn-primary"
                      onClick={() => handleAddToCart(item)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;
