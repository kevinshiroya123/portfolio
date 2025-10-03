// src/pages/Certificates.js
import React from "react";
import "./Certificates.css";

// Import images properly
import pythonCert from "../images/certificates/1.jpeg";
import dockerCert from "../images/certificates/2.jpeg";

const certificates = [
  { name: "Python Bootcamp", img: pythonCert },
  { name: "Docker Mastery", img: dockerCert },
];

function Certificates() {
  return (
    <div className="certificates-section">
      <h2 className="certificates-title">Certificates</h2>
      <p className="certificates-description">
        I’ve earned certifications that validate my skills in security, cloud,
        and modern technologies. These credentials reflect my commitment to
        continuous learning and industry standards.
      </p>

      <div className="certificates-grid">
        {certificates.map((cert, index) => (
          <div key={index} className="certificate-item bounce-in">
            <img src={cert.img} alt={cert.name} className="certificate-logo" />
            <div className="certificate-name">{cert.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Certificates;
