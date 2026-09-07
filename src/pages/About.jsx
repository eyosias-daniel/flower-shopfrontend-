import { Link } from 'react-router-dom';
import './About.css';

function About() {
  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="about-hero-inner">
          <span className="about-hero-tag">Our Story</span>
          <h1 className="about-hero-title">
            Where Flowers Speak<br />
            Louder Than Words
          </h1>
        </div>
      </section>

      <section className="about-body">
        <div className="about-inner">
          <div className="about-intro">
            <div className="about-intro-image">
              <img src="/images/bouquet.png" alt="Roots Bloom bouquet" className="about-intro-img" />
            </div>
            <div className="about-intro-content">
              <span className="about-label">About Roots Bloom</span>
              <h2 className="about-intro-heading">
                Born from a simple,<br />
                powerful belief
              </h2>
              <p className="about-intro-text">
                In the heart of Addis Ababa, a new kind of floral experience has taken root.
                Established in March 2026 by Ruth, Roots Bloom was born from a simple, powerful
                belief: that the most profound emotions are often best expressed without words.
              </p>
            </div>
          </div>

          <div className="about-philosophy">
            <div className="about-philosophy-content">
              <span className="about-label">Our Philosophy</span>
              <h2 className="about-philosophy-heading">
                "Flowers Instead<br />of Words"
              </h2>
              <p className="about-philosophy-text">
                Our slogan is our guiding philosophy. In a world filled with constant noise,
                we believe in the eloquence of nature. Whether it's the breathtaking joy of a
                new romance, the deep gratitude for a friend, the celebratory spirit of a
                birthday, or the simple desire to brighten someone's day, we help you say it
                all through the language of blooms.
              </p>
            </div>
            <div className="about-philosophy-visual">
              <div className="about-stat-card">
                <p className="about-stat-number">2026</p>
                <p className="about-stat-label">Founded</p>
              </div>
              <div className="about-stat-card">
                <p className="about-stat-number">Addis</p>
                <p className="about-stat-label">Ababa</p>
              </div>
            </div>
          </div>

          <div className="about-what-we-do">
            <span className="about-label center">What We Do</span>
            <h2 className="about-section-heading center">
              Celebrating life's<br />beautiful moments
            </h2>
            <div className="about-cards">
              <div className="about-card">
                <div className="about-card-icon">
                  <img src="/images/bouquet.png" alt="" className="about-card-img" />
                </div>
                <h3>Anniversaries</h3>
                <p>Intimate arrangements that capture your unique love story.</p>
              </div>
              <div className="about-card">
                <div className="about-card-icon">
                  <img src="/images/bouquet.png" alt="" className="about-card-img" />
                </div>
                <h3>Weddings</h3>
                <p>Grand floral designs for your most unforgettable day.</p>
              </div>
              <div className="about-card">
                <div className="about-card-icon">
                  <img src="/images/bouquet.png" alt="" className="about-card-img" />
                </div>
                <h3>Corporate Events</h3>
                <p>Professional arrangements that elevate any occasion.</p>
              </div>
              <div className="about-card">
                <div className="about-card-icon">
                  <img src="/images/bouquet.png" alt="" className="about-card-img" />
                </div>
                <h3>Just Because</h3>
                <p>Say it all with a thoughtful, heartfelt bouquet.</p>
              </div>
            </div>
          </div>

          <div className="about-founder">
            <div className="about-founder-image">
              <img src="/images/bouquet.png" alt="Ruth, founder of Roots Bloom" className="about-founder-img" />
            </div>
            <div className="about-founder-content">
              <span className="about-label">Meet the Founder</span>
              <h2 className="about-founder-heading">Ruth</h2>
              <p className="about-founder-text">
                Under Ruth's creative direction, Roots Bloom is more than just a flower
                shop; it's a destination for those who seek beauty, artistry, and a more
                meaningful way to connect. Each bouquet is a carefully composed story,
                designed to capture the unique sentiment you wish to share.
              </p>
              <Link to="/contact" className="btn btn-primary">
                Get in Touch
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
              </Link>
            </div>
          </div>

          <div className="about-cta">
            <h2 className="about-cta-heading">
              Let us help you find the perfect<br />
              arrangement to let your heart speak.
            </h2>
            <p className="about-cta-text">
              Because when it matters most, choose flowers instead of words.
            </p>
            <Link to="/shop" className="btn btn-primary">
              Shop Now
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
