import { useState } from 'react';
import { Link } from 'react-router-dom';
import TermsModal from './TermsModal';
import './Footer.css';

function Footer() {
  const [showTerms, setShowTerms] = useState(false);
  return (
    <>
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <span className="footer-logo-icon">&#10047;</span>
              <span className="footer-logo-text">Roots Bloom</span>
            </Link>
            <p className="footer-tagline">Join Our &quot;Roots Bloom&quot; Group</p>
          </div>

          <div className="footer-columns">
            <div className="footer-col">
              <h4 className="footer-col-title">Our Address</h4>
              <p className="footer-address">
                Addis Ababa, Ethiopia,<br />
                Bole Bulbula Mariam Mazoria
              </p>
            </div>

            <div className="footer-col">
              <h4 className="footer-col-title">Quick Links</h4>
              <ul className="footer-links">
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/shop">Our Shop</Link></li>
                <li><Link to="/contact">Contact Us</Link></li>
                <li><button className="footer-link-btn" onClick={() => setShowTerms(true)}>Terms & Conditions</button></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4 className="footer-col-title">Get in Touch</h4>
              <p className="footer-phone">+251 909090909</p>
              <p className="footer-phone">+251 909999909</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
    {showTerms && <TermsModal onClose={() => setShowTerms(false)} />}
    </>
  );
}

export default Footer;
