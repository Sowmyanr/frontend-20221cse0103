import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { FaRegHeart, FaHeart, FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import './ProductCard.css';

function ProductCard({ product }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const { addToCart } = useCart();

  // Destructure product properties
  const { id, name, price, images, rating, reviewCount, inStock, category } = product;

  // Format price to include commas for thousands
  const formattedPrice = price.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  });

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

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
  };
  
  const toggleFavorite = (e) => {
    e.preventDefault();
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="product-card">
      <Link 
        to={`/product/${id}`} 
        className="product-link"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="product-image-container">
          <img 
            src={isHovered && images.length > 1 ? images[1] : images[0]} 
            alt={name}
            className="product-image"
          />
          
          <div className="product-overlay">
            <button 
              className="quick-add-btn" 
              onClick={handleAddToCart}
              disabled={!inStock}
            >
              {inStock ? 'Add to Cart' : 'Out of Stock'}
            </button>
            
            <button 
              className={`favorite-btn ${isFavorite ? 'is-favorite' : ''}`}
              onClick={toggleFavorite}
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              {isFavorite ? <FaHeart /> : <FaRegHeart />}
            </button>
          </div>
          
          <div className="product-tag">
            {product.featured && <span className="tag featured">Featured</span>}
            {inStock === 0 && <span className="tag out-of-stock">Out of Stock</span>}
            {inStock > 0 && inStock <= 5 && <span className="tag low-stock">Low Stock</span>}
          </div>
        </div>
        
        <div className="product-info">
          <div className="category-name">{category}</div>
          <h3 className="product-name">{name}</h3>
          
          <div className="product-price">
            {formattedPrice}
          </div>
          
          <div className="product-meta">
            <div className="rating">
              <div className="stars">
                {renderRatingStars(rating)}
              </div>
              <span className="review-count">({reviewCount})</span>
            </div>
            
            {inStock > 0 ? (
              <div className="stock in-stock">In Stock</div>
            ) : (
              <div className="stock out-of-stock">Out of Stock</div>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ProductCard;