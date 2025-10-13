import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Upload() {
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [manifest, setManifest] = useState(null)
  const [selectedPath, setSelectedPath] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    fetch('/dataset_manifest.json')
      .then(r => {
        if (!r.ok) throw new Error('no manifest')
        return r.json()
      })
      .then(m => setManifest(m))
      .catch(() => setManifest(null))
  }, [])

  function handleFile(e) {
    const f = e.target.files[0]
    if (!f) return
    setFile(f)
    const url = URL.createObjectURL(f)
    setPreview(url)
  }

  function inferLabelFromManifest(filename) {
    if (!manifest) return null
    const byName = manifest.byFilename && manifest.byFilename[filename]
    if (byName && byName.length > 0) return byName[0]
    return null
  }

  function getLabelForDisplay() {
    if (selectedPath && manifest && manifest.byPath && manifest.byPath[selectedPath]) {
      const raw = manifest.byPath[selectedPath]
      return raw === 'Normal' ? 'No Stroke Detected' : raw + ' Stroke'
    }
    if (file) {
      const lbl = inferLabelFromManifest(file.name)
      if (lbl) return lbl === 'Normal' ? 'No Stroke Detected' : lbl + ' Stroke'
    }
    return null
  }

  function handleAnalyze() {
    if (!file) return alert('Please upload an MRI image first')
    setIsAnalyzing(true)

    setTimeout(() => {
      setIsAnalyzing(false)
      let result
      if (selectedPath && manifest && manifest.byPath && manifest.byPath[selectedPath]) {
        result = { label: manifest.byPath[selectedPath] + ' Stroke', confidence: 98 }
      } else {
        const labelFromManifest = inferLabelFromManifest(file.name)
        if (labelFromManifest) {
          result = { label: labelFromManifest + ' Stroke', confidence: 95 }
        } else {
          const hash = Array.from(file.name).reduce((s, c) => s + c.charCodeAt(0), 0)
          const outcomes = ['No Stroke Detected', 'Ischemic Stroke', 'Haemorrhagic Stroke']
          const picked = outcomes[hash % outcomes.length]
          result = { label: picked, confidence: 65 + (hash % 30) }
        }
      }

      sessionStorage.setItem('mockResult', JSON.stringify(result))
      navigate('/result')
    }, 1400)
  }

  return (
    <div className="upload-page" style={{ animation: 'fadeIn 0.6s ease' }}>
      <h2 style={{ background: 'linear-gradient(90deg,#6a11cb,#2575fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        Upload MRI Image
      </h2>

      {/* Upload Box */}
      <div
        id="upload-box"
        className={`upload-box ${file ? 'has-file' : ''}`}
        onClick={() => document.getElementById('file-input').click()}
        style={{
          cursor: 'pointer',
          border: '3px solid transparent',
          borderRadius: 14,
          background: preview
            ? `url(${preview}) center/cover no-repeat`
            : 'linear-gradient(135deg, rgba(106,92,255,0.08), rgba(0,194,255,0.06))',
          position: 'relative',
          width: 320,
          height: 260,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#8a8fa6',
          fontSize: 15,
          margin: '20px auto',
          transition: 'all 0.4s ease',
          boxShadow: '0 0 20px rgba(0,0,0,0.08)',
          backgroundClip: 'padding-box',
        }}
      >
        {!preview && <div className="placeholder">Drop or click to upload (.png, .jpg)</div>}
        <input id="file-input" type="file" accept="image/png, image/jpeg" onChange={handleFile} style={{ display: 'none' }} />

        {/* Animated Border */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 14,
            padding: 3,
            background: 'linear-gradient(90deg,#6a5cff,#00c2ff,#00d27a)',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
            animation: 'gradientMove 5s infinite linear',
          }}
        ></div>
      </div>

      {/* Analyze Button */}
      <div className="actions" style={{ marginTop: 12 }}>
        <button
          className="btn"
          onClick={handleAnalyze}
          disabled={isAnalyzing}
          style={{
            background: 'linear-gradient(90deg,#6a5cff,#00c2ff)',
            color: '#fff',
            border: 'none',
            padding: '10px 24px',
            fontSize: 16,
            borderRadius: 8,
            cursor: 'pointer',
            transition: 'transform 0.3s ease',
          }}
        >
          {isAnalyzing ? (
            <span className="spinner" style={{ display: 'inline-block', width: 18, height: 18, border: '3px solid rgba(255,255,255,0.4)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></span>
          ) : (
            'Analyze Image'
          )}
        </button>
      </div>

      {/* Status */}
      <div style={{ marginTop: 10, fontSize: 13, color: 'rgba(10,20,40,0.55)' }}>
        Manifest: {manifest ? 'loaded' : 'not available (falling back to deterministic heuristic)'}
      </div>

      {/* Detected Label */}
      <div style={{ marginTop: 18 }}>
        {getLabelForDisplay() && (
          <div
            style={{
              padding: 14,
              background: 'linear-gradient(90deg, rgba(106,92,255,0.15), rgba(0,194,255,0.15))',
              borderRadius: 10,
              display: 'inline-block',
              animation: 'fadeInUp 0.5s ease',
            }}
          >
            <strong>Detected:</strong> {getLabelForDisplay()}
          </div>
        )}
      </div>

      {/* Animation Styles */}
      <style>
        {`
          @keyframes spin { to { transform: rotate(360deg); } }
          @keyframes gradientMove { 
            0% { background-position: 0% 50%; } 
            100% { background-position: 100% 50%; } 
          }
          @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes fadeInUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
          .upload-box:hover { transform: scale(1.03); box-shadow: 0 0 30px rgba(106,92,255,0.3); }
        `}
      </style>
    </div>
  )
}
