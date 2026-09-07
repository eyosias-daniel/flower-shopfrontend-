import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Navbar.css';

function Navbar() {
  const { cartCount } = useCart();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <div className="navbar-left">
          <button
            className="navbar-hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`hamburger-line ${menuOpen ? 'open' : ''}`} />
            <span className={`hamburger-line ${menuOpen ? 'open' : ''}`} />
            <span className={`hamburger-line ${menuOpen ? 'open' : ''}`} />
          </button>
          <div className={`navbar-links ${menuOpen ? 'open' : ''}`}>
            <Link
              to="/shop"
              className={`navbar-link ${isActive('/shop') ? 'active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              Shop
            </Link>
            <Link
              to="/gift-basket"
              className={`navbar-link ${isActive('/gift-basket') ? 'active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              Gift Basket
            </Link>
          </div>
        </div>

        <Link to="/" className="navbar-logo">
          <span className="logo-icon">&#10047;</span>
          <span className="logo-text">Roots Bloom</span>
        </Link>

        <div className="navbar-right">
          <div className="navbar-links-right">
            <Link to="/about" className={`navbar-link ${isActive('/about') ? 'active' : ''}`}>About Us</Link>
            <Link to="/contact" className={`navbar-link ${isActive('/contact') ? 'active' : ''}`}>Contact</Link>
          </div>
          <Link to="/shop" className="navbar-cta">
            Custom Order
          </Link>
          <Link to="/cart" className="navbar-cart">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
