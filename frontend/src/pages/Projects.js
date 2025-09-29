import React, { useState, useEffect, useRef } from "react";
import "./Projects.css"; // Import CSS
import { FaGithub } from "react-icons/fa"; // Import GitHub icon

const projects = [
  {
    title: "Netflix Clone",
    description: "A fully responsive Netflix clone built using React and Firebase.",
    github: "https://github.com/kevinshiroya123/netflix-clone",
    liveDemo: "https://d2lnwqsft8mmlx.cloudfront.net/",
  },
  {
    title: "Airbnb Clone",
    description: "An Airbnb-like platform built with MERN stack.",
    github: "https://github.com/kevinshiroya123/airbnb-clone-react",
    liveDemo: "https://kevinshiroya123.github.io/airbnb-clone-react/",
  },
  {
    title: "Wildfire Tracker",
    description: "A real-time wildfire tracker using NASA API.",
    github: "https://github.com/your-github/wildfire-tracker",
    liveDemo: "https://kevinshiroya123.github.io/wildfire-tracker/",
  },
  {
    title: "Facebook Clone",
    description: "A modern Facebook clone built using React and Firebase for authentication & database.",
    github: "https://github.com/kevinshiroya123/facebook-clone",
    liveDemo: "https://d1byyjf99qq6x4.cloudfront.net/",
  },
  {
    title: "Movie Recommendation System",
    description: "A machine learning-based movie recommendation system using Python.",
    github: "https://github.com/kevinshiroya123/Movie-Recommendation-system",
    liveDemo: "#", // No live demo link
  },
];

const Projects = () => {
  const projectRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-in");
          } else {
            entry.target.classList.remove("fade-in"); // Reset animation when scrolled out
          }
        });
      },
      { threshold: 0.3 }
    );

    projectRefs.current.forEach((project) => {
      if (project) observer.observe(project);
    });

    return () => {
      projectRefs.current.forEach((project) => {
        if (project) observer.unobserve(project);
      });
    };
  }, []);

  return (
    <section className="projects-section">
      <h1 className="projects-title">Projects</h1>
      <h2 className="projects-subtitle">What I Built</h2>

      <div className="projects-grid">
        {projects.map((project, index) => (
          <div
            key={index}
            className="project-card"
            ref={(el) => (projectRefs.current[index] = el)}
          >
            <div className="project-info">
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>

              <div className="project-links">
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="github-btn">
                  <FaGithub className="github-icon" /> GitHub
                </a>
                {project.liveDemo !== "#" && (
                  <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" className="live-demo-btn">
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
