import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterPage: React.FC<{ setIsLoggedIn: (v: boolean) => void }> = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [done, setDone] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = () => {
    if (!name || !email || !password) {
      setError('Please fill in all fields');
      return;
    }

    const existingUsers = JSON.parse(localStorage.getItem('allUsers') || '[]');
    const alreadyExists = existingUsers.some((u: any) => u.email === email);

    if (alreadyExists) {
      setError('This email is already registered. Please sign in instead.');
      return;
    }

    setError('');
    const newUser = { name, email, password };
    existingUsers.push(newUser);
    localStorage.setItem('allUsers', JSON.stringify(existingUsers));
    localStorage.setItem('user', JSON.stringify({ name, email }));
    setIsLoggedIn(true);
    setDone(true);
    setTimeout(() => navigate('/dashboard'), 2500);
  };

  if (done) return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Segoe UI', sans-serif", padding: '20px' }}>
      <div style={{ background: 'white', borderRadius: '24px', padding: '50px 40px', textAlign: 'center', width: '100%', maxWidth: '420px', boxShadow: '0 30px 80px rgba(0,0,0,0.2)', boxSizing: 'border-box' }}>
        <div style={{ fontSize: '60px', marginBottom: '15px' }}>🎉</div>
        <h2 style={{ color: '#1a1a2e', fontSize: '26px', marginBottom: '10px' }}>Welcome to Nexora!</h2>
        <p style={{ color: '#888', fontSize: '15px', lineHeight: 1.6 }}>Hi <strong>{name}</strong>! Your account is ready.<br />Taking you to your dashboard...</p>
      </div>
    </div>
  );

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: "'Segoe UI', sans-serif", flexWrap: 'wrap' as const }}>

      {/* Left - Decorative */}
      <div style={{ flex: '1 1 320px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '40px 30px', color: 'white', minWidth: '300px' }}>
        <div style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '25px' }}>🅽 Nexora</div>
        <h2 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '18px', lineHeight: 1.3 }}>Start Your Journey<br />to the Perfect Job</h2>
        <p style={{ fontSize: '16px', opacity: 0.85, marginBottom: '35px', lineHeight: 1.7 }}>Create your free account and let AI find your best career matches in seconds.</p>

        {[
          { icon: '✅', text: 'Free forever — no credit card needed' },
          { icon: '🔒', text: 'Your data is private and secure' },
          { icon: '🤖', text: 'AI-powered matching using embeddings' },
          { icon: '📊', text: 'Detailed skill and experience analysis' },
        ].map(item => (
          <div key={item.text} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px', fontSize: '14px' }}>
            <span style={{ fontSize: '18px' }}>{item.icon}</span>
            <span style={{ opacity: 0.9 }}>{item.text}</span>
          </div>
        ))}

        <div style={{ marginTop: '30px', background: 'rgba(255,255,255,0.15)', borderRadius: '16px', padding: '20px' }}>
          <p style={{ margin: 0, fontSize: '14px', opacity: 0.9, fontStyle: 'italic', lineHeight: 1.6 }}>
            "Nexora found me a job that matched 87% of my skills in under 10 seconds. Incredible!"
          </p>
          <p style={{ margin: '10px 0 0', fontWeight: 'bold', fontSize: '13px' }}>— Yusuf Öztürk, Software Engineer</p>
        </div>
      </div>

      {/* Right - Form */}
      <div style={{ flex: '1 1 320px', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '40px 30px', background: 'white', minWidth: '300px' }}>
        <div style={{ cursor: 'pointer', color: '#667eea', marginBottom: '30px', fontSize: '15px' }} onClick={() => navigate('/')}>
          ← Back to Home
        </div>
        <h2 style={{ fontSize: '28px', color: '#1a1a2e', margin: '0 0 8px' }}>Create your account</h2>
        <p style={{ color: '#888', marginBottom: '30px', fontSize: '15px' }}>Join thousands of professionals already using Nexora</p>

        <label style={{ color: '#555', fontWeight: '600', marginBottom: '6px', display: 'block', fontSize: '14px' }}>Full Name</label>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Afaf Albadawy"
          style={{ width: '100%', padding: '14px', border: '2px solid #eee', borderRadius: '10px', fontSize: '15px', marginBottom: '18px', boxSizing: 'border-box', outline: 'none' }} />

        <label style={{ color: '#555', fontWeight: '600', marginBottom: '6px', display: 'block', fontSize: '14px' }}>Email Address</label>
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com"
          style={{ width: '100%', padding: '14px', border: '2px solid #eee', borderRadius: '10px', fontSize: '15px', marginBottom: '18px', boxSizing: 'border-box', outline: 'none' }} />

        <label style={{ color: '#555', fontWeight: '600', marginBottom: '6px', display: 'block', fontSize: '14px' }}>Password</label>
        <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Min. 6 characters"
          style={{ width: '100%', padding: '14px', border: '2px solid #eee', borderRadius: '10px', fontSize: '15px', marginBottom: '20px', boxSizing: 'border-box', outline: 'none' }} />

        {error && <p style={{ color: 'red', marginBottom: '15px', fontSize: '14px' }}>❌ {error}</p>}

        <button
          onClick={handleRegister}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          style={{ width: '100%', padding: '15px', background: hovering ? 'linear-gradient(135deg, #764ba2, #667eea)' : 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', border: 'none', borderRadius: '10px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.3s ease', transform: hovering ? 'translateY(-2px)' : 'translateY(0)', boxShadow: hovering ? '0 10px 25px rgba(102,126,234,0.5)' : 'none' }}>
          🚀 Create Free Account
        </button>

        <p style={{ textAlign: 'center', marginTop: '20px', color: '#888', fontSize: '14px' }}>
          Already have an account? <span onClick={() => navigate('/login')} style={{ color: '#667eea', cursor: 'pointer', fontWeight: 'bold' }}>Sign In</span>
        </p>

        <p style={{ textAlign: 'center', marginTop: '15px', color: '#bbb', fontSize: '12px' }}>
          By signing up, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;