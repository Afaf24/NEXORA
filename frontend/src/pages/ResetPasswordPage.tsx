import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ResetPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  const handleReset = () => {
    if (!password || !confirmPassword) {
      setError('Please fill in both fields');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    setError('');
    setDone(true);
    setTimeout(() => navigate('/login'), 2500);
  };

  if (done) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Segoe UI', sans-serif", padding: '20px' }}>
        <div style={{ background: 'white', borderRadius: '20px', padding: '40px', textAlign: 'center', width: '100%', maxWidth: '400px', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
          <div style={{ fontSize: '60px', marginBottom: '15px' }}>✅</div>
          <h2 style={{ color: '#1a1a2e' }}>Password Reset!</h2>
          <p style={{ color: '#888' }}>Redirecting you to login...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Segoe UI', sans-serif", padding: '20px' }}>
      <div style={{ background: 'white', borderRadius: '20px', padding: '40px', width: '100%', maxWidth: '400px', boxShadow: '0 20px 60px rgba(0,0,0,0.2)', boxSizing: 'border-box' }}>
        <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px', background: 'linear-gradient(135deg, #667eea, #764ba2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          🅽 Nexora
        </div>
        <h2 style={{ color: '#1a1a2e', margin: '0 0 8px' }}>Reset Your Password</h2>
        <p style={{ color: '#888', marginBottom: '25px', fontSize: '14px' }}>Enter your new password below</p>

        <label style={{ color: '#555', fontWeight: '600', display: 'block', marginBottom: '6px', fontSize: '14px' }}>New Password</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Min. 6 characters"
          style={{ width: '100%', padding: '14px', border: '2px solid #eee', borderRadius: '10px', fontSize: '15px', marginBottom: '18px', boxSizing: 'border-box', outline: 'none' }}
        />

        <label style={{ color: '#555', fontWeight: '600', display: 'block', marginBottom: '6px', fontSize: '14px' }}>Confirm Password</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          placeholder="Repeat password"
          style={{ width: '100%', padding: '14px', border: '2px solid #eee', borderRadius: '10px', fontSize: '15px', marginBottom: '20px', boxSizing: 'border-box', outline: 'none' }}
        />

        {error && <p style={{ color: 'red', marginBottom: '15px', fontSize: '14px' }}>❌ {error}</p>}

        <button
          onClick={handleReset}
          style={{ width: '100%', padding: '15px', background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', border: 'none', borderRadius: '10px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}
        >
          Reset Password
        </button>

        <p style={{ textAlign: 'center', marginTop: '20px', color: '#888', fontSize: '14px' }}>
          <span onClick={() => navigate('/login')} style={{ color: '#667eea', cursor: 'pointer', fontWeight: 'bold' }}>← Back to Login</span>
        </p>
      </div>
    </div>
  );
};

export default ResetPasswordPage;