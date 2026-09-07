import { useState, useEffect } from 'react';
import { getProducts } from '../api/strapi';
import ProductCard from '../components/ProductCard';
import './Shop.css';

const CATEGORIES = ['All', 'Bouquets', 'Roses', 'Weddings', 'Sympathy', 'Birthday', 'Seasonal'];

function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    getProducts()
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load products. Please try again later.');
        setLoading(false);
      });
  }, []);

  const filtered = activeCategory === 'All'
    ? products
    : products.filter((p) => p.category?.trim() === activeCategory);

  return (
    <div className="shop-page">
      <div className="shop-inner">
        <div className="shop-header">
          <h1 className="shop-title">Our Collection</h1>
          <p className="shop-subtitle">Discover handcrafted bouquets for every occasion</p>
        </div>

        <div className="shop-filters">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="shop-loading">
            <div className="loading-spinner" />
            <p>Loading flowers...</p>
          </div>
        ) : error ? (
          <div className="shop-error">
            <p>{error}</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="shop-empty">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#C44569" strokeWidth="1.5">
              <path d="M12 22c4-4 8-7.5 8-12a8 8 0 10-16 0c0 4.5 4 8 8 12z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            <p>No flowers found in this category</p>
          </div>
        ) : (
          <div className="shop-grid">
            {filtered.map((product) => (
              <ProductCard key={product.documentId} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Shop;
