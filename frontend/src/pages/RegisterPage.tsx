import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterPage: React.FC<{ setIsLoggedIn: (v: boolean) => void }> = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [done, setDone] = useState(false);

  const handleRegister = () => {
    if (name && email && password) {
      localStorage.setItem('user', JSON.stringify({ name, email }));
      setIsLoggedIn(true);
      setDone(true);
      setTimeout(() => navigate('/dashboard'), 2000);
    }
  };

  if (done) return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: 'white', borderRadius: '20px', padding: '50px', textAlign: 'center', width: '400px' }}>
        <div style={{ fontSize: '60px' }}>🎉</div>
        <h2 style={{ color: '#333' }}>Welcome to JobMatcher AI!</h2>
        <p style={{ color: '#888' }}>Hi {name}! Your account is ready. Redirecting...</p>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: 'white', borderRadius: '20px', padding: '50px', width: '400px', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>🚀 Create Account</h2>
        <input placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} style={{ width: '100%', padding: '14px', marginBottom: '15px', border: '2px solid #eee', borderRadius: '10px', fontSize: '15px', boxSizing: 'border-box' }} />
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} style={{ width: '100%', padding: '14px', marginBottom: '15px', border: '2px solid #eee', borderRadius: '10px', fontSize: '15px', boxSizing: 'border-box' }} />
        <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} style={{ width: '100%', padding: '14px', marginBottom: '20px', border: '2px solid #eee', borderRadius: '10px', fontSize: '15px', boxSizing: 'border-box' }} />
        <button onClick={handleRegister} style={{ width: '100%', padding: '15px', background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', border: 'none', borderRadius: '10px', fontSize: '17px', fontWeight: 'bold', cursor: 'pointer' }}>
          Create Account
        </button>
        <p style={{ textAlign: 'center', marginTop: '20px', color: '#888' }}>
          Have account? <span onClick={() => navigate('/login')} style={{ color: '#667eea', cursor: 'pointer', fontWeight: 'bold' }}>Login</span>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;