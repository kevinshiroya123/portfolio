import React, { useState, useEffect } from "react";
import "../components/Navbar.css"; // Import CSS

// Import Toggle Icons
import dayIcon from "../images/day-toggle-icon.png";
import nightIcon from "../images/night-toggle-icon.png";

const Navbar = ({ isDarkMode, toggleTheme }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(window.scrollY);
  const [menuOpen, setMenuOpen] = useState(false); // Mobile menu state
  const [activeSection, setActiveSection] = useState("#home"); // Track active section
  const [rotate, setRotate] = useState(false); // Track rotation

  useEffect(() => {
    let scrollTimeout;

    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setIsVisible(false); // Hide when scrolling down
      } else {
        setIsVisible(true); // Show when scrolling up
      }

      setLastScrollY(window.scrollY);

      // Show navbar when scrolling stops
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsVisible(true);
      }, 500);
    };

    // Detect Active Section in Viewport
    const handleSectionChange = () => {
      const sections = ["home", "about", "projects", "contact"];
      sections.forEach((id) => {
        const section = document.getElementById(id);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top >= 0 && rect.top < window.innerHeight / 2) {
            setActiveSection(`#${id}`);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("scroll", handleSectionChange);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scroll", handleSectionChange);
      clearTimeout(scrollTimeout);
    };
  }, [lastScrollY]);

  // Handle Theme Toggle
  const handleToggle = () => {
    setRotate(true); // Start rotation effect
    setTimeout(() => setRotate(false), 500); // Reset rotation after animation
    toggleTheme();
  };

  return (
    <nav className={`navbar ${isVisible ? "visible" : "hidden"}`}>
      <div className="navbar-logo">
        <span>&lt; Kevin Shiroya /&gt;</span>
      </div>

      {/* Menu & Theme Toggle Container */}
      <div className="menu-theme-container">
        {/* Hamburger Icon for Mobile */}
        <div
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>

        {/* Navbar Links */}
        <ul className={`navbar-links ${menuOpen ? "open" : ""}`}>
          {["home", "about", "projects", "contact"].map((id) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={`nav-link ${activeSection === `#${id}` ? "active" : ""}`}
                onClick={() => {
                  setActiveSection(`#${id}`);
                  setMenuOpen(false);
                }}
              >
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </a>
            </li>
          ))}
        </ul>

        {/* Theme Toggle with Rotation */}
        <div className="theme-toggle" onClick={handleToggle}>
          <img
            src={isDarkMode ? nightIcon : dayIcon}
            alt="Toggle Theme"
            className={`toggle-icon ${rotate ? "rotate" : ""}`}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
