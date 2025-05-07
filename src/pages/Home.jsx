import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { getFeaturedProducts, getNewArrivals, getProductsByCategory } from '../data/products';
import { FaCouch, FaChair, FaTable, FaLightbulb, FaPaintBrush } from 'react-icons/fa';
import './Home.css';

function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [categoryShowcase, setCategoryShowcase] = useState({});
  
  useEffect(() => {
    // Get products for the homepage
    setFeaturedProducts(getFeaturedProducts());
    setNewArrivals(getNewArrivals(8));
    
    // Get 4 products from each category for the showcase
    const categories = ['sofas', 'chairs', 'tables', 'lighting', 'decor'];
    const showcase = {};
    
    categories.forEach(category => {
      showcase[category] = getProductsByCategory(category).slice(0, 4);
    });
    
    setCategoryShowcase(showcase);
  }, []);
  
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Elevate Your Home</h1>
          <p className="hero-subtitle">Discover timeless furniture and decor for every space</p>
          <div className="hero-buttons">
            <Link to="/category/sofas" className="btn btn-primary btn-lg">Shop Now</Link>
            <Link to="/about" className="btn btn-outline btn-lg">Learn More</Link>
          </div>
        </div>
      </section>
      
      {/* Category Navigation */}
      <section className="category-nav section">
        <div className="container">
          <div className="category-nav-grid">
            <Link to="/category/sofas" className="category-nav-item">
              <div className="category-icon">
                <FaCouch />
              </div>
              <span>Sofas</span>
            </Link>
            <Link to="/category/chairs" className="category-nav-item">
              <div className="category-icon">
                <FaChair />
              </div>
              <span>Chairs</span>
            </Link>
            <Link to="/category/tables" className="category-nav-item">
              <div className="category-icon">
                <FaTable />
              </div>
              <span>Tables</span>
            </Link>
            <Link to="/category/lighting" className="category-nav-item">
              <div className="category-icon">
                <FaLightbulb />
              </div>
              <span>Lighting</span>
            </Link>
            <Link to="/category/decor" className="category-nav-item">
              <div className="category-icon">
                <FaPaintBrush />
              </div>
              <span>Decor</span>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="featured-products section">
        <div className="container">
          <h2 className="section-title">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/featured" className="btn btn-outline">View All Featured</Link>
          </div>
        </div>
      </section>
      
      {/* Banner - Living Room */}
      <section className="promo-banner living-room-banner">
        <div className="banner-content">
          <h2>Living Room Collections</h2>
          <p>Create a cohesive space with our curated living room sets</p>
          <Link to="/category/sofas" className="btn btn-secondary">Explore Living Room</Link>
        </div>
      </section>
      
      {/* New Arrivals */}
      <section className="new-arrivals section">
        <div className="container">
          <h2 className="section-title">New Arrivals</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {newArrivals.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/new-arrivals" className="btn btn-outline">View All New Arrivals</Link>
          </div>
        </div>
      </section>
      
      {/* Banner - Dining Room */}
      <section className="promo-banner dining-room-banner">
        <div className="banner-content">
          <h2>Dining & Entertainment</h2>
          <p>Set the stage for memorable gatherings</p>
          <Link to="/category/tables" className="btn btn-secondary">Shop Dining</Link>
        </div>
      </section>
      
      {/* Category Showcase */}
      {Object.keys(categoryShowcase).map((category, index) => (
        <section className="category-showcase section" key={category}>
          <div className="container">
            <div className="section-header space-between">
              <h2 className="section-title">{category.charAt(0).toUpperCase() + category.slice(1)}</h2>
              <Link to={`/category/${category}`} className="view-all-link">View All</Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {categoryShowcase[category].map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      ))}
      
      {/* Features Section */}
      <section className="features-section section">
        <div className="container">
          <div className="features-grid">
            <div className="feature">
              <div className="feature-icon">🚚</div>
              <h3>Free Shipping</h3>
              <p>On orders over $999</p>
            </div>
            <div className="feature">
              <div className="feature-icon">🛡️</div>
              <h3>5-Year Warranty</h3>
              <p>On all furniture items</p>
            </div>
            <div className="feature">
              <div className="feature-icon">↩️</div>
              <h3>30-Day Returns</h3>
              <p>Hassle-free return policy</p>
            </div>
            <div className="feature">
              <div className="feature-icon">👨‍💼</div>
              <h3>Expert Support</h3>
              <p>Interior design consultation</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Newsletter */}
      <section className="newsletter-section section">
        <div className="container">
          <div className="newsletter-content">
            <h2>Join Our Community</h2>
            <p>Subscribe to receive exclusive offers, design tips, and new product announcements.</p>
            <form className="newsletter-form-large">
              <div className="input-with-button-large">
                <input type="email" placeholder="Enter your email address" required />
                <button type="submit" className="btn btn-primary">Subscribe</button>
              </div>
              <p className="privacy-note">By subscribing, you agree to our Privacy Policy and Terms of Service.</p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;