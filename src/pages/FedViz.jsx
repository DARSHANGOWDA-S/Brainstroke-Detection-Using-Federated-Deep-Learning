import React from 'react'

export default function FedViz() {
  return (
    <div className="fedviz">
      <h2>Federated Learning Visualization</h2>

      {/* Visualization Diagram */}
      <div className="diagram">
        <div className="cloud">🌩 Central Server</div>
        <div className="clients">
          <div className="client">🏥 Hospital A<br /><span>Local MRI data</span></div>
          <div className="client">🏥 Hospital B<br /><span>Local MRI data</span></div>
          <div className="client">🏥 Hospital C<br /><span>Local MRI data</span></div>
        </div>

        <div className="arrows">
          <div className="arrow up">⬆ Model Updates</div>
          <div className="arrow down">⬇ Improved Global Model</div>
        </div>
      </div>

      {/* Description */}
      <p className="summary">
        In Federated Learning, each hospital trains a local model on its own data (MRI scans) without sending patient
        data to a central server. Instead, they share only model updates. These updates are aggregated securely by the
        central server to improve a global model that benefits all participants.
      </p>

      {/* How It Works */}
      <div className="steps">
        <h3>How It Works 🧩</h3>
        <ol>
          <li><strong>Step 1:</strong> Central server sends the base AI model to each hospital.</li>
          <li><strong>Step 2:</strong> Each hospital trains the model on its local stroke MRI dataset.</li>
          <li><strong>Step 3:</strong> Hospitals send back only the updated weights (no raw data).</li>
          <li><strong>Step 4:</strong> The central server aggregates these updates into a global model.</li>
          <li><strong>Step 5:</strong> The improved model is redistributed — enabling privacy-preserving intelligence.</li>
        </ol>
      </div>

      {/* Advantages */}
      <div className="advantages">
        <h3>Key Advantages 🌟</h3>
        <ul>
          <li>🔒 <strong>Privacy-Preserving:</strong> Patient data never leaves the hospital.</li>
          <li>📈 <strong>Collaborative Improvement:</strong> Each participant benefits from collective learning.</li>
          <li>⚡ <strong>Reduced Data Transfer:</strong> Only small model updates are exchanged.</li>
          <li>🧠 <strong>Better Accuracy:</strong> More diverse data sources improve model robustness.</li>
          <li>🌍 <strong>Scalable:</strong> Can easily add new hospitals or clinics to the network.</li>
        </ul>
      </div>

      {/* Use Case */}
      <div className="use-case">
        <h3>Real-World Application 🩺</h3>
        <p>
          In brain stroke prediction, federated deep learning allows multiple hospitals to collaborate securely.
          Each institution uses its patient MRI scans to train local models that can detect early stroke symptoms,
          while keeping patient information confidential — advancing medical AI ethically.
        </p>
      </div>
    </div>
  )
}
