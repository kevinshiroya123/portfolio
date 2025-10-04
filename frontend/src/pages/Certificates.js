// src/pages/Certificates.js
import React, { useState } from "react";
import "./Certificates.css";

// Dynamically import all images from the certificates folder
const importAll = (r) =>
  r.keys().map((fileName) => ({
    name: fileName
      .replace("./", "")          // remove './'
      .replace(/\.[^/.]+$/, "")   // remove extension
      .replace(/-/g, " ")         // replace hyphens with spaces
      .replace(/_/g, " ")         // replace underscores with spaces
      .replace(/\b\w/g, (c) => c.toUpperCase()), // capitalize words
    img: r(fileName),
  }));

// Automatically import every .png/.jpg/.jpeg/.svg from /src/images/certificates
const certificates = importAll(
  require.context("../images/certificates", false, /\.(png|jpe?g|svg)$/)
);

function Certificates() {
  const [selectedCert, setSelectedCert] = useState(null);

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
          <div
            key={index}
            className="certificate-item bounce-in"
            onClick={() => setSelectedCert(cert)}
          >
            <div className="certificate-image-wrapper">
              <img
                src={cert.img}
                alt={cert.name}
                className="certificate-logo"
              />
            </div>
            <div className="certificate-name">{cert.name}</div>
          </div>
        ))}
      </div>

      {/* Popup Modal */}
      {selectedCert && (
        <div className="modal-overlay" onClick={() => setSelectedCert(null)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
          >
            <button
              className="modal-close"
              onClick={() => setSelectedCert(null)}
            >
              &times;
            </button>
            <img
              src={selectedCert.img}
              alt={selectedCert.name}
              className="modal-image"
            />
            <h3 className="modal-title">{selectedCert.name}</h3>
          </div>
        </div>
      )}
    </div>
  );
}

export default Certificates;
