'use client';
import { useState } from 'react';

export default function ProductSearchWizard() {
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState([]);

  const searchProducts = async () => {
    const res = await fetch('/api/products', {
      method: 'POST',
      body: JSON.stringify({ query }),
    });
    const data = await res.json();
    setProducts(data.products);
  };

  return (
    <div className="p-6">
      <input 
        type="text"
        placeholder="Search for products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border p-2 w-full mb-4"
      />
      <button onClick={searchProducts} className="bg-blue-600 text-white px-4 py-2 rounded">
        Search
      </button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        {products.map((product: any, idx) => (
          <div key={idx} className="border p-4 rounded-xl">
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-2" />
            <h2 className="font-bold">{product.name}</h2>
            <p><strong>Sales:</strong> {product.sales}</p>
            <p><strong>Rating:</strong> {product.rating}</p>
            <p><strong>Brand:</strong> {product.brand}</p>
            <p><strong>Source:</strong> {product.source}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
