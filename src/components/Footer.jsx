import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarker, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';



const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer">
        <div className="footer-content">
          <div className="newsletter">
            <h2>Subscribe to Our Newsletter</h2>
            <form className="newsletter-form">
              <input className="newsletter-input" placeholder="Email here" />
              <button className="newsletter-btn">Submit</button>
            </form>
          </div>
          <div className="footer-row">
            <div className="footer-column">
              <div className="footer-about">
                <h3>About Us</h3>
                <p>
                At Ink and Wandee, we believe in books, magic, and making your next adventure just a click away. Follow us on our socials for bookish updates, exclusive deals, and a little bit of bookish wizardry!
                </p>
              </div>
            </div>

            <div className="footer-column">
              <div className="footer-links">
                <h3>Useful Links</h3>
                <a href="/">Home</a>
                <a href="/products">Products</a>
                <a href="/signup">Signup</a>
                <a href="/contact">Contact Us</a>
              </div>
            </div>

            <div className="footer-column">
              <div className="footer-links">
                <h3>Our Book Categories</h3>
                <a href="#">Fiction</a>
                <a href="#">Non-Fiction</a>
                <a href="#">Children's Books</a>
                <a href="#">Textbooks</a>
                <a href="#">Cookbooks</a>
              </div>
            </div>

            <div className="footer-column">
              <div className="footer-contact">
                <h3>Get In Touch</h3>
                <p>
                  <FontAwesomeIcon icon={faMapMarker} /> 8762 Cinderella Street, Charlotte, NC 56578
                </p>
                <p>
                  <FontAwesomeIcon icon={faPhone} /> +1 (567)-098-4568
                </p>
                <p>
                  <FontAwesomeIcon icon={faEnvelope} /> InkNWandBooks@email.com
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-menu">
          <div className="f-menu">
            <a href="#">Terms of Use</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Cookies</a>
            <a href="#">Help</a>
            <a href="#">FAQs</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
