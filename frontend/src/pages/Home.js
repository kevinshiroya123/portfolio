import React, { useState, useEffect, useRef } from "react";
import "./Home.css"; // Import CSS
import { ReactComponent as DevIllustration } from "../images/illustrator.svg";

// Import Social Media Icons
import instagramIcon from "../images/instagram.png";
import githubIcon from "../images/github.png";
import linkedinIcon from "../images/linkedin.png";

// Import Background Images
import dayBackground from "../images/day-home-background.png";
import nightBackground from "../images/night-home-background.png";

const Home = ({ isDarkMode }) => {
  const [typedText, setTypedText] = useState(""); // Stores animated text
  const [isDeleting, setIsDeleting] = useState(false);
  const [isVisible, setIsVisible] = useState(false); // Track visibility
  const devRef = useRef(null); // Reference for scroll animation

  const fullText = "Front-End Developer"; // Text to type
  const typingSpeed = 150;
  const deletingSpeed = 75;
  const delayBeforeDelete = 1000;
  const delayBeforeRestart = 1000;

  // Typing Animation
  useEffect(() => {
    let typingTimer;
    let currentTextLength = typedText.length;

    if (!isDeleting && currentTextLength < fullText.length) {
      typingTimer = setTimeout(() => {
        setTypedText(fullText.substring(0, currentTextLength + 1));
      }, typingSpeed);
    } else if (!isDeleting && currentTextLength === fullText.length) {
      setTimeout(() => setIsDeleting(true), delayBeforeDelete);
    } else if (isDeleting && currentTextLength > 0) {
      typingTimer = setTimeout(() => {
        setTypedText(fullText.substring(0, currentTextLength - 1));
      }, deletingSpeed);
    } else if (isDeleting && currentTextLength === 0) {
      setTimeout(() => {
        setIsDeleting(false);
      }, delayBeforeRestart);
    }

    return () => clearTimeout(typingTimer);
  }, [typedText, isDeleting]);

  // Scroll Animation for Developer SVG
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        setIsVisible(entries[0].isIntersecting);
      },
      { threshold: 0.5 } // Trigger when 50% of element is visible
    );

    if (devRef.current) observer.observe(devRef.current);
    return () => {
      if (devRef.current) observer.unobserve(devRef.current);
    };
  }, []);

  return (
    <div
      className={`home-container ${isDarkMode ? "night-mode" : "day-mode"}`}
      style={{ backgroundImage: `url(${isDarkMode ? nightBackground : dayBackground})` }}
    >
      <div className="home-content">
        <h1>Hi, I am <span className="highlight">Kevin</span></h1>

        {/* Typing Effect */}
        <h2 className="role">
          {typedText}
          <span className="cursor">|</span> {/* Blinking cursor */}
        </h2>

        <p>
          I am a Front-End / Full-Stack Developer. I am currently Studing at <strong>California State University</strong> as a Front-End Developer.
        </p>

        {/* Social Icons */}
        <div className="social-icons">
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


        <button
          className="resume-btn"
          onClick={() => window.open(require("../images/Resume.pdf"), "_blank")}
        >
          Resume
        </button>

      </div>

      {/* Right Image - Developer SVG with Scroll Animation */}
      <div className="home-image" ref={devRef}>
        <DevIllustration className={`developer-svg ${isVisible ? "bounce-animate" : ""}`} />
      </div>
    </div>
  );
};

export default Home;
