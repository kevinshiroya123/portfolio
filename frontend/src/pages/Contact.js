import React, { useEffect, useRef, useState } from "react";
import { db } from "../firebase"; // Import Firestore Database
import { collection, addDoc } from "firebase/firestore";
import "./Contact.css";
import instagramIcon from "../images/instagram.png";
import githubIcon from "../images/github.png";
import linkedinIcon from "../images/linkedin.png";

const Contact = () => {
  const contactRef = useRef(null);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Intersection Observer for Animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate");
          } else {
            entry.target.classList.remove("animate"); // Remove animation when out of view
          }
        });
      },
      { threshold: 0.3 } // Triggers animation when 30% of the section is visible
    );

    if (contactRef.current) observer.observe(contactRef.current);
    return () => {
      if (contactRef.current) observer.unobserve(contactRef.current);
    };
  }, []);

  // Handle Form Input Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Form Submission (Sends Data to Custom Backend API)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    
  try {
    const API_URL = process.env.REACT_APP_API_URL;
    const response = await fetch(`${API_URL}/send-message`, {

      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage("Message Sent Successfully! 🎉");
        setFormData({ name: "", email: "", message: "" }); // Reset Form
      } else {
        setSuccessMessage("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setSuccessMessage("Failed to send message.");
    }

    setIsSubmitting(false);
  };

  return (
    <section className="contact-section" ref={contactRef}>
      <h1 className="contact-title">Contact</h1>

      <div className="contact-container">
        {/* Left Section - Contact Form */}
        <div className="contact-form">
          <h2 className="contact-subtitle">Connect with me</h2>
          <p className="contact-description">
            If you want to know more about me or my work, or if you would just
            like to say hello, send me a message. I'd love to hear from you.
          </p>

          <form onSubmit={handleSubmit}>
            <label>Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your name" required />

            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" required />

            <label>Message</label>
            <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Enter your message" required></textarea>

            <button type="submit" className="submit-btn" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Submit"}
            </button>
          </form>

          {successMessage && <p className="success-message">{successMessage}</p>}

          <a href="mailto:kshiroya@csus.edu" className="email-direct">
            Send me an email directly
          </a>
        </div>

        {/* Right Section - Contact Details */}
        <div className="contact-info">
          <div className="contact-item">
            <h3>Email</h3>
            <a href="mailto:kshiroya@csus.edu">kshiroya@csus.edu</a>
          </div>

          <div className="contact-item">
            <h3>Address</h3>
            <p>41 Cadillac Dr, Sacramento, CA, USA</p>
          </div>

          {/* Social Icons */}
          <div className="social-container">
            <h3>Social</h3>
            <div className="social-container-social-icons">
              <a href="https://instagram.com/kevin_shiroya__" target="_blank" rel="noopener noreferrer">
                <img src={instagramIcon} alt="Instagram" className="social-icon-img" />
              </a>
              <a href="https://github.com/kevinshiroya123" target="_blank" rel="noopener noreferrer">
                <img src={githubIcon} alt="GitHub" className="social-icon-img" />
              </a>
              <a href="https://www.linkedin.com/in/kevin-shiroya-018539268/?lipi=urn%3Ali%3Apage%3Ad_flagship3_feed%3BHuMZIYDwR72Yd%2FnqAuHuvw%3D%3D"
                target="_blank" rel="noopener noreferrer">
                <img src={linkedinIcon} alt="LinkedIn" className="social-icon-img" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
