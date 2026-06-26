import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", margin: 0 }}>

      {/* Navbar */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 60px', background: 'white', boxShadow: '0 2px 20px rgba(0,0,0,0.08)' }}>
        <div style={{ fontSize: '24px', fontWeight: 'bold', background: 'linear-gradient(135deg, #667eea, #764ba2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          🎯 JobMatcher AI
        </div>
        <div style={{ display: 'flex', gap: '15px' }}>
          <button onClick={() => navigate('/login')} style={{ padding: '10px 25px', border: '2px solid #667eea', background: 'transparent', color: '#667eea', borderRadius: '25px', cursor: 'pointer', fontWeight: 'bold', fontSize: '15px' }}>
            Login
          </button>
          <button onClick={() => navigate('/register')} style={{ padding: '10px 25px', border: 'none', background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', borderRadius: '25px', cursor: 'pointer', fontWeight: 'bold', fontSize: '15px' }}>
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '100px 60px', textAlign: 'center', color: 'white' }}>
        <div style={{ fontSize: '18px', background: 'rgba(255,255,255,0.2)', display: 'inline-block', padding: '8px 20px', borderRadius: '20px', marginBottom: '25px' }}>
          🤖 Powered by AI Embeddings
        </div>
        <h1 style={{ fontSize: '58px', margin: '0 0 20px', fontWeight: '800', lineHeight: 1.2 }}>
          Find Your Perfect<br />Job Match with AI
        </h1>
        <p style={{ fontSize: '20px', opacity: 0.9, maxWidth: '600px', margin: '0 auto 40px' }}>
          Upload your CV and let our AI analyze thousands of jobs to find your best matches based on skills, experience, education, location and salary.
        </p>
        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
          <button onClick={() => navigate('/register')} style={{ padding: '18px 45px', background: 'white', color: '#667eea', border: 'none', borderRadius: '35px', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
            🚀 Start Matching Free
          </button>
          <button onClick={() => navigate('/login')} style={{ padding: '18px 45px', background: 'transparent', color: 'white', border: '2px solid white', borderRadius: '35px', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer' }}>
            Sign In
          </button>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0', background: '#f8f9ff' }}>
        {[
          { number: '50K+', label: 'Jobs Analyzed' },
          { number: '95%', label: 'Match Accuracy' },
          { number: '10K+', label: 'Users Hired' },
        ].map(stat => (
          <div key={stat.label} style={{ textAlign: 'center', padding: '50px 20px', borderRight: '1px solid #eee' }}>
            <div style={{ fontSize: '42px', fontWeight: '800', background: 'linear-gradient(135deg, #667eea, #764ba2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{stat.number}</div>
            <div style={{ color: '#666', fontSize: '16px', marginTop: '8px' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* How it works */}
      <div style={{ padding: '80px 60px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '38px', marginBottom: '10px', color: '#333' }}>How It Works</h2>
        <p style={{ color: '#888', fontSize: '17px', marginBottom: '60px' }}>Three simple steps to find your dream job</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px', maxWidth: '900px', margin: '0 auto' }}>
          {[
            { icon: '📄', title: 'Upload CV', desc: 'Upload your CV in PDF or DOCX format' },
            { icon: '🤖', title: 'AI Analysis', desc: 'Our AI analyzes your skills and experience using embeddings' },
            { icon: '🎯', title: 'Get Matches', desc: 'Receive ranked job matches with detailed score breakdown' },
          ].map((step, i) => (
            <div key={i} style={{ background: 'white', borderRadius: '20px', padding: '40px 30px', boxShadow: '0 10px 40px rgba(0,0,0,0.08)' }}>
              <div style={{ fontSize: '50px', marginBottom: '20px' }}>{step.icon}</div>
              <h3 style={{ fontSize: '20px', marginBottom: '12px', color: '#333' }}>{step.title}</h3>
              <p style={{ color: '#888', lineHeight: 1.6 }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Matching Criteria */}
      <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '80px 60px', color: 'white', textAlign: 'center' }}>
        <h2 style={{ fontSize: '38px', marginBottom: '50px' }}>Our AI Matching Criteria</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', maxWidth: '900px', margin: '0 auto' }}>
         {[
  { icon: '💡', label: 'Skills Match', pct: '95%' },
  { icon: '💼', label: 'Experience', pct: '85%' },
  { icon: '🎓', label: 'Education', pct: '80%' },
  { icon: '💰', label: 'Salary Fit', pct: '90%' },
].map(c => (
            <div key={c.label} style={{ background: 'rgba(255,255,255,0.15)', borderRadius: '15px', padding: '25px 15px' }}>
              <div style={{ fontSize: '35px', marginBottom: '10px' }}>{c.icon}</div>
              <div style={{ fontSize: '28px', fontWeight: 'bold' }}>{c.pct}</div>
              <div style={{ fontSize: '13px', opacity: 0.85, marginTop: '5px' }}>{c.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{ background: '#1a1a2e', color: 'white', textAlign: 'center', padding: '30px' }}>
       <p style={{ margin: 0, opacity: 0.6 }}>© 2026 JobMatcher AI — Built by Afaf Albadawy</p>
      </div>
    </div>
  );
};

export default LandingPage;