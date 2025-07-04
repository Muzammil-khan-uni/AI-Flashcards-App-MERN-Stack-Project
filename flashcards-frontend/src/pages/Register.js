import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Register() {
  const [username, setUsername] = useState(''); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username, email, password }) 
      });

      const data = await res.json();
      if (res.ok) {
        navigate('/login');
      } else {
        setError(data.error || 'Registration failed');
      }
    } catch {
      setError('Network error');
    }
  }

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="card p-4 shadow" style={{ maxWidth: 400, width: '100%' }}>
        <h3 className="mb-4 text-center">Sign Up</h3>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label>Confirm Password</label>
            <input
              type="password"
              className="form-control"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Register</button>
        </form>
        <p className="mt-3 text-center">
          Already have an account? <Link to="/login">Log In</Link>
        </p>
      </div>
    </div>
  );
}
