import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';

const LoginPage: React.FC<{ setIsLoggedIn: (v: boolean) => void }> = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hovering, setHovering] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      setError('Please fill in both fields');
      return;
    }

    const existingUsers = JSON.parse(localStorage.getItem('allUsers') || '[]');
    const foundUser = existingUsers.find((u: any) => u.email === email);

    if (!foundUser) {
      setError("This email isn't registered yet. Please sign up first.");
      return;
    }

    if (foundUser.password !== password) {
      setError('Incorrect password. Please try again.');
      return;
    }

    setError('');
    localStorage.setItem('user', JSON.stringify({ name: foundUser.name, email }));
    setIsLoggedIn(true);
    navigate('/dashboard');
  };

  const handleReset = async () => {
    if (resetEmail) {
      try {
        await emailjs.send(
          'service_iv0q4ni',
          'template_8g40wuh',
          {
            to_name: resetEmail,
            reset_link: 'https://nexora-hpfg.vercel.app/reset',
            email: resetEmail,
          },
          'N0wXNZqOX3_A-sPMv'
        );
        setResetSent(true);
      } catch (error) {
        console.error('Email error:', error);
      }
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: "'Segoe UI', sans-serif", flexWrap: 'wrap' as const }}>

      {/* Left Side - Form */}
      <div style={{ flex: '1 1 320px', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '40px 30px', background: 'white', minWidth: '300px' }}>
        <div style={{ cursor: 'pointer', color: '#667eea', marginBottom: '40px', fontSize: '15px' }} onClick={() => navigate('/')}>
          ← Back to Home
        </div>
        <div style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '8px', background: 'linear-gradient(135deg, #667eea, #764ba2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          🅽 Nexora
        </div>
        <h2 style={{ fontSize: '32px', color: '#1a1a2e', margin: '0 0 8px' }}>Welcome back</h2>
        <p style={{ color: '#888', marginBottom: '35px' }}>Sign in to continue to your dashboard</p>

        {!showReset ? (
          <>
            <label style={{ color: '#555', fontWeight: '600', marginBottom: '6px', display: 'block' }}>Email</label>
            <input value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com"
              style={{ width: '100%', padding: '14px', border: '2px solid #eee', borderRadius: '10px', fontSize: '15px', marginBottom: '20px', boxSizing: 'border-box', outline: 'none' }} />

            <label style={{ color: '#555', fontWeight: '600', marginBottom: '6px', display: 'block' }}>Password</label>
            <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="••••••••"
              style={{ width: '100%', padding: '14px', border: '2px solid #eee', borderRadius: '10px', fontSize: '15px', marginBottom: '10px', boxSizing: 'border-box', outline: 'none' }} />

            <div style={{ textAlign: 'right', marginBottom: '15px' }}>
              <span onClick={() => setShowReset(true)} style={{ color: '#667eea', cursor: 'pointer', fontSize: '14px', fontWeight: '600' }}>
                Forgot password?
              </span>
            </div>

            {error && <p style={{ color: 'red', marginBottom: '15px', fontSize: '14px' }}>❌ {error}</p>}

            <button
              onClick={handleLogin}
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
              style={{ width: '100%', padding: '15px', background: hovering ? 'linear-gradient(135deg, #764ba2, #667eea)' : 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', border: 'none', borderRadius: '10px', fontSize: '17px', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.3s ease', transform: hovering ? 'translateY(-2px)' : 'translateY(0)', boxShadow: hovering ? '0 10px 25px rgba(102,126,234,0.5)' : 'none' }}>
              Sign In
            </button>

            <p style={{ textAlign: 'center', marginTop: '20px', color: '#888' }}>
              No account? <span onClick={() => navigate('/register')} style={{ color: '#667eea', cursor: 'pointer', fontWeight: 'bold' }}>Sign Up</span>
            </p>
          </>
        ) : (
          <>
            {!resetSent ? (
              <>
                <p style={{ color: '#555', marginBottom: '20px' }}>Enter your email and we'll send you a reset link.</p>
                <input value={resetEmail} onChange={e => setResetEmail(e.target.value)} placeholder="your@email.com"
                  style={{ width: '100%', padding: '14px', border: '2px solid #eee', borderRadius: '10px', fontSize: '15px', marginBottom: '20px', boxSizing: 'border-box' }} />
                <button onClick={handleReset}
                  style={{ width: '100%', padding: '15px', background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', border: 'none', borderRadius: '10px', fontSize: '17px', fontWeight: 'bold', cursor: 'pointer' }}>
                  Send Reset Link
                </button>
                <p style={{ textAlign: 'center', marginTop: '15px' }}>
                  <span onClick={() => setShowReset(false)} style={{ color: '#667eea', cursor: 'pointer' }}>← Back to login</span>
                </p>
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '30px' }}>
                <div style={{ fontSize: '60px', marginBottom: '20px' }}>📧</div>
                <h3 style={{ color: '#333' }}>Check your email!</h3>
                <p style={{ color: '#888' }}>We sent a password reset link to <strong>{resetEmail}</strong></p>
                <span onClick={() => { setShowReset(false); setResetSent(false); }} style={{ color: '#667eea', cursor: 'pointer' }}>← Back to login</span>
              </div>
            )}
          </>
        )}
      </div>

      {/* Right Side - Decorative */}
      <div style={{ flex: '1 1 320px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '40px 30px', color: 'white', minWidth: '300px' }}>
        <h2 style={{ fontSize: '38px', fontWeight: '800', marginBottom: '20px' }}>Your Career,<br />Intelligently Matched</h2>
        <p style={{ fontSize: '17px', opacity: 0.85, marginBottom: '40px', lineHeight: 1.7 }}>Join thousands of professionals who found their perfect role through our AI-powered platform.</p>
        {[
          { icon: '🎯', title: 'Smart Job Matching', desc: 'AI analyzes your skills and finds roles that fit' },
          { icon: '📄', title: 'CV Analysis', desc: 'Deep analysis of your experience and education' },
          { icon: '⚡', title: 'Instant Results', desc: 'Get ranked matches in seconds' },
        ].map(f => (
          <div key={f.title} style={{ display: 'flex', gap: '15px', marginBottom: '25px', background: 'rgba(255,255,255,0.1)', borderRadius: '12px', padding: '18px' }}>
            <span style={{ fontSize: '28px' }}>{f.icon}</span>
            <div>
              <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>{f.title}</div>
              <div style={{ opacity: 0.8, fontSize: '14px' }}>{f.desc}</div>
            </div>
          </div>
        ))}
        <div style={{ display: 'flex', gap: '30px', marginTop: '20px' }}>
          {[{ n: '50K+', l: 'Active Jobs' }, { n: '120K+', l: 'Job Seekers' }, { n: '85%', l: 'Match Rate' }].map(s => (
            <div key={s.l} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '26px', fontWeight: 'bold' }}>{s.n}</div>
              <div style={{ opacity: 0.75, fontSize: '13px' }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;