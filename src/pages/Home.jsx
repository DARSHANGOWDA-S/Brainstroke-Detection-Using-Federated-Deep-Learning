import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="hero">
      {/* Animated Federated Background */}
      <div className="hero-bg">
        <div className="glow-layer"></div>
        <div className="network-lines"></div>
        <div className="particles"></div>
      </div>

      {/* Main Content */}
      <div className="hero-content">
        <img src="./fedAiimage.jpeg" alt="Federated AI" className="hero-image" />
        <h1>Detection and Classification of Brain Stroke using Federated Deep Learning</h1>
        <p className="tagline">
          A privacy-preserving AI system for early stroke diagnosis using MRI analysis.
        </p>

        <div className="cta">
          <Link to="/Federated" className="btn primary">Explore Federated Learning</Link>
          <Link to="/performance" className="btn secondary">Model Insights</Link>
        </div>
        <div className="hero-bg">
  <div className="network-grid"></div>

  {/* Federated AI nodes (visuals) */}
  <div className="node"></div>
  <div className="node"></div>
  <div className="node"></div>
  <div className="node"></div>
  <div className="node"></div>
</div>


        {/* Core Features */}
        <div className="features">
          <div className="feature">
            <img src="./download (13).jpeg" alt="Privacy" className="feature-img" />
            <h4>Privacy</h4>
            <p>Data never leaves your device during training.</p>
          </div>
          <div className="feature">
            <img src="./accuracy.png" alt="Accuracy" className="feature-img" />
            <h4>Accuracy</h4>
            <p>High-performance CNN models tuned for MRI.</p>
          </div>
          <div className="feature">
            <img src="diognosis.jpeg" alt="AI Diagnosis" className="feature-img" />
            <h4>AI-powered Diagnosis</h4>
            <p>Explainable predictions with Grad-CAM overlays.</p>
          </div>
        </div>
      </div>

    
    </div>
  )
}
