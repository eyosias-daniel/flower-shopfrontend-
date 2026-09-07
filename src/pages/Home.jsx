import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../api/strapi';
import ProductCard from '../components/ProductCard';
import './Home.css';

const LEAF_RAIN = [
  { left: '3%', delay: '0s', duration: '7s', cls: '' },
  { left: '8%', delay: '1.5s', duration: '8s', cls: 'leaf-pink' },
  { left: '14%', delay: '3.2s', duration: '6.5s', cls: 'leaf-light' },
  { left: '20%', delay: '0.8s', duration: '9s', cls: '' },
  { left: '27%', delay: '4.5s', duration: '7.5s', cls: 'leaf-pink' },
  { left: '33%', delay: '2.1s', duration: '8.5s', cls: '' },
  { left: '39%', delay: '5.8s', duration: '6s', cls: 'leaf-light' },
  { left: '45%', delay: '0.3s', duration: '7.8s', cls: 'leaf-pink' },
  { left: '51%', delay: '3.8s', duration: '9.5s', cls: '' },
  { left: '57%', delay: '1.2s', duration: '7.2s', cls: 'leaf-light' },
  { left: '63%', delay: '4.1s', duration: '8.2s', cls: 'leaf-pink' },
  { left: '69%', delay: '2.6s', duration: '6.8s', cls: '' },
  { left: '75%', delay: '5.2s', duration: '7.6s', cls: 'leaf-light' },
  { left: '81%', delay: '0.6s', duration: '8.8s', cls: 'leaf-pink' },
  { left: '87%', delay: '3.5s', duration: '7s', cls: '' },
  { left: '93%', delay: '1.8s', duration: '9.2s', cls: 'leaf-light' },
  { left: '97%', delay: '4.8s', duration: '6.2s', cls: 'leaf-pink' },
];

