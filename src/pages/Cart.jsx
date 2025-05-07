import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { FaShoppingCart, FaTrashAlt, FaLock, FaTag } from 'react-icons/fa';
import './Cart.css';

function Cart() {
  const { cartItems, cartTotal, updateQuantity, removeFromCart, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState('');
  
  const shipping = cartTotal >= 999 ? 0 : 49.99;
  const discount = promoApplied ? cartTotal * 0.1 : 0; // 10% discount
  const estimatedTax = (cartTotal - discount) * 0.08; // 8% tax
  const orderTotal = cartTotal - discount + shipping + estimatedTax;
  
  const handleQuantityChange = (productId, quantity) => {
    updateQuantity(productId, quantity);
  };
  
  const handleRemoveItem = (productId) => {
    removeFromCart(productId);
  };
  
  const handleApplyPromo = (e) => {
    e.preventDefault();
    
    if (promoCode.toLowerCase() === 'welcome10') {
      setPromoApplied(true);
      setPromoError('');
    } else {
      setPromoApplied(false);
      setPromoError('Invalid promo code');
    }
  };
  
  if (cartItems.length === 0) {
    return (
      <div className="empty-cart">
        <div className="empty-cart-icon">
          <FaShoppingCart />
        </div>
        <h2>Your cart is empty</h2>
        <p>Looks like you haven't added any items to your cart yet.</p>
        <Link to="/" className="btn btn-primary">Continue Shopping</Link>
      </div>
    );
  }
  
  return (
    <div className="cart-page">
      <h1 className="page-title">Shopping Cart</h1>
      
      <div className="cart-container">
        <div className="cart-items">
          <div className="cart-headers">
            <div className="cart-header-product">Product</div>
            <div className="cart-header-price">Price</div>
            <div className="cart-header-quantity">Quantity</div>
            <div className="cart-header-total">Total</div>
            <div className="cart-header-actions"></div>
          </div>
          
          {cartItems.map((item) => (
            <div className="cart-item" key={item.id}>
              <div className="cart-item-product">
                <div className="cart-item-image">
                  <img src={item.images[0]} alt={item.name} />
                </div>
                <div className="cart-item-details">
                  <Link to={`/product/${item.id}`} className="cart-item-name">{item.name}</Link>
                  <div className="cart-item-category">{item.category}</div>
                </div>
              </div>
              
              <div className="cart-item-price">
                ${item.price.toFixed(2)}
              </div>
              
              <div className="cart-item-quantity">
                <div className="quantity-selector cart-quantity">
                  <button 
                    className="quantity-btn" 
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >-</button>
                  <input 
                    type="number" 
                    min="1" 
                    value={item.quantity} 
                    onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                  />
                  <button 
                    className="quantity-btn" 
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                  >+</button>
                </div>
              </div>
              
              <div className="cart-item-total">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
              
              <div className="cart-item-actions">
                <button 
                  className="btn-icon remove-item" 
                  onClick={() => handleRemoveItem(item.id)}
                  aria-label="Remove item"
                >
                  <FaTrashAlt />
                </button>
              </div>
            </div>
          ))}
          
          <div className="cart-actions">
            <div className="cart-promo">
              <form onSubmit={handleApplyPromo}>
                <div className="promo-input">
                  <div className="input-with-icon">
                    <FaTag className="input-icon" />
                    <input 
                      type="text" 
                      placeholder="Promo code" 
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                    />
                  </div>
                  <button type="submit" className="btn btn-outline">Apply</button>
                </div>
                {promoError && <div className="promo-error">{promoError}</div>}
                {promoApplied && <div className="promo-success">Promo code applied!</div>}
                <div className="promo-hint">Try "WELCOME10" for 10% off</div>
              </form>
            </div>
            
            <div className="cart-buttons">
              <Link to="/" className="btn btn-outline">Continue Shopping</Link>
              <button className="btn btn-outline" onClick={clearCart}>Clear Cart</button>
            </div>
          </div>
        </div>
        
        <div className="cart-summary">
          <h2>Order Summary</h2>
          
          <div className="summary-row">
            <span>Subtotal:</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
          
          {promoApplied && (
            <div className="summary-row discount">
              <span>Discount (10%):</span>
              <span>-${discount.toFixed(2)}</span>
            </div>
          )}
          
          <div className="summary-row">
            <span>Shipping:</span>
            <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
          </div>
          
          <div className="summary-row">
            <span>Estimated Tax:</span>
            <span>${estimatedTax.toFixed(2)}</span>
          </div>
          
          <div className="summary-row total">
            <span>Order Total:</span>
            <span>${orderTotal.toFixed(2)}</span>
          </div>
          
          <div className="checkout-section">
            <Link 
              to={isAuthenticated ? "/checkout" : "/login?redirect=checkout"} 
              className="btn btn-primary checkout-btn"
            >
              <FaLock /> Proceed to Checkout
            </Link>
            
            <div className="secure-checkout">
              <FaLock /> Secure Checkout
            </div>
            
            <div className="accepted-payments">
              <img src="https://placehold.co/280x40?text=Accepted+Payment+Methods" alt="Accepted payment methods" />
            </div>
          </div>
          
          <div className="summary-info">
            <div className="info-item">
              <h4>Free Shipping</h4>
              <p>On all orders over $999</p>
            </div>
            
            <div className="info-item">
              <h4>Easy Returns</h4>
              <p>30-day return policy</p>
            </div>
            
            <div className="info-item">
              <h4>Secure Checkout</h4>
              <p>SSL encrypted payment</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;