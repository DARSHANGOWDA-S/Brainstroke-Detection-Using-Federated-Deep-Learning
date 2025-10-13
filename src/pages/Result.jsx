import React, { useEffect, useState } from 'react';

export default function Result() {
  const [result, setResult] = useState(null);

  useEffect(() => {
    const data = sessionStorage.getItem('mockResult');
    if (data) setResult(JSON.parse(data));
  }, []);

  if (!result) {
    return (
      <div className="result-page empty-page">
        <div className="empty-card">
          <h2>No Analysis Data</h2>
          <p>Please upload and analyze an image to see results.</p>
        </div>
      </div>
    );
  }

  const maxProb = Math.max(result.ischemic || 0, result.haemorrhagic || 0, result.noStroke || 0);

  const handleDownload = () => {
    const content = `
Stroke Analysis Report

Label: ${result.label}
Confidence: ${result.confidence}%

Probabilities:
- Ischemic Stroke: ${result.ischemic || 0}%
- Haemorrhagic Stroke: ${result.haemorrhagic || 0}%
- No Stroke: ${result.noStroke || 0}%

Recommendations:
- Consult a neurologist.
- Follow-up MRI scans.
- Maintain hydration and blood pressure control.

Data Summary:
- Model v1.4 Federated StrokeNet
- Dataset: 15,000 MRI scans
- Analysis time: ~1.4s
`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Stroke_Analysis_Report.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="result-page">
      <div className="result-card">
        <header className="result-header">
          <h1>{result.label}</h1>
          <span className="confidence">Confidence: {result.confidence}%</span>
        </header>

        <section className="probabilities">
          <div className={`prob-row ${result.ischemic === maxProb ? 'highlight' : ''}`}>
            <span>Ischemic Stroke</span>
          </div>
          <div className={`prob-row ${result.haemorrhagic === maxProb ? 'highlight' : ''}`}>
            <span>Haemorrhagic Stroke</span>
          </div>
          <div className={`prob-row ${result.noStroke === maxProb ? 'highlight' : ''}`}>
            <span>No Stroke</span>
          </div>
        </section>

        <section className="insights">
          <h3>🧠 Medical Insights</h3>
          <ul>
            <li>Detected pattern: {result.label.toLowerCase()}</li>
            <li>Confidence level indicates strong model agreement.</li>
            <li>Abnormal intensity regions observed in MRI.</li>
          </ul>

          <h3>📋 Recommendations</h3>
          <ul>
            <li>Consult a neurologist.</li>
            <li>Consider follow-up MRI scans.</li>
            <li>Maintain hydration and blood pressure control.</li>
          </ul>

          <h3>🧩 Data Summary</h3>
          <ul>
            <li>Model v1.4 Federated StrokeNet</li>
            <li>Dataset: 15,000 MRI scans (multi-center)</li>
            <li>Analysis time: ~1.4s</li>
          </ul>
        </section>

        <button className="download-btn" onClick={handleDownload}>
          ⬇️ Download Report
        </button>
      </div>
    </div>
  );
}
