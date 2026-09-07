import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Cart.css';

function Cart() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-inner">
          <div className="cart-empty">
            <div className="cart-empty-icon">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#C44569" strokeWidth="1.2">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
            </div>
            <h2>Your cart is empty</h2>
            <p>Browse our beautiful collection and find the perfect flowers</p>
            <Link to="/shop" className="btn btn-primary">Browse Flowers</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-inner">
        <h1 className="cart-title">Shopping Cart</h1>

        <div className="cart-layout">
          <div className="cart-items">
            {cartItems.map((item) => (
              <div className={`cart-item ${item.type === 'gift-basket' ? 'cart-item-basket' : ''}`} key={item.documentId}>
                <div className="cart-item-image">
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="cart-item-img" />
                  ) : (
                    <img src="/images/bouquet.png" alt={item.name} className="cart-item-img" />
                  )}
                  {item.type === 'gift-basket' && (
                    <span className="cart-item-basket-tag">Gift Basket</span>
                  )}
                </div>
                <div className="cart-item-info">
                  <h3 className="cart-item-name">{item.name}</h3>
                  {item.type === 'gift-basket' && item.theme && (
                    <p className="cart-item-theme">Theme: {item.theme}</p>
                  )}
                  {item.type === 'gift-basket' && item.items && (
                    <p className="cart-item-contents">
                      {item.items.length} item{item.items.length !== 1 ? 's' : ''} in basket
                    </p>
                  )}
                  <p className="cart-item-price">Birr {Number(item.price).toFixed(2)} each</p>
                </div>
                <div className="cart-item-quantity">
                  <button
                    className="qty-btn"
                    onClick={() => updateQuantity(item.documentId, item.quantity - 1)}
                  >
                    -
                  </button>
                  <span className="qty-value">{item.quantity}</span>
                  <button
                    className="qty-btn"
                    onClick={() => updateQuantity(item.documentId, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <div className="cart-item-subtotal">
                  Birr {(item.price * item.quantity).toFixed(2)}
                </div>
                <button
                  className="cart-item-remove"
                  onClick={() => removeFromCart(item.documentId)}
                  aria-label="Remove item"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2 className="summary-title">Order Summary</h2>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>Birr {cartTotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="summary-divider" />
            <div className="summary-row summary-total">
              <span>Total</span>
              <span>Birr {cartTotal.toFixed(2)}</span>
            </div>
            <Link to="/checkout" className="btn btn-primary summary-btn">
              Proceed to Checkout
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
            </Link>
            <Link to="/shop" className="summary-continue">Continue Shopping</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
