import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { FaShoppingCart, FaUser, FaBars, FaTimes, FaSearch, FaHeart } from 'react-icons/fa';
import './Header.css';

function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrollPosition, setScrollPosition] = useState(0);
  const { cartCount } = useCart();
  const { isAuthenticated, currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Track scroll position for header styling
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close mobile nav when route changes
  useEffect(() => {
    setIsNavOpen(false);
  }, [location]);
  
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
    // Close search if opening nav
    if (!isNavOpen) setIsSearchOpen(false);
  };
  
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    // Close nav if opening search
    if (!isSearchOpen) setIsNavOpen(false);
  };
  
  return (
    <header className={`header ${scrollPosition > 50 ? 'header-scrolled' : ''}`}>
      <div className="header-container">
        <div className="header-left">
          <button 
            className="mobile-menu-btn" 
            onClick={toggleNav}
            aria-label="Toggle navigation menu"
          >
            {isNavOpen ? <FaTimes /> : <FaBars />}
          </button>
          
          <Link to="/" className="logo">
            <h1>Luxe<span>Home</span></h1>
          </Link>
        </div>
        
        <nav className={`main-nav ${isNavOpen ? 'nav-open' : ''}`}>
          <ul className="nav-list">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/category/sofas">Sofas</Link></li>
            <li><Link to="/category/chairs">Chairs</Link></li>
            <li><Link to="/category/tables">Tables</Link></li>
            <li><Link to="/category/lighting">Lighting</Link></li>
            <li><Link to="/category/decor">Decor</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </nav>
        
        <div className="header-right">
          <button 
            className="icon-btn search-btn"
            onClick={toggleSearch}
            aria-label="Search products"
          >
            <FaSearch />
          </button>
          
          <Link to="/wishlist" className="icon-btn wishlist-btn">
            <FaHeart />
          </Link>
          
          <Link to="/cart" className="icon-btn cart-btn">
            <FaShoppingCart />
            {cartCount > 0 && (
              <span className="cart-count">{cartCount}</span>
            )}
          </Link>
          
          {isAuthenticated ? (
            <div className="user-menu">
              <button className="icon-btn user-btn">
                <FaUser />
              </button>
              <div className="user-dropdown">
                <div className="user-info">
                  <span className="user-name">{currentUser.name}</span>
                  <span className="user-email">{currentUser.email}</span>
                </div>
                <ul>
                  <li><Link to="/account">My Account</Link></li>
                  <li><Link to="/orders">My Orders</Link></li>
                  <li><button onClick={handleLogout}>Logout</button></li>
                </ul>
              </div>
            </div>
          ) : (
            <Link to="/login" className="icon-btn user-btn">
              <FaUser />
            </Link>
          )}
        </div>
      </div>
      
      <div className={`search-overlay ${isSearchOpen ? 'search-open' : ''}`}>
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for products..."
            autoFocus={isSearchOpen}
          />
          <button type="submit" aria-label="Submit search">
            <FaSearch />
          </button>
          <button 
            type="button" 
            className="close-search" 
            onClick={() => setIsSearchOpen(false)}
            aria-label="Close search"
          >
            <FaTimes />
          </button>
        </form>
      </div>
    </header>
  );
}

export default Header;