import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProducts } from '../api/strapi';
import { useCart } from '../context/CartContext';
import './GiftBasket.css';

const THEMES = [
  { id: 'Birthday', label: 'Birthday', icon: '🎂', color: '#F59E0B' },
  { id: 'Thank You', label: 'Thank You', icon: '💝', color: '#EC4899' },
  { id: 'Get Well', label: 'Get Well', icon: '🌻', color: '#10B981' },
  { id: 'Baby', label: 'Baby', icon: '🍼', color: '#8B5CF6' },
  { id: 'Wedding', label: 'Wedding', icon: '💒', color: '#F43F5E' },
  { id: 'Love', label: 'Love', icon: '❤️', color: '#E11D48' },
];

const WRAPPING_OPTIONS = [
  { id: 'classic', label: 'Classic', price: 0, desc: 'Kraft paper with twine' },
  { id: 'premium', label: 'Premium', price: 5, desc: 'Satin ribbon with dried flowers' },
  { id: 'luxury', label: 'Luxury', price: 12, desc: 'Velvet box with gold accents' },
];

function GiftBasket() {
  const navigate = useNavigate();
  const { addBasketToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(1);
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [basketItems, setBasketItems] = useState([]);
  const [cardMessage, setCardMessage] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [wrapping, setWrapping] = useState('classic');
  const [added, setAdded] = useState(false);

  useEffect(() => {
    getProducts()
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const basketTotal = useMemo(() => {
    const itemsTotal = basketItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const wrapPrice = WRAPPING_OPTIONS.find((w) => w.id === wrapping)?.price || 0;
    return itemsTotal + wrapPrice;
  }, [basketItems, wrapping]);

  const addToBasket = (product) => {
    setBasketItems((prev) => {
      const existing = prev.find((item) => item.documentId === product.documentId);
      if (existing) {
        return prev.map((item) =>
          item.documentId === product.documentId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prev,
        {
          documentId: product.documentId,
          name: product.name,
          price: Number(product.price),
          quantity: 1,
          image: product.Image?.url || product.localImage || null,
        },
      ];
    });
  };

  const removeFromBasket = (documentId) => {
    setBasketItems((prev) => prev.filter((item) => item.documentId !== documentId));
  };

  const updateBasketQuantity = (documentId, quantity) => {
    if (quantity <= 0) {
      removeFromBasket(documentId);
      return;
    }
    setBasketItems((prev) =>
      prev.map((item) =>
        item.documentId === documentId ? { ...item, quantity } : item
      )
    );
  };

  const handleAddToCart = () => {
    const basket = {
      name: `Custom ${selectedTheme} Gift Basket`,
      theme: selectedTheme,
      items: basketItems,
      basePrice: basketTotal,
      cardMessage,
      recipientName,
      wrapping,
    };
    addBasketToCart(basket);
    setAdded(true);
    setTimeout(() => navigate('/cart'), 1200);
  };

  const totalItems = basketItems.reduce((sum, item) => sum + item.quantity, 0);

  if (loading) {
    return (
      <div className="gb-page">
        <div className="gb-loading">
          <div className="loading-spinner" />
          <p>Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="gb-page">
      <div className="gb-inner">
        <div className="gb-header">
          <h1 className="gb-title">Build Your Gift Basket</h1>
          <p className="gb-subtitle">Curate a personal gift, item by item</p>
        </div>

        {/* Step indicators */}
        <div className="gb-steps">
          {[
            { num: 1, label: 'Pick Theme' },
            { num: 2, label: 'Add Items' },
            { num: 3, label: 'Personalize' },
          ].map((s) => (
            <div
              key={s.num}
              className={`gb-step ${step === s.num ? 'active' : ''} ${step > s.num ? 'done' : ''}`}
              onClick={() => s.num < step && setStep(s.num)}
            >
              <div className="gb-step-num">
                {step > s.num ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                ) : s.num}
              </div>
              <span className="gb-step-label">{s.label}</span>
            </div>
          ))}
          <div className="gb-step-line" />
        </div>

        {/* Step 1: Theme */}
        {step === 1 && (
          <div className="gb-section">
            <h2 className="gb-section-title">Choose a Theme</h2>
            <div className="gb-themes">
              {THEMES.map((theme) => (
                <button
                  key={theme.id}
                  className={`gb-theme-card ${selectedTheme === theme.id ? 'selected' : ''}`}
                  onClick={() => setSelectedTheme(theme.id)}
                  style={{ '--theme-color': theme.color }}
                >
                  <span className="gb-theme-icon">{theme.icon}</span>
                  <span className="gb-theme-label">{theme.label}</span>
                </button>
              ))}
            </div>
            {selectedTheme && (
              <button className="btn btn-primary gb-next" onClick={() => setStep(2)}>
                Continue to Items
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
              </button>
            )}
          </div>
        )}

        {/* Step 2: Items */}
        {step === 2 && (
          <div className="gb-section">
            <div className="gb-items-layout">
              <div className="gb-products-panel">
                <h2 className="gb-section-title">Add Products</h2>
                <div className="gb-products-grid">
                  {products.map((product) => {
                    const inBasket = basketItems.find((i) => i.documentId === product.documentId);
                    return (
                      <div className="gb-product-card" key={product.documentId}>
                        <div className="gb-product-img">
                          {product.image?.url ? (
                            <img src={`http://localhost:1337${product.image.url}`} alt={product.name} />
                          ) : product.localImage ? (
                            <img src={product.localImage} alt={product.name} />
                          ) : (
                            <div className="gb-product-placeholder">
                              <img src="/images/bouquet.png" alt={product.name} />
                            </div>
                          )}
                        </div>
                        <div className="gb-product-info">
                          <h4 className="gb-product-name">{product.name}</h4>
                          <p className="gb-product-price">Birr {Number(product.price).toFixed(2)}</p>
                        </div>
                        <button
                          className={`gb-add-btn ${inBasket ? 'added' : ''}`}
                          onClick={() => addToBasket(product)}
                        >
                          {inBasket ? `Added (${inBasket.quantity})` : '+ Add'}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="gb-basket-panel">
                <div className="gb-basket-sticky">
                  <h3 className="gb-basket-title">
                    <span className="gb-basket-icon">
                      {THEMES.find((t) => t.id === selectedTheme)?.icon}
                    </span>
                    {selectedTheme} Basket
                  </h3>

                  {basketItems.length === 0 ? (
                    <p className="gb-basket-empty">Tap products to add them here</p>
                  ) : (
                    <div className="gb-basket-items">
                      {basketItems.map((item) => (
                        <div className="gb-basket-item" key={item.documentId}>
                          <div className="gb-basket-item-info">
                            <span className="gb-basket-item-name">{item.name}</span>
                            <span className="gb-basket-item-price">
Birr {(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                          <div className="gb-basket-item-controls">
                            <button
                              className="gb-qty-btn"
                              onClick={() => updateBasketQuantity(item.documentId, item.quantity - 1)}
                            >
                              -
                            </button>
                            <span className="gb-qty-val">{item.quantity}</span>
                            <button
                              className="gb-qty-btn"
                              onClick={() => updateBasketQuantity(item.documentId, item.quantity + 1)}
                            >
                              +
                            </button>
                            <button
                              className="gb-remove-btn"
                              onClick={() => removeFromBasket(item.documentId)}
                            >
                              ×
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="gb-basket-divider" />
                  <div className="gb-basket-total">
                    <span>Basket Total</span>
                    <span>Birr {basketTotal.toFixed(2)}</span>
                  </div>

                  <div className="gb-basket-actions">
                    <button className="btn btn-outline gb-back" onClick={() => setStep(1)}>
                      Back
                    </button>
                    <button
                      className="btn btn-primary gb-next"
                      onClick={() => setStep(3)}
                      disabled={basketItems.length === 0}
                    >
                      Personalize
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Personalize */}
        {step === 3 && (
          <div className="gb-section">
            <div className="gb-personalize-layout">
              <div className="gb-personalize-form">
                <h2 className="gb-section-title">Personalize Your Gift</h2>

                <div className="form-group">
                  <label htmlFor="recipientName">Recipient Name</label>
                  <input
                    type="text"
                    id="recipientName"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    placeholder="Who is this gift for?"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="cardMessage">Card Message</label>
                  <textarea
                    id="cardMessage"
                    value={cardMessage}
                    onChange={(e) => setCardMessage(e.target.value.slice(0, 200))}
                    rows={3}
                    placeholder="Write a personal note..."
                    maxLength={200}
                  />
                  <span className="gb-char-count">{cardMessage.length}/200</span>
                </div>

                <div className="form-group">
                  <label>Wrapping Style</label>
                  <div className="gb-wrapping-options">
                    {WRAPPING_OPTIONS.map((opt) => (
                      <button
                        key={opt.id}
                        className={`gb-wrap-option ${wrapping === opt.id ? 'selected' : ''}`}
                        onClick={() => setWrapping(opt.id)}
                      >
                        <span className="gb-wrap-label">{opt.label}</span>
                        <span className="gb-wrap-desc">{opt.desc}</span>
                        <span className="gb-wrap-price">
                          {opt.price === 0 ? 'Free' : `+Birr {opt.price}`}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="gb-summary-panel">
                <div className="gb-summary-sticky">
                  <h3 className="gb-basket-title">
                    <span className="gb-basket-icon">
                      {THEMES.find((t) => t.id === selectedTheme)?.icon}
                    </span>
                    {selectedTheme} Basket
                  </h3>

                  <div className="gb-summary-items">
                    {basketItems.map((item) => (
                      <div className="gb-summary-item" key={item.documentId}>
                        <span className="gb-summary-item-name">
                          {item.name} × {item.quantity}
                        </span>
                        <span className="gb-summary-item-price">
                          Birr {(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="gb-basket-divider" />

                  <div className="gb-summary-row">
                    <span>Items</span>
                    <span>Birr {(basketTotal - (WRAPPING_OPTIONS.find((w) => w.id === wrapping)?.price || 0)).toFixed(2)}</span>
                  </div>
                  <div className="gb-summary-row">
                    <span>Wrapping ({WRAPPING_OPTIONS.find((w) => w.id === wrapping)?.label})</span>
                    <span>{wrapping === 'classic' ? 'Free' : `+Birr {WRAPPING_OPTIONS.find((w) => w.id === wrapping)?.price}`}</span>
                  </div>

                  <div className="gb-basket-divider" />
                  <div className="gb-basket-total">
                    <span>Total</span>
                    <span>Birr {basketTotal.toFixed(2)}</span>
                  </div>

                  {recipientName && (
                    <div className="gb-preview-card">
                      <p className="gb-preview-to">For: {recipientName}</p>
                      {cardMessage && <p className="gb-preview-msg">"{cardMessage}"</p>}
                    </div>
                  )}

                  <div className="gb-basket-actions">
                    <button className="btn btn-outline gb-back" onClick={() => setStep(2)}>
                      Back
                    </button>
                    <button
                      className={`btn btn-primary gb-next ${added ? 'added' : ''}`}
                      onClick={handleAddToCart}
                      disabled={added}
                    >
                      {added ? (
                        <>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                          Added to Cart!
                        </>
                      ) : (
                        <>
                          Add to Cart — Birr {basketTotal.toFixed(2)}
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default GiftBasket;
