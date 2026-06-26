import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC<{ setIsLoggedIn: (v: boolean) => void }> = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9ff', fontFamily: "'Segoe UI', sans-serif" }}>
      <nav style={{ background: 'white', padding: '20px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 20px rgba(0,0,0,0.08)' }}>
        <div style={{ fontSize: '22px', fontWeight: 'bold', background: 'linear-gradient(135deg, #667eea, #764ba2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>🎯 JobMatcher AI</div>
        <button onClick={() => { localStorage.removeItem('user'); setIsLoggedIn(false); navigate('/'); }}>Logout</button>
      </nav>
      <div style={{ padding: '40px' }}>
        <h1 style={{ color: '#333' }}>👋 Welcome back, {user.name || user.email}!</h1>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '25px', marginTop: '30px' }}>
          {[
            { icon: '🎯', title: 'Find Job Matches', desc: 'Upload your CV and get AI-powered matches', action: () => navigate('/match'), btn: 'Start Matching', color: '#667eea' },
            { icon: '💼', title: 'Browse Jobs', desc: 'Explore all available job listings', action: () => navigate('/match'), btn: 'Browse Jobs', color: '#764ba2' },
            { icon: '📊', title: 'My Profile', desc: 'Update your profile and preferences', action: () => navigate('/profile'), btn: 'Edit Profile', color: '#f093fb' },
          ].map(card => (
            <div key={card.title} style={{ background: 'white', borderRadius: '20px', padding: '35px', boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}>
              <div style={{ fontSize: '45px', marginBottom: '15px' }}>{card.icon}</div>
              <h3 style={{ color: '#333', marginBottom: '10px' }}>{card.title}</h3>
              <p style={{ color: '#888', marginBottom: '20px' }}>{card.desc}</p>
              <button onClick={card.action} style={{ padding: '12px 25px', background: `linear-gradient(135deg, ${card.color}, #764ba2)`, color: 'white', border: 'none', borderRadius: '25px', cursor: 'pointer', fontWeight: 'bold' }}>{card.btn}</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;