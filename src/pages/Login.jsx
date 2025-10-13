import React from 'react'
import { Link } from 'react-router-dom'

export default function Login(){
  return (
    <div className="auth-page">
      <div className="auth-left">
        <img src="./MRI machine.png" alt="MRI" />
      </div>
      <div className="auth-right">
        <h2>Login</h2>
        <form onSubmit={(e)=>{e.preventDefault(); alert('Mock login - proceed to upload'); window.location.href='/upload'}}>
          <label>Email</label>
          <input type="email" required />
          <label>Password</label>
          <input type="password" required />
          <small>Your data stays on your device — powered by Federated Learning.</small>
          <button className="btn primary" type="submit">Login</button>
          <div className="alt">Don't have an account? <Link to="/login">Sign Up</Link></div>
        </form>
      </div>
    </div>
  )
}
