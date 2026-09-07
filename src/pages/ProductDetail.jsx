import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getProduct, getProducts } from '../api/strapi';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import './ProductDetail.css';

function ProductDetail() {
  const { documentId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getProduct(documentId)
      .then((data) => {
        if (!cancelled) {
          setProduct(data);
          setLoading(false);
          // Fetch related products by same category
          getProducts().then((all) => {
            if (!cancelled) {
              setRelated(
                all.filter(
                  (p) =>
                    p.documentId !== documentId &&
                    p.category?.trim() === data.category?.trim()
                )
              );
            }
          });
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError('Product not found');
          setLoading(false);
        }
      });
    return () => { cancelled = true; };
  }, [documentId]);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const imageUrl = product?.image?.url
    ? `http://localhost:1337${product.image.url}`
    : product?.localImage || null;

  if (loading) {
    return (
      <div className="detail-page">
        <div className="detail-loading">
          <div className="loading-spinner" />
          <p>Loading product...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="detail-page">
        <div className="detail-error">
          <p>{error || 'Product not found'}</p>
          <Link to="/shop" className="btn btn-outline">Back to Shop</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="detail-page">
      <div className="detail-inner">
        <button className="detail-back" onClick={() => navigate('/shop')}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          Back to Shop
        </button>

        <div className="detail-content">
          <div className="detail-image">
            {imageUrl ? (
              <img src={imageUrl} alt={product.name} />
            ) : (
              <div className="detail-image-placeholder">
                <img src="/images/bouquet.png" alt={product.name} className="detail-fallback-img" />
              </div>
            )}
          </div>

          <div className="detail-info">
            <h1 className="detail-name">{product.name}</h1>
            <p className="detail-price">Birr {Number(product.price).toFixed(2)}</p>

            {product.description && (
              <p className="detail-description">{product.description}</p>
            )}

            {product.stock !== undefined && (
              <p className="detail-stock">
                {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
              </p>
            )}

            {product.stock > 0 && quantity >= product.stock && (
              <p className="detail-stock-warning">Maximum available quantity reached</p>
            )}

            <div className="detail-quantity">
              <span className="quantity-label">Quantity</span>
              <div className="quantity-controls">
                <button
                  className="quantity-btn"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="quantity-value">{quantity}</span>
                <button
                  className="quantity-btn"
                  onClick={() => setQuantity((q) => Math.min(product.stock || 99, q + 1))}
                  disabled={quantity >= (product.stock || 99)}
                >
                  +
                </button>
              </div>
            </div>

            <button
              className={`btn btn-primary detail-add-btn ${added ? 'added' : ''}`}
              onClick={handleAddToCart}
              disabled={product.stock === 0 || quantity > (product.stock || 0)}
            >
              {added ? (
                <>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  Added!
                </>
              ) : (
                <>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                    <line x1="3" y1="6" x2="21" y2="6"/>
                    <path d="M16 10a4 4 0 01-8 0"/>
                  </svg>
                  Add to Cart
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <div className="detail-related">
          <div className="detail-related-inner">
            <h2 className="detail-related-title">
              More <span>{product.category}</span> Flowers
            </h2>
            <div className="detail-related-grid">
              {related.map((p) => (
                <ProductCard key={p.documentId} product={p} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetail;
