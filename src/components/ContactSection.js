import React from 'react';
import './ContactSection.css';

const ContactSection = () => {
  return (
    <section className="contact-section">
      <div className="contact-item">
        <div className="contact-icon">
          <img src="/email.png" alt="Mail" />
        </div>
        <div className="contact-info">
          <h3>Contact</h3>
          <p>We're here to help with any questions or support you need.</p>
          <a href="mailto:penny.wise.project24@gmail.com">penny.wise.project24@gmail.com</a>
        </div>
      </div>
      <div className="contact-item">
        <div className="contact-icon">
          <img src="/phone.png" alt="Phone" />
        </div>
        <div className="contact-info">
          <h3>Phone</h3>
          <p>Reach out to us for immediate assistance.</p>
          <a href="tel:+4219557545544">+4 (219) 557-5455 </a>
        </div>
      </div>
      <div className="contact-item">
        <div className="contact-icon">
          <img src="/office.png" alt="Office" />
        </div>
        <div className="contact-info">
          <h3>Office</h3>
          <p>Visit us for in-person support and consultations.</p>
          <a href="https://maps.app.goo.gl/mEnBEcvoacodKy6b7" target="_blank" rel="noreferrer">
          Technická univerzita v Košiciach
          Letná 1/9, 042 00 Košice
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
