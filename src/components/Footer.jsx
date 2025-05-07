import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaPinterest, FaYoutube, FaEnvelope } from 'react-icons/fa';
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-column">
              <h3 className="footer-logo">Luxe<span>Home</span></h3>
              <p className="footer-description">
                Bringing quality and style to your home with curated furniture and decor that elevates your living space.
              </p>
              <div className="social-icons">
                <a href="#" aria-label="Facebook"><FaFacebookF /></a>
                <a href="#" aria-label="Twitter"><FaTwitter /></a>
                <a href="#" aria-label="Instagram"><FaInstagram /></a>
                <a href="#" aria-label="Pinterest"><FaPinterest /></a>
                <a href="#" aria-label="YouTube"><FaYoutube /></a>
              </div>
            </div>
            
            <div className="footer-column">
              <h4>Shop</h4>
              <ul className="footer-links">
                <li><Link to="/category/sofas">Sofas</Link></li>
                <li><Link to="/category/chairs">Chairs</Link></li>
                <li><Link to="/category/tables">Tables</Link></li>
                <li><Link to="/category/lighting">Lighting</Link></li>
                <li><Link to="/category/decor">Decor</Link></li>
                <li><Link to="/new-arrivals">New Arrivals</Link></li>
                <li><Link to="/sale">Sale</Link></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h4>Company</h4>
              <ul className="footer-links">
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/contact">Contact Us</Link></li>
                <li><Link to="/careers">Careers</Link></li>
                <li><Link to="/blog">Blog</Link></li>
                <li><Link to="/showrooms">Showrooms</Link></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h4>Customer Service</h4>
              <ul className="footer-links">
                <li><Link to="/faq">FAQ</Link></li>
                <li><Link to="/shipping">Shipping & Delivery</Link></li>
                <li><Link to="/returns">Returns & Exchanges</Link></li>
                <li><Link to="/warranty">Warranty Information</Link></li>
                <li><Link to="/care">Product Care</Link></li>
                <li><Link to="/track-order">Track Your Order</Link></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h4>Stay Connected</h4>
              <p>Subscribe to our newsletter for updates, promotions, and design inspiration.</p>
              <form className="newsletter-form">
                <div className="input-with-button">
                  <input 
                    type="email" 
                    placeholder="Your email address" 
                    required 
                  />
                  <button type="submit" aria-label="Subscribe">
                    <FaEnvelope />
                  </button>
                </div>
              </form>
              <p className="small-text">
                By subscribing, you agree to our <Link to="/privacy">Privacy Policy</Link> and <Link to="/terms">Terms of Service</Link>.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-content">
            <p className="copyright">
              &copy; {currentYear} LuxeHome. All rights reserved.
            </p>
            <div className="payment-methods">
              <img src="https://placehold.co/320x40?text=Payment+Methods" alt="Accepted payment methods" />
            </div>
            <div className="legal-links">
              <Link to="/terms">Terms of Service</Link>
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/accessibility">Accessibility</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;