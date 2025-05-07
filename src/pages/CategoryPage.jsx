import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { getProductsByCategory } from '../data/products';
import './CategoryPage.css';

function CategoryPage() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState('featured');
  const [filterOptions, setFilterOptions] = useState({
    priceRange: [0, 5000],
    inStock: false
  });
  
  // Category titles and descriptions
  const categoryInfo = {
    sofas: {
      title: 'Sofas & Sectionals',
      description: 'Discover our collection of comfortable and stylish sofas and sectionals, perfect for creating a welcoming living space.'
    },
    chairs: {
      title: 'Chairs',
      description: 'Explore our range of chairs for dining, lounging, and working, designed for both comfort and style.'
    },
    tables: {
      title: 'Tables',
      description: 'Browse our selection of dining, coffee, and side tables that combine functionality with beautiful design.'
    },
    lighting: {
      title: 'Lighting',
      description: 'Illuminate your space with our curated collection of table lamps, floor lamps, pendants, and chandeliers.'
    },
    decor: {
      title: 'Home Decor',
      description: 'Add the finishing touches to your home with our decorative accessories, artwork, and accent pieces.'
    }
  };
  
  useEffect(() => {
    // Get products for the selected category
    setLoading(true);
    
    // Simulate loading time for demo purposes
    setTimeout(() => {
      const categoryProducts = getProductsByCategory(category);
      setProducts(categoryProducts);
      setLoading(false);
    }, 500);
  }, [category]);
  
  // Sort products based on selected option
  const getSortedProducts = () => {
    if (!products.length) return [];
    
    const filteredProducts = products.filter(product => {
      // Filter by price range
      const priceInRange = product.price >= filterOptions.priceRange[0] && 
                          product.price <= filterOptions.priceRange[1];
      
      // Filter by stock status if inStock filter is enabled
      const stockStatus = filterOptions.inStock ? product.inStock > 0 : true;
      
      return priceInRange && stockStatus;
    });
    
    switch (sortOption) {
      case 'price-low':
        return [...filteredProducts].sort((a, b) => a.price - b.price);
      case 'price-high':
        return [...filteredProducts].sort((a, b) => b.price - a.price);
      case 'rating':
        return [...filteredProducts].sort((a, b) => b.rating - a.rating);
      case 'name-az':
        return [...filteredProducts].sort((a, b) => a.name.localeCompare(b.name));
      case 'name-za':
        return [...filteredProducts].sort((a, b) => b.name.localeCompare(a.name));
      case 'featured':
      default:
        return [...filteredProducts].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
  };
  
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };
  
  const handlePriceChange = (e, index) => {
    const value = parseInt(e.target.value);
    setFilterOptions(prev => {
      const newPriceRange = [...prev.priceRange];
      newPriceRange[index] = value;
      return { ...prev, priceRange: newPriceRange };
    });
  };
  
  const handleStockFilterChange = () => {
    setFilterOptions(prev => ({
      ...prev,
      inStock: !prev.inStock
    }));
  };
  
  // Get the sorted and filtered products
  const displayProducts = getSortedProducts();
  
  // Get the appropriate title and description
  const title = categoryInfo[category]?.title || category.charAt(0).toUpperCase() + category.slice(1);
  const description = categoryInfo[category]?.description || `Browse our collection of ${category}.`;
  
  return (
    <div className="category-page">
      <div className="category-header">
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      
      <div className="category-content">
        <aside className="filters-sidebar">
          <h3>Filters</h3>
          
          <div className="filter-section">
            <h4>Price Range</h4>
            <div className="price-inputs">
              <div className="price-input">
                <label htmlFor="min-price">Min</label>
                <div className="input-with-prefix">
                  <span>$</span>
                  <input 
                    type="number" 
                    id="min-price" 
                    min="0" 
                    max={filterOptions.priceRange[1]} 
                    value={filterOptions.priceRange[0]}
                    onChange={(e) => handlePriceChange(e, 0)}
                  />
                </div>
              </div>
              
              <div className="price-input">
                <label htmlFor="max-price">Max</label>
                <div className="input-with-prefix">
                  <span>$</span>
                  <input 
                    type="number" 
                    id="max-price" 
                    min={filterOptions.priceRange[0]} 
                    value={filterOptions.priceRange[1]}
                    onChange={(e) => handlePriceChange(e, 1)}
                  />
                </div>
              </div>
            </div>
            
            <div className="price-range">
              <input 
                type="range" 
                min="0" 
                max="5000" 
                step="100"
                value={filterOptions.priceRange[0]}
                onChange={(e) => handlePriceChange(e, 0)}
                className="price-slider min-slider"
              />
              <input 
                type="range" 
                min="0" 
                max="5000" 
                step="100"
                value={filterOptions.priceRange[1]}
                onChange={(e) => handlePriceChange(e, 1)}
                className="price-slider max-slider"
              />
            </div>
          </div>
          
          <div className="filter-section">
            <h4>Availability</h4>
            <label className="checkbox-label">
              <input 
                type="checkbox" 
                checked={filterOptions.inStock}
                onChange={handleStockFilterChange}
              />
              <span>In Stock Only</span>
            </label>
          </div>
        </aside>
        
        <div className="products-container">
          <div className="products-header">
            <div className="products-count">
              {displayProducts.length} products
            </div>
            
            <div className="sort-options">
              <label htmlFor="sort-select">Sort by:</label>
              <select 
                id="sort-select" 
                value={sortOption}
                onChange={handleSortChange}
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
                <option value="name-az">Name: A to Z</option>
                <option value="name-za">Name: Z to A</option>
              </select>
            </div>
          </div>
          
          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Loading products...</p>
            </div>
          ) : (
            <>
              {displayProducts.length === 0 ? (
                <div className="no-products-message">
                  <p>No products match your current filters. Try adjusting your criteria.</p>
                </div>
              ) : (
                <div className="products-grid">
                  {displayProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default CategoryPage;