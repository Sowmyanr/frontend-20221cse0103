import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    if (!name || !address) return;
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const newOrder = {
      id: Date.now(),
      name,
      address,
      items: cartItems,
      total: cartTotal,
      date: new Date().toLocaleString(),
    };
    localStorage.setItem('orders', JSON.stringify([newOrder, ...orders]));
    clearCart();
    setOrderPlaced(true);
    setTimeout(() => navigate('/orders'), 2000);
  };

  if (orderPlaced) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h1>Order Placed!</h1>
        <img src="https://placehold.co/400x200?text=Thank+You!" alt="Order Placed" style={{ maxWidth: '400px', width: '100%', borderRadius: '12px', margin: '20px 0' }} />
        <p>Your order has been placed successfully. Redirecting to your orders...</p>
      </div>
    );
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Checkout Page</h1>
      <img src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80" alt="Random Checkout" style={{ maxWidth: '400px', width: '100%', borderRadius: '12px', margin: '20px 0' }} />
      <p>Thank you for shopping with us! Complete your purchase below.</p>
      <form style={{ maxWidth: 400, margin: '20px auto' }} onSubmit={e => { e.preventDefault(); handlePlaceOrder(); }}>
        <input type="text" placeholder="Your Name" value={name} onChange={e => setName(e.target.value)} style={{ width: '100%', marginBottom: 10, padding: 8 }} required />
        <input type="text" placeholder="Address" value={address} onChange={e => setAddress(e.target.value)} style={{ width: '100%', marginBottom: 10, padding: 8 }} required />
        <button type="submit" className="btn btn-primary">Place Order</button>
      </form>
    </div>
  );
};

export default Checkout; 