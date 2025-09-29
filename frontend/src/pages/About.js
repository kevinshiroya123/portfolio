import React, { useState, useEffect, useRef } from "react";
import "./About.css"; // Import styles

const technologies = [
  { className: "devicon-c-plain", name: "C Language" },
  { className: "devicon-typescript-plain", name: "TypeScript" },
  { className: "devicon-express-original", name: "Express" },
  { className: "devicon-nodejs-plain", name: "NodeJS" },
  { className: "devicon-postman-plain", name: "Postman" },
  { className: "devicon-dart-plain", name: "Dart" },
  { className: "devicon-flutter-plain", name: "Flutter" },
  { className: "devicon-react-original", name: "React Native" },
  { className: "devicon-html5-plain", name: "HTML" },
  { className: "devicon-css3-plain", name: "CSS" },
  { className: "devicon-bootstrap-plain", name: "Bootstrap" },
  { className: "devicon-redux-original", name: "Redux" },
  { className: "devicon-sass-original", name: "Sass" },
  { className: "devicon-javascript-plain", name: "JavaScript" },
  { className: "devicon-tailwindcss-plain", name: "Tailwind CSS" },
  { className: "devicon-react-original", name: "React" },
];

const About = () => {
  const [visibleTech, setVisibleTech] = useState({});
  const techRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleTech((prev) => ({
              ...prev,
              [entry.target.dataset.index]: true,
            }));
          } else {
            setVisibleTech((prev) => ({
              ...prev,
              [entry.target.dataset.index]: false,
            }));
          }
        });
      },
      { threshold: 0.3 } // Adjust to trigger animation when 30% visible
    );

    techRefs.current.forEach((tech) => {
      if (tech) observer.observe(tech);
    });

    return () => {
      techRefs.current.forEach((tech) => {
        if (tech) observer.unobserve(tech);
      });
    };
  }, []);

  return (
    <section className="about-section">
      <h1 className="about-title">About Me</h1>
      
      <div className="about-content">
        <h2 className="about-subtitle">A bit about me</h2>
        <p className="about-description">
          I'm a self-taught web and mobile app developer with experience in designing new features from ideation to production, 
          implementation of wireframes and design flows into high-performance software applications. I take into consideration 
          the user experience while writing reusable and efficient code. I passionately combine good design, technology, and 
          innovation in all my projects, which I like to accompany from the first idea to release. Currently, I'm focused on backend development.
        </p>
      </div>

      <div className="technologies-section">
        <h2 className="about-subtitle">Technologies and Tools</h2>
        <p className="about-description">
          Using a combination of cutting-edge technologies and reliable open-source software, I build user-focused, 
          performant apps and websites for smartphones, tablets, and desktops.
        </p>
        <div className="technologies-grid">
          {technologies.map((tech, index) => (
            <div
              key={index}
              className={`tech-item ${visibleTech[index] ? "bounce-in" : ""}`}
              data-index={index}
              ref={(el) => (techRefs.current[index] = el)}
            >
              <i className={`${tech.className} tech-icon`}></i>
              <span>{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
