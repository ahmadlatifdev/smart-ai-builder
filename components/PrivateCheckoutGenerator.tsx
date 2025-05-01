'use client';
import { useState } from 'react';

export default function PrivateCheckoutGenerator() {
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [checkoutLink, setCheckoutLink] = useState('');

  const generateLink = async () => {
    const res = await fetch('/api/private-checkout', {
      method: 'POST',
      body: JSON.stringify({ productId, quantity }),
    });
    const data = await res.json();
    if (data.success) {
      setCheckoutLink(data.checkoutLink);
    } else {
      alert('Failed to create checkout link.');
    }
  };

  return (
    <div className="p-6 mt-8">
      <h2 className="text-2xl font-bold mb-4">Generate Private Checkout Link</h2>

      <div className="flex flex-col gap-4 mb-6">
        <input 
          type="text" 
          placeholder="Product ID"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          className="border p-2"
        />
        <input 
          type="number" 
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="border p-2"
        />
        <button onClick={generateLink} className="bg-green-600 text-white py-2 px-4 rounded">
          Generate Link
        </button>
      </div>

      {checkoutLink && (
        <div className="bg-green-100 p-4 rounded">
          <p className="mb-2">Checkout Link Ready:</p>
          <a href={checkoutLink} target="_blank" className="text-blue-600 underline">
            {checkoutLink}
          </a>
        </div>
      )}
    </div>
  );
}
