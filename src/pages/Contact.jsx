import { useState } from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaUserAlt, FaCommentAlt } from 'react-icons/fa';
import './Contact.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError('');
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    }, 1500);
  };
  
  return (
    <div className="contact-page">
      <section className="contact-hero">
        <div className="contact-hero-content">
          <h1>Contact Us</h1>
          <p>We'd love to hear from you. Get in touch with our team.</p>
        </div>
      </section>
      
      <section className="contact-section">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info">
              <h2>Get In Touch</h2>
              <p>
                Have questions about our products, delivery, or need design advice? 
                Our customer service team is here to help.
              </p>
              
              <div className="contact-details">
                <div className="contact-item">
                  <div className="contact-icon">
                    <FaMapMarkerAlt />
                  </div>
                  <div className="contact-text">
                    <h3>Visit Us</h3>
                    <p>123 Furniture Lane<br />Design District, CA 90210</p>
                  </div>
                </div>
                
                <div className="contact-item">
                  <div className="contact-icon">
                    <FaPhone />
                  </div>
                  <div className="contact-text">
                    <h3>Call Us</h3>
                    <p>(555) 123-4567</p>
                  </div>
                </div>
                
                <div className="contact-item">
                  <div className="contact-icon">
                    <FaEnvelope />
                  </div>
                  <div className="contact-text">
                    <h3>Email Us</h3>
                    <p>hello@luxehome.com</p>
                  </div>
                </div>
                
                <div className="contact-item">
                  <div className="contact-icon">
                    <FaClock />
                  </div>
                  <div className="contact-text">
                    <h3>Business Hours</h3>
                    <p>
                      Monday - Friday: 9am - 6pm<br />
                      Saturday: 10am - 4pm<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="contact-map">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.7152203498337!2d-118.3826276!3d34.0766338!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2b93cca9c7ab1%3A0x9b191d3aac3e37!2sDesign%20District%2C%20West%20Hollywood%2C%20CA%2090069!5e0!3m2!1sen!2sus!4v1658079134858!5m2!1sen!2sus"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="LuxeHome Location"
                ></iframe>
              </div>
            </div>
            
            <div className="contact-form-container">
              <h2>Send a Message</h2>
              {formSubmitted ? (
                <div className="form-success">
                  <div className="success-icon">✓</div>
                  <h3>Thank You!</h3>
                  <p>Your message has been sent successfully. We'll get back to you as soon as possible.</p>
                  <button 
                    className="btn btn-primary" 
                    onClick={() => setFormSubmitted(false)}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit}>
                  {formError && <div className="form-error">{formError}</div>}
                  
                  <div className="form-group">
                    <label htmlFor="name">Your Name*</label>
                    <div className="input-with-icon">
                      <FaUserAlt className="input-icon" />
                      <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="email">Email Address*</label>
                      <div className="input-with-icon">
                        <FaEnvelope className="input-icon" />
                        <input 
                          type="email" 
                          id="email" 
                          name="email" 
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Enter your email"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="phone">Phone Number</label>
                      <div className="input-with-icon">
                        <FaPhone className="input-icon" />
                        <input 
                          type="tel" 
                          id="phone" 
                          name="phone" 
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="Enter your phone number"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="subject">Subject*</label>
                    <input 
                      type="text" 
                      id="subject" 
                      name="subject" 
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="What is this regarding?"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="message">Message*</label>
                    <div className="input-with-icon textarea-with-icon">
                      <FaCommentAlt className="input-icon" />
                      <textarea 
                        id="message" 
                        name="message" 
                        rows="6" 
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="How can we help you?"
                        required
                      ></textarea>
                    </div>
                  </div>
                  
                  <div className="form-group checkbox-group">
                    <label className="checkbox-label">
                      <input type="checkbox" required />
                      <span>I agree to the processing of my personal data in accordance with the <a href="/privacy">Privacy Policy</a>.</span>
                    </label>
                  </div>
                  
                  <button type="submit" className="btn btn-primary btn-block" disabled={isSubmitting}>
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
      
      <section className="showrooms-section">
        <div className="container">
          <h2 className="section-title">Visit Our Showrooms</h2>
          <div className="showrooms-grid">
            <div className="showroom-card">
              <div className="showroom-image">
                <img 
                  src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600" 
                  alt="Los Angeles Showroom" 
                />
              </div>
              <div className="showroom-info">
                <h3>Los Angeles</h3>
                <p>123 Furniture Lane<br />Design District, CA 90210</p>
                <p><strong>Phone:</strong> (555) 123-4567</p>
                <p><strong>Hours:</strong> Mon-Sat, 10am-6pm</p>
                <a href="#" className="btn btn-outline btn-sm">Get Directions</a>
              </div>
            </div>
            
            <div className="showroom-card">
              <div className="showroom-image">
                <img 
                  src="https://images.pexels.com/photos/276583/pexels-photo-276583.jpeg?auto=compress&cs=tinysrgb&w=600" 
                  alt="New York Showroom" 
                />
              </div>
              <div className="showroom-info">
                <h3>New York</h3>
                <p>456 Design Avenue<br />SoHo, NY 10013</p>
                <p><strong>Phone:</strong> (555) 987-6543</p>
                <p><strong>Hours:</strong> Mon-Sat, 10am-7pm</p>
                <a href="#" className="btn btn-outline btn-sm">Get Directions</a>
              </div>
            </div>
            
            <div className="showroom-card">
              <div className="showroom-image">
                <img 
                  src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600" 
                  alt="Chicago Showroom" 
                />
              </div>
              <div className="showroom-info">
                <h3>Chicago</h3>
                <p>789 Home Street<br />River North, IL 60654</p>
                <p><strong>Phone:</strong> (555) 456-7890</p>
                <p><strong>Hours:</strong> Mon-Sat, 10am-6pm</p>
                <a href="#" className="btn btn-outline btn-sm">Get Directions</a>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="faq-section">
        <div className="container">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h3>What is your delivery timeframe?</h3>
              <p>
                Most in-stock items are delivered within 7-10 business days. Custom and made-to-order 
                items typically take 4-8 weeks, depending on the product and manufacturer.
              </p>
            </div>
            
            <div className="faq-item">
              <h3>Do you offer assembly services?</h3>
              <p>
                Yes, we offer professional assembly for most furniture items for an additional fee. 
                This can be added during checkout or by contacting our customer service team.
              </p>
            </div>
            
            <div className="faq-item">
              <h3>What is your return policy?</h3>
              <p>
                We offer a 30-day return policy for most items in their original condition. Custom and 
                made-to-order items are non-returnable. Please see our full return policy for details.
              </p>
            </div>
            
            <div className="faq-item">
              <h3>Do you offer design consultation services?</h3>
              <p>
                Yes, we offer complimentary design consultations with our in-house interior designers. 
                You can book an appointment online or by contacting our customer service team.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;