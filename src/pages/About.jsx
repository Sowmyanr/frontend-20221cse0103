import { Link } from 'react-router-dom';
import './About.css';

function About() {
  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="about-hero-content">
          <h1>About LuxeHome</h1>
          <p>Creating beautiful spaces since 2020</p>
        </div>
      </section>
      
      <section className="about-section">
        <div className="container">
          <div className="about-grid">
            <div className="about-text">
              <h2>Our Story</h2>
              <p>
                LuxeHome began with a simple vision: to make beautiful, high-quality furniture accessible to everyone. 
                Founded in 2020, we started as a small boutique with a curated collection of handpicked pieces.
              </p>
              <p>
                Today, we've grown into a destination for design enthusiasts and homeowners looking to create 
                spaces that reflect their unique style and personality. Our collection has expanded to include 
                furniture, lighting, and decor from established and emerging designers.
              </p>
              <p>
                What hasn't changed is our commitment to quality, craftsmanship, and creating pieces that stand 
                the test of time. We believe that your home should be a reflection of who you are, and we're here 
                to help you create spaces you love.
              </p>
            </div>
            <div className="about-image">
              <img 
                src="https://images.pexels.com/photos/3932930/pexels-photo-3932930.jpeg?auto=compress&cs=tinysrgb&w=600" 
                alt="Elegant living room setting" 
              />
            </div>
          </div>
        </div>
      </section>
      
      <section className="values-section">
        <div className="container">
          <h2 className="section-title">Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">🌿</div>
              <h3>Sustainability</h3>
              <p>
                We're committed to reducing our environmental impact by sourcing sustainable materials, 
                partnering with eco-conscious manufacturers, and implementing green practices throughout our operations.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">✨</div>
              <h3>Quality</h3>
              <p>
                We believe in creating furniture that lasts. Each piece in our collection is carefully selected for 
                its durability, craftsmanship, and timeless design.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">🎨</div>
              <h3>Design</h3>
              <p>
                Great design has the power to transform spaces and improve daily life. We curate pieces that 
                balance form and function, creating furniture that's as beautiful as it is practical.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">👥</div>
              <h3>Community</h3>
              <p>
                We believe in building relationships with our customers, designers, and craftspeople. Our 
                community is at the heart of everything we do.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="team-section">
        <div className="container">
          <h2 className="section-title">Meet Our Team</h2>
          <div className="team-grid">
            <div className="team-member">
              <div className="team-image">
                <img 
                  src="https://images.pexels.com/photos/5704849/pexels-photo-5704849.jpeg?auto=compress&cs=tinysrgb&w=400" 
                  alt="Emma Wilson, Founder & CEO" 
                />
              </div>
              <h3>Emma Wilson</h3>
              <p className="team-title">Founder & CEO</p>
              <p className="team-bio">
                With over 15 years of experience in interior design, Emma founded LuxeHome with a vision 
                to make beautiful design accessible to everyone.
              </p>
            </div>
            <div className="team-member">
              <div className="team-image">
                <img 
                  src="https://images.pexels.com/photos/8100784/pexels-photo-8100784.jpeg?auto=compress&cs=tinysrgb&w=400" 
                  alt="Alex Chen, Creative Director" 
                />
              </div>
              <h3>Alex Chen</h3>
              <p className="team-title">Creative Director</p>
              <p className="team-bio">
                Alex brings his background in architecture and product design to curate our collection, 
                with an eye for pieces that marry form and function.
              </p>
            </div>
            <div className="team-member">
              <div className="team-image">
                <img 
                  src="https://images.pexels.com/photos/5397723/pexels-photo-5397723.jpeg?auto=compress&cs=tinysrgb&w=400" 
                  alt="Maya Johnson, Head of Operations" 
                />
              </div>
              <h3>Maya Johnson</h3>
              <p className="team-title">Head of Operations</p>
              <p className="team-bio">
                Maya ensures that everything runs smoothly behind the scenes, from sourcing and 
                logistics to customer service.
              </p>
            </div>
            <div className="team-member">
              <div className="team-image">
                <img 
                  src="https://images.pexels.com/photos/5490276/pexels-photo-5490276.jpeg?auto=compress&cs=tinysrgb&w=400" 
                  alt="James Rodriguez, Design Consultant" 
                />
              </div>
              <h3>James Rodriguez</h3>
              <p className="team-title">Lead Design Consultant</p>
              <p className="team-bio">
                With a passion for helping customers create their dream spaces, James leads our team 
                of design consultants.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to transform your space?</h2>
            <p>Browse our collection and find pieces that speak to you, or get in touch with our design team for personalized recommendations.</p>
            <div className="cta-buttons">
              <Link to="/" className="btn btn-primary">Shop Now</Link>
              <Link to="/contact" className="btn btn-outline">Contact Us</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;