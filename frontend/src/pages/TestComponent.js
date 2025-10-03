// src/pages/TestComponent.js
import React from "react";
import dockerCert from "../certificates/docker-fixed.jpg";

function TestComponent() {
  console.log("Docker cert path:", dockerCert); // see what React bundles

  return (
    <div>
      <h2>Testing Image Load</h2>
      <p>Path: {dockerCert}</p>
      <img 
  src={dockerCert} 
  alt="Docker Certificate" 
  style={{ width: "400px", height: "auto", border: "2px solid red", display: "block" }} 
/>

    </div>
  );
}

export default TestComponent;
