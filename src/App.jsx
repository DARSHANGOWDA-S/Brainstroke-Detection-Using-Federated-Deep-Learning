import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Upload from './pages/Upload'
import Result from './pages/Result'
import Performance from './pages/Performance'
import FedViz from './pages/FedViz'
import About from './pages/About'

export default function App(){
  return (
    <div>
      <header className="site-header">
        <Link to="/" className="logo">BrainStroke Detect</Link>
        <nav>
          <Link to="/performance">Performance</Link>
          <Link to="/federated">Federated</Link>
          <Link to="/about">About</Link>
          <Link to="/login" className="btn">Login</Link>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/upload" element={<Upload/>} />
          <Route path="/result" element={<Result/>} />
          <Route path="/performance" element={<Performance/>} />
          <Route path="/federated" element={<FedViz/>} />
          <Route path="/about" element={<About/>} />
        </Routes>
      </main>

      <footer className="site-footer">
        <small>© 2025 BrainStroke Detect. All Rights Reserved.</small>
      </footer>
    </div>
  )
}
