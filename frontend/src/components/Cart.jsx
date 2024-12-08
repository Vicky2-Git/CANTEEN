import React from 'react';
import Header from './Header';

const Cart = ({ cartItems, removeFromCart }) => {
  const calculateTotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div>
      <Header />
      <div className="container" style={{ paddingTop: '100px' }}>
        <h2 className="text-center mb-4">Your Cart</h2>
        {cartItems.length > 0 ? (
          <div>
            <div className="row">
              {cartItems.map((item) => (
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
                      <p className="card-text">Price: ₹{item.price}</p>
                      <p className="card-text">Quantity: {item.quantity}</p>
                      <button
                        className="btn btn-danger"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <h4 className="text-center">Total: ₹{calculateTotal()}</h4>
          </div>
        ) : (
          <h5 className="text-center">Your cart is empty.</h5>
        )}
      </div>
      <button class = "proceedToPay">proceedToPay</button>
    </div>
  );
};

export default Cart;
