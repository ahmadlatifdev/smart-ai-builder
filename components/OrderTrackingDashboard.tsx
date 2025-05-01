'use client';
import { useState, useEffect } from 'react';

export default function OrderTrackingDashboard() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await fetch('/api/customers');
      const data = await res.json();
      setOrders(data.customers);
    };
    fetchOrders();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Order Tracking Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {orders.map((order: any, idx) => (
          <div key={idx} className="border p-4 rounded-xl">
            <h3 className="font-semibold">Order #{idx + 1}</h3>
            <p><strong>Status:</strong> {order.status}</p>
            <p><strong>Tracking Number:</strong> {order.trackingNumber || 'Pending'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
