import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', 
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok) {
        navigate('/');
      } else {
        setError(data.error || 'Login failed');
      }
    } catch {
      setError('Network error');
    }
  }
  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="card p-4 shadow" style={{ maxWidth: 400, width: '100%' }}>
        <h3 className="mb-4 text-center">Log In</h3>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Email address</label>
            <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="btn btn-primary w-100">Log In</button>
        </form>
        <p className="mt-3 text-center">
          Don't have an account? <Link to="/register">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}
