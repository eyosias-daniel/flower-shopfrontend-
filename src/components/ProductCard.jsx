import { Link } from 'react-router-dom';
import './ProductCard.css';

function ProductCard({ product }) {
  const { documentId, name, price, image, localImage } = product;
  const imageUrl = image?.url
    ? `http://localhost:1337${image.url}`
    : localImage || null;

  return (
    <Link to={`/product/${documentId}`} className="product-card">
      <div className="product-card-image">
        {imageUrl ? (
          <img src={imageUrl} alt={name} />
        ) : (
          <div className="product-card-placeholder">
            <img src="/images/bouquet.png" alt={name} className="product-card-fallback" />
          </div>
        )}
      </div>
      <div className="product-card-body">
        <h3 className="product-card-name">{name}</h3>
        <div className="product-card-footer">
          <span className="product-card-price">
            Birr {Number(price).toFixed(2)}
          </span>
          <span className="product-card-action">
            Add to Cart
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
          </span>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
