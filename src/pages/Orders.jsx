import React from 'react';

const Orders = () => {
  const orders = JSON.parse(localStorage.getItem('orders') || '[]');

  if (!orders.length) {
    return (
      <div style={{ maxWidth: 600, margin: '40px auto', textAlign: 'center' }}>
        <h1>My Orders</h1>
        <img src="https://placehold.co/400x200?text=No+Orders+Yet" alt="No Orders" style={{ margin: '20px 0', borderRadius: '10px' }} />
        <p>You have not placed any orders yet.</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 800, margin: '40px auto' }}>
      <h1 style={{ textAlign: 'center' }}>My Orders</h1>
      {orders.map(order => (
        <div key={order.id} style={{ border: '1px solid #eee', borderRadius: 10, margin: '30px 0', padding: 24 }}>
          <h2 style={{ marginBottom: 8 }}>Order #{order.id}</h2>
          <div style={{ color: '#888', marginBottom: 8 }}>Placed on: {order.date}</div>
          <div style={{ marginBottom: 8 }}>Name: {order.name}</div>
          <div style={{ marginBottom: 8 }}>Address: {order.address}</div>
          <div style={{ fontWeight: 'bold', marginBottom: 8 }}>Total: ${order.total.toFixed(2)}</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
            {order.items.map(item => (
              <div key={item.id} style={{ width: 180, textAlign: 'center', border: '1px solid #eee', borderRadius: 8, padding: 12 }}>
                <img src={item.images[0]} alt={item.name} style={{ width: '100%', height: 100, objectFit: 'cover', borderRadius: 6, marginBottom: 8 }} />
                <div style={{ fontWeight: 'bold', marginBottom: 4 }}>{item.name}</div>
                <div>Qty: {item.quantity}</div>
                <div style={{ color: '#888', fontSize: 13 }}>{item.category}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Orders; 