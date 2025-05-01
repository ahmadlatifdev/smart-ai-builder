'use client';
import { useState, useEffect } from 'react';

export default function PrivateCustomerDashboard() {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchCustomers = async () => {
      const res = await fetch('/api/customers');
      const data = await res.json();
      setCustomers(data.customers);
    };
    fetchCustomers();
  }, []);

  const filteredCustomers = customers.filter((c: any) =>
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Customer CRM Dashboard</h2>
      
      <input 
        type="text"
        placeholder="Search by Email"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 w-full mb-4"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredCustomers.map((customer: any, idx) => (
          <div key={idx} className="border p-4 rounded-xl">
            <h3 className="font-semibold">{customer.name}</h3>
            <p><strong>Email:</strong> {customer.email}</p>
            <p><strong>Phone:</strong> {customer.phone}</p>
            <p><strong>Last Product:</strong> {customer.lastProduct}</p>
            <p><strong>Status:</strong> {customer.status}</p>
            <p><strong>Tracking:</strong> {customer.trackingNumber}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

