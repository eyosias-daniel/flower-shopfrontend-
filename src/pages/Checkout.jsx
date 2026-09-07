import { useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { createOrder } from '../api/strapi';
import './Checkout.css';

const OCCASIONS = [
  { id: 'Birthday', icon: '🎂' },
  { id: 'Anniversary', icon: '💕' },
  { id: 'Wedding', icon: '💒' },
  { id: 'Sympathy', icon: '🕊️' },
  { id: 'Congratulations', icon: '🎉' },
  { id: 'Just Because', icon: '🌸' },
  { id: 'Get Well', icon: '🌻' },
];

const TIME_SLOTS = [
  { id: 'morning', label: 'Morning', desc: '8 AM – 12 PM' },
  { id: 'afternoon', label: 'Afternoon', desc: '12 PM – 5 PM' },
  { id: 'evening', label: 'Evening', desc: '5 PM – 8 PM' },
];

const WRAPPING = [
  { id: 'classic', label: 'Classic', price: 0, desc: 'Kraft paper with twine' },
  { id: 'premium', label: 'Premium', price: 5, desc: 'Satin ribbon with dried flowers' },
  { id: 'luxury', label: 'Luxury', price: 12, desc: 'Velvet box with gold accents' },
];

function Checkout() {
  const navigate = useNavigate();
  const { cartItems, cartTotal, clearCart } = useCart();

  const basketItems = useMemo(
    () => cartItems.filter((item) => item.type === 'gift-basket'),
    [cartItems]
  );
  const regularItems = useMemo(
    () => cartItems.filter((item) => item.type !== 'gift-basket'),
    [cartItems]
  );
  const hasBaskets = basketItems.length > 0;

  // Pull gift basket data to pre-fill checkout
  const firstBasket = hasBaskets ? basketItems[0] : null;
  const basketWrapping = firstBasket?.wrapping || 'classic';
  const basketMessage = firstBasket?.cardMessage || '';
  const basketTheme = firstBasket?.theme || null;

  const [form, setForm] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    deliveryAddress: '',
    deliveryDate: '',
    deliveryTime: 'afternoon',
    occasion: basketTheme || 'Just Because',
    giftMessage: basketMessage,
    wrappingStyle: basketWrapping,
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const wrappingPrice = hasBaskets
    ? 0 // wrapping already included in basket price
    : (WRAPPING.find((w) => w.id === form.wrappingStyle)?.price || 0);
  const totalPrice = cartTotal + wrappingPrice;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const orderData = {
      customerName: form.customerName,
      customerEmail: form.customerEmail,
      customerPhone: form.customerPhone,
      deliveryAddress: form.deliveryAddress,
      orderItems: cartItems.map((item) => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        type: item.type || 'product',
        theme: item.theme || null,
        items: item.items || null,
        cardMessage: item.cardMessage || null,
        wrapping: item.wrapping || null,
      })),
      totalPrice,
      paymentStatus: 'pending',
      fulfillmentStatus: 'pending',
      deliveryDate: form.deliveryDate || null,
      deliveryTime: form.deliveryTime,
      occasion: form.occasion,
      giftMessage: hasBaskets ? basketMessage : form.giftMessage,
      wrappingStyle: hasBaskets ? basketWrapping : form.wrappingStyle,
    };

    try {
      const res = await createOrder(orderData);
      if (res.error) {
        setError(res.error.message || 'Failed to place order. Please try again.');
        setSubmitting(false);
        return;
      }
      clearCart();
      navigate('/', { state: { orderSuccess: true } });
    } catch (err) {
      const msg = err?.response?.data?.error?.message || 'Failed to place order. Please try again.';
      setError(msg);
      setSubmitting(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="checkout-page">
        <div className="checkout-inner">
          <div className="checkout-empty">
            <h2>Your cart is empty</h2>
            <p>Add some flowers before checking out</p>
            <Link to="/shop" className="btn btn-primary">Browse Flowers</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="checkout-inner">
        <h1 className="checkout-title">Checkout</h1>

        <div className="checkout-layout">
          <form className="checkout-form" onSubmit={handleSubmit}>
            {/* Delivery Information */}
            <h2 className="form-section-title">Delivery Information</h2>

            <div className="form-group">
              <label htmlFor="customerName">Full Name</label>
              <input
                type="text"
                id="customerName"
                name="customerName"
                value={form.customerName}
                onChange={handleChange}
                required
                placeholder="Enter your full name"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="customerEmail">Email</label>
                <input
                  type="email"
                  id="customerEmail"
                  name="customerEmail"
                  value={form.customerEmail}
                  onChange={handleChange}
                  required
                  placeholder="your@email.com"
                />
              </div>
              <div className="form-group">
                <label htmlFor="customerPhone">Phone</label>
                <input
                  type="tel"
                  id="customerPhone"
                  name="customerPhone"
                  value={form.customerPhone}
                  onChange={handleChange}
                  required
                  placeholder="(02) 0000 0000"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="deliveryAddress">Delivery Address</label>
              <textarea
                id="deliveryAddress"
                name="deliveryAddress"
                value={form.deliveryAddress}
                onChange={handleChange}
                required
                rows={3}
                placeholder="Enter your full delivery address"
              />
            </div>

            {/* Delivery Schedule */}
            <h2 className="form-section-title">When should we deliver?</h2>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="deliveryDate">Delivery Date</label>
                <input
                  type="date"
                  id="deliveryDate"
                  name="deliveryDate"
                  value={form.deliveryDate}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div className="form-group">
                <label>Time Slot</label>
                <div className="time-slots">
                  {TIME_SLOTS.map((slot) => (
                    <button
                      key={slot.id}
                      type="button"
                      className={`time-slot ${form.deliveryTime === slot.id ? 'selected' : ''}`}
                      onClick={() => setForm((prev) => ({ ...prev, deliveryTime: slot.id }))}
                    >
                      <span className="time-slot-label">{slot.label}</span>
                      <span className="time-slot-desc">{slot.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Occasion */}
            <h2 className="form-section-title">What's the occasion?</h2>
            <div className="occasion-grid">
              {OCCASIONS.map((occ) => (
                <button
                  key={occ.id}
                  type="button"
                  className={`occasion-btn ${form.occasion === occ.id ? 'selected' : ''}`}
                  onClick={() => setForm((prev) => ({ ...prev, occasion: occ.id }))}
                >
                  <span className="occasion-icon">{occ.icon}</span>
                  <span className="occasion-label">{occ.id}</span>
                </button>
              ))}
            </div>

            {/* Gift Message — only show if no basket has already set it */}
            {!hasBaskets && (
              <>
                <h2 className="form-section-title">Add a Gift Message</h2>
                <div className="form-group">
                  <textarea
                    name="giftMessage"
                    value={form.giftMessage}
                    onChange={(e) => setForm((prev) => ({ ...prev, giftMessage: e.target.value.slice(0, 200) }))}
                    rows={3}
                    placeholder="Write a personal note to include with the flowers..."
                    maxLength={200}
                  />
                  <span className="char-count">{form.giftMessage.length}/200</span>
                </div>
              </>
            )}

            {/* Wrapping — only show if no basket has already set it */}
            {!hasBaskets && (
              <>
                <h2 className="form-section-title">Choose Wrapping</h2>
                <div className="wrapping-options">
                  {WRAPPING.map((wrap) => (
                    <button
                      key={wrap.id}
                      type="button"
                      className={`wrap-option ${form.wrappingStyle === wrap.id ? 'selected' : ''}`}
                      onClick={() => setForm((prev) => ({ ...prev, wrappingStyle: wrap.id }))}
                    >
                      <div className="wrap-option-main">
                        <span className="wrap-option-label">{wrap.label}</span>
                        <span className="wrap-option-desc">{wrap.desc}</span>
                      </div>
                      <span className="wrap-option-price">
                        {wrap.price === 0 ? 'Free' : `+$${wrap.price}`}
                      </span>
                    </button>
                  ))}
                </div>
              </>
            )}

            {/* Show basket confirmation when baskets are in cart */}
            {hasBaskets && (
              <div className="checkout-basket-confirmation">
                <h2 className="form-section-title">Your Gift Basket Details</h2>
                {basketItems.map((basket, i) => (
                  <div className="basket-confirm-card" key={basket.documentId || i}>
                    <div className="basket-confirm-header">
                      <span className="basket-confirm-icon">🎁</span>
                      <div>
                        <span className="basket-confirm-name">{basket.name}</span>
                        <span className="basket-confirm-theme">{basket.theme} Theme</span>
                      </div>
                    </div>
                    {basket.items && basket.items.length > 0 && (
                      <div className="basket-confirm-items">
                        {basket.items.map((item, j) => (
                          <span key={j} className="basket-confirm-item">
                            {item.name} × {item.quantity}
                          </span>
                        ))}
                      </div>
                    )}
                    {basket.cardMessage && (
                      <p className="basket-confirm-msg">"{basket.cardMessage}"</p>
                    )}
                    <span className="basket-confirm-wrap">
                      Wrapping: {WRAPPING.find((w) => w.id === basket.wrapping)?.label || 'Classic'}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {error && <p className="form-error">{error}</p>}

            <button
              type="submit"
              className="btn btn-primary checkout-submit"
              disabled={submitting}
            >
              {submitting ? 'Placing Order...' : `Place Order — Birr ${totalPrice.toFixed(2)}`}
            </button>
          </form>

          <div className="checkout-summary">
            <h2 className="summary-title">Order Summary</h2>
            <div className="summary-items">
              {cartItems.map((item) => (
                <div className="summary-item" key={item.documentId}>
                  <div className="summary-item-info">
                    <span className="summary-item-name">
                      {item.name}
                      {item.type === 'gift-basket' && (
                        <span className="summary-basket-badge">Gift Basket</span>
                      )}
                    </span>
                    <span className="summary-item-qty">x{item.quantity}</span>
                  </div>
                  <span className="summary-item-price">
                    Birr {(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            <div className="summary-divider" />
            <div className="summary-row">
              <span>Subtotal</span>
              <span>Birr {cartTotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            {!hasBaskets && wrappingPrice > 0 && (
              <div className="summary-row">
                <span>Wrapping ({form.wrappingStyle})</span>
                <span>+Birr {wrappingPrice.toFixed(2)}</span>
              </div>
            )}
            {hasBaskets && (
              <div className="summary-row">
                <span>Wrapping</span>
                <span>Included</span>
              </div>
            )}
            <div className="summary-divider" />
            <div className="summary-row summary-total">
              <span>Total</span>
              <span>Birr {totalPrice.toFixed(2)}</span>
            </div>

            {form.occasion && (
              <div className="summary-occasion">
                <span className="summary-occasion-icon">
                  {OCCASIONS.find((o) => o.id === form.occasion)?.icon}
                </span>
                <span>{form.occasion}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
