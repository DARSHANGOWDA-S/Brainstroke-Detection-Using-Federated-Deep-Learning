import React from 'react'
import { Bar, Pie } from 'react-chartjs-2'
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, ArcElement } from 'chart.js'

ChartJS.register(BarElement, CategoryScale, LinearScale, ArcElement)

export default function Performance(){
  const metrics = {accuracy: '86.48%', precision: '85.2%', recall: '84.1%', f1: '84.6%'}

  const cmData = {
    labels: ['No Stroke','Ischemic','Haemorrhagic'],
    datasets: [{
      label:'Confusion',
      data:[50, 5, 3],
      backgroundColor:['#8BC34A','#FFB300','#F44336']
    }]
  }

  const compare = {
    labels:['InceptionV3','CNN'],
    datasets:[{label:'Accuracy', data:[76.8, 86.48], backgroundColor:['#2196F3','#4CAF50']}]
  }

  return (
    <div className="performance-page">
      <h2>Model Performance</h2>
      <div className="metrics">
        <div className="card"><h4>Accuracy</h4><div className="big">{metrics.accuracy}</div></div>
        <div className="card"><h4>Precision</h4><div className="big">{metrics.precision}</div></div>
        <div className="card"><h4>Recall</h4><div className="big">{metrics.recall}</div></div>
        <div className="card"><h4>F1-Score</h4><div className="big">{metrics.f1}</div></div>
      </div>

      <div className="charts">
        <div className="chart card">
          <h4>Confusion Matrix (sample)</h4>
          <Bar data={cmData} />
        </div>
        <div className="chart card">
          <h4>Model Comparison</h4>
          <Bar data={compare} />
        </div>
      </div>

      <p>Our CNN-based model shows superior accuracy and robustness for MRI-based stroke detection.</p>
    </div>
  )
}
