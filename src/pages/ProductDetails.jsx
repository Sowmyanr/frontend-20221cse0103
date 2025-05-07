import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { getProductById, getSimilarProducts } from '../data/products';
import ProductCard from '../components/ProductCard';
import { FaStar, FaStarHalfAlt, FaRegStar, FaHeart, FaRegHeart, FaShoppingCart, FaCheck, FaShare } from 'react-icons/fa';
import './ProductDetails.css';

function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  
  useEffect(() => {
    // Get product and similar products
    setLoading(true);
    
    // Scroll to top when product changes
    window.scrollTo(0, 0);
    
    // Simulate loading time for demo purposes
    setTimeout(() => {
      const foundProduct = getProductById(id);
      
      if (foundProduct) {
        setProduct(foundProduct);
        setSimilarProducts(getSimilarProducts(id, 4));
      }
      
      setLoading(false);
    }, 500);
  }, [id]);
  
  // Generate rating stars
  const renderRatingStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} />);
    }
    
    // Add half star if needed
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" />);
    }
    
    // Fill remaining with empty stars
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} />);
    }
    
    return stars;
  };
  
  const handleAddToCart = () => {
    addToCart(product, quantity);
  };
  
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };
  
  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };
  
  const decrementQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };
  
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading product details...</p>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="not-found-container">
        <h2>Product Not Found</h2>
        <p>The product you're looking for doesn't exist or has been removed.</p>
        <Link to="/" className="btn btn-primary">Return to Home</Link>
      </div>
    );
  }
  
  const { name, price, description, images, category, rating, reviewCount, inStock, dimensions, materials, colors } = product;
  
  // Format price
  const formattedPrice = price.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  });
  
  return (
    <div className="product-details-page">
      <div className="breadcrumbs">
        <Link to="/">Home</Link> / 
        <Link to={`/category/${category}`}>{category.charAt(0).toUpperCase() + category.slice(1)}</Link> / 
        <span>{name}</span>
      </div>
      
      <div className="product-details-container">
        <div className="product-gallery">
          <div className="main-image">
            <img src={images[activeImage]} alt={name} />
          </div>
          
          <div className="thumbnails">
            {images.map((image, index) => (
              <div 
                key={index}
                className={`thumbnail ${activeImage === index ? 'active' : ''}`}
                onClick={() => setActiveImage(index)}
              >
                <img src={image} alt={`${name} - View ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>
        
        <div className="product-info-container">
          <div className="product-category">{category.charAt(0).toUpperCase() + category.slice(1)}</div>
          <h1 className="product-name">{name}</h1>
          
          <div className="product-meta">
            <div className="rating">
              <div className="stars">
                {renderRatingStars(rating)}
              </div>
              <span>{rating.toFixed(1)}</span>
              <a href="#reviews" className="review-count">({reviewCount} reviews)</a>
            </div>
            
            {inStock > 0 ? (
              <div className="stock in-stock">
                <FaCheck /> In Stock ({inStock} available)
              </div>
            ) : (
              <div className="stock out-of-stock">Out of Stock</div>
            )}
          </div>
          
          <div className="product-price">{formattedPrice}</div>
          
          <div className="product-description">
            <p>{description}</p>
          </div>
          
          <div className="product-actions">
            <div className="quantity-selector">
              <button 
                className="quantity-btn" 
                onClick={decrementQuantity}
                disabled={!inStock}
              >-</button>
              <input 
                type="number" 
                min="1" 
                value={quantity} 
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                disabled={!inStock}
              />
              <button 
                className="quantity-btn" 
                onClick={incrementQuantity}
                disabled={!inStock}
              >+</button>
            </div>
            
            <button 
              className="btn btn-primary add-to-cart-btn"
              onClick={handleAddToCart}
              disabled={!inStock}
            >
              <FaShoppingCart /> Add to Cart
            </button>
            
            <button 
              className={`btn btn-outline favorite-btn ${isFavorite ? 'is-favorite' : ''}`}
              onClick={toggleFavorite}
            >
              {isFavorite ? <FaHeart /> : <FaRegHeart />}
            </button>
            
            <button className="btn btn-outline share-btn">
              <FaShare />
            </button>
          </div>
          
          <div className="product-details">
            <div className="details-section">
              <h3>Dimensions</h3>
              <ul>
                {dimensions.width && <li>Width: {dimensions.width} inches</li>}
                {dimensions.depth && <li>Depth: {dimensions.depth} inches</li>}
                {dimensions.height && <li>Height: {dimensions.height} inches</li>}
                {dimensions.diameter && <li>Diameter: {dimensions.diameter} inches</li>}
              </ul>
            </div>
            
            <div className="details-section">
              <h3>Materials</h3>
              <ul>
                {materials.map((material, index) => (
                  <li key={index}>{material}</li>
                ))}
              </ul>
            </div>
            
            <div className="details-section">
              <h3>Available Colors</h3>
              <div className="color-options">
                {colors.map((color, index) => (
                  <div 
                    key={index} 
                    className="color-option"
                    style={{ backgroundColor: getColorCode(color) }}
                    title={color}
                  />
                ))}
              </div>
            </div>
          </div>
          
          <div className="shipping-info">
            <h3>Shipping & Returns</h3>
            <p>Free shipping on orders over $999. Standard delivery in 5-7 business days.</p>
            <p>Easy returns within 30 days of delivery. <a href="/returns">See our return policy</a>.</p>
          </div>
        </div>
      </div>
      
      {/* Similar Products */}
      <section className="similar-products section">
        <h2 className="section-title">You Might Also Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {similarProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}

// Helper function to convert color names to hex codes
function getColorCode(colorName) {
  const colorMap = {
    'Gray': '#808080',
    'Navy Blue': '#000080',
    'Cream': '#FFFDD0',
    'Brown': '#A52A2A',
    'Green': '#008000',
    'Black': '#000000',
    'Natural Wood': '#D2B48C',
    'White': '#FFFFFF',
    'Blue': '#0000FF',
    'Brass': '#B5A642',
    'Chrome': '#808080',
    'Bronze': '#CD7F32',
    'Natural': '#D2B48C',
    'Multi-color': 'linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)'
  };
  
  return colorMap[colorName] || '#CCCCCC'; // Default to gray if color not found
}

export default ProductDetails;