const FALLING_PETALS = [
  { left: '5%', delay: '0s', duration: '10s', w: '12px', h: '16px', opacity: 0.4 },
  { left: '12%', delay: '2.5s', duration: '12s', w: '10px', h: '14px', opacity: 0.35 },
  { left: '22%', delay: '5s', duration: '11s', w: '14px', h: '18px', opacity: 0.45 },
  { left: '35%', delay: '1s', duration: '13s', w: '11px', h: '15px', opacity: 0.3 },
  { left: '48%', delay: '3.5s', duration: '9.5s', w: '13px', h: '17px', opacity: 0.42 },
  { left: '58%', delay: '6s', duration: '10.5s', w: '10px', h: '13px', opacity: 0.38 },
  { left: '68%', delay: '2s', duration: '11.5s', w: '12px', h: '16px', opacity: 0.33 },
  { left: '78%', delay: '4.5s', duration: '12.5s', w: '14px', h: '18px', opacity: 0.4 },
  { left: '88%', delay: '1.5s', duration: '10s', w: '11px', h: '14px', opacity: 0.36 },
  { left: '95%', delay: '5.5s', duration: '8.5s', w: '13px', h: '17px', opacity: 0.44 },
];

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    getProducts()
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const carouselProducts = products.slice(0, Math.max(4, products.length));
  const slidesPerPage = 4;
  const maxSlide = Math.max(0, carouselProducts.length - slidesPerPage);

  const nextSlide = () => setCurrentSlide((s) => Math.min(s + 1, maxSlide));
  const prevSlide = () => setCurrentSlide((s) => Math.max(s - 1, 0));

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-content">
            <div className="hero-demo">
              <div className="demo-avatar-group">
                <div className="demo-avatar" style={{ background: '#F5E0E4' }}>
                  <img src="/images/bouquet.png" alt="" className="demo-avatar-img" />
                </div>
                <div className="demo-avatar" style={{ background: '#E8D0D8' }}>
                  <img src="/images/bouquet.png" alt="" className="demo-avatar-img" />
                </div>
              </div>
              <span className="demo-plus">+</span>
            </div>
            <h1 className="hero-title">
              Stop explaining.<br />
              Start <span className="hero-title-highlight">sending.</span><br />
                Some feelings only bloom.
            </h1>
            <p className="hero-subtitle">
              Flowers instead of Words
            </p>
            <div className="hero-actions">
              <Link to="/shop" className="btn btn-primary">
                Order Now
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
              </Link>
            </div>
          </div>

          <div className="hero-visual">
            {/* <div className="hero-badge">NEW BOUQUET STYLE</div> */}
            <div className="hero-image-card">
              <img
                src="/images/bouquet.png"
                alt="Beautiful bouquet of flowers"
                className="hero-image"
              />
            </div>
            <p className="hero-image-caption">Roots Bloom</p>
          </div>
        </div>

        {/* Leaf rain across entire hero */}
        <div className="hero-leaves-rain">
          {LEAF_RAIN.map((l, i) => (
            <div
              key={`leaf-${i}`}
              className={`leaf ${l.cls}`}
              style={{
                left: l.left,
                animationDelay: l.delay,
                animationDuration: l.duration,
              }}
            />
          ))}
        </div>

        {/* Background falling petals */}
        <div className="falling-petals-bg">
          {FALLING_PETALS.map((p, i) => (
            <div
              key={`petal-${i}`}
              className="falling-petal"
              style={{
                left: p.left,
                animationDelay: p.delay,
                animationDuration: p.duration,
                width: p.w,
                height: p.h,
                opacity: p.opacity,
              }}
            />
          ))}
        </div>
      </section>

      {/* Hand Picked Section */}
      <section className="handpicked-section">
        <div className="handpicked-inner">
          <div className="handpicked-image">
            <div className="handpicked-image-placeholder">
              <img src="/images/bouquet.png" alt="Hand picked bouquet" className="handpicked-img" />
            </div>
          </div>
          <div className="handpicked-content">
            <h2 className="handpicked-title">
              Hand picked for<br />
              your heart picked<br />
              person
            </h2>
            <p className="handpicked-text">
              If want to greet or thank anyone, don't<br />
              know their taste? - Send flowers.
            </p>
            <Link to="/shop" className="btn btn-outline">
              Customize Bouquet
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Order with Confidence Section */}
      <section className="confidence-section">
        <div className="confidence-inner">
          <div className="confidence-header">
            <h2 className="confidence-title">Order with Confidence</h2>
            <div className="confidence-controls">
              <Link to="/shop" className="explore-link">Explore All</Link>
              <button className="carousel-btn" onClick={prevSlide} disabled={currentSlide === 0}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
              </button>
              <button className="carousel-btn" onClick={nextSlide} disabled={currentSlide >= maxSlide}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
            </div>
          </div>

          {loading ? (
            <div className="loading-state">
              <div className="loading-spinner" />
              <p>Loading flowers...</p>
            </div>
          ) : (
            <div className="products-carousel">
              <div
                className="products-track"
                style={{ transform: `translateX(-${currentSlide * (100 / slidesPerPage)}%)` }}
              >
                {carouselProducts.map((product) => (
                  <div className="carousel-item" key={product.documentId}>
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Why Custom Section */}
      <section className="why-section">
        <div className="why-inner">
          <div className="why-content">
            <h2 className="why-title">
              Why custom hand<br />
              picked flower?
            </h2>
            <p className="why-text">
              Each bloom recalls — soft laughter, secret<br />
              glances, and love that lingers forever
            </p>
            <Link to="/shop" className="btn btn-outline">
              Personalized Bouquet
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
            </Link>
          </div>
          <div className="why-visual">
            <div className="why-image-grid">
              <div className="why-img why-img-1">
                <img src="/images/bouquet.png" alt="Custom bouquet" className="why-img-tag" />
              </div>
              <div className="why-img why-img-2">
                <img src="/images/bouquet.png" alt="Flower arrangement" className="why-img-tag" />
              </div>
            </div>
            <div className="why-testimonial">
              <div className="testimonial-avatar">
                <img src="/images/bouquet.png" alt="" className="testimonial-avatar-img" />
              </div>
              <div>
                <p className="testimonial-text">
                  &quot;We craft emotions for<br />
                  you, beautifully&quot;
                </p>
                <p className="testimonial-author">— Jennifer</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gifting Section */}
      <section className="gifting-section">
        <div className="gifting-inner">
          <div className="gifting-content">
            <h2 className="gifting-title">
              Gifting made<br />
              effortless, by<br />
              <span className="gifting-brand">Roots Bloom</span>
            </h2>
            <p className="gifting-text">
              Handcrafted bouquets to doorstep delivery
            </p>
            <Link to="/shop" className="btn btn-outline">
              Customize Bouquet
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
            </Link>
          </div>
          <div className="gifting-visual">
            <div className="gifting-image-circle">
              <img src="/images/bouquet.png" alt="Special bouquet" className="gifting-img" />
            </div>
            <span className="gifting-badge">Special Bouquet</span>
          </div>
          <div className="gifting-side">
            <div className="gifting-side-circle">
              <img src="/images/bouquet.png" alt="" className="gifting-side-img" />
            </div>
            <p className="gifting-side-label">VIEW BOUQUET</p>
            <p className="gifting-side-text">
              Roots Bloom makes &quot;Every gift&quot;<br />
              personal and seamless.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Marquee Section */}
      <section className="cta-marquee">
        <div className="marquee-track">
          <span className="marquee-item">VALENTINE</span>
          <span className="marquee-divider">/</span>
          <span className="marquee-item">ANNIVERSARY</span>
          <span className="marquee-divider">/</span>
          <span className="marquee-item">CHRISTMAS</span>
          <span className="marquee-divider">/</span>
          <span className="marquee-item">VALENTINE</span>
          <span className="marquee-divider">/</span>
          <span className="marquee-item">ANNIVERSARY</span>
          <span className="marquee-divider">/</span>
          <span className="marquee-item">CHRISTMAS</span>
          <span className="marquee-divider">/</span>
        </div>
      </section>
    </div>
  );
}

export default Home;
