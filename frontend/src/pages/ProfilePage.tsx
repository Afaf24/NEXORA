import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProfilePage: React.FC<{ setIsLoggedIn: (v: boolean) => void }> = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [name, setName] = useState(user.name || '');
  const [email, setEmail] = useState(user.email || '');
  const [saved, setSaved] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [skills, setSkills] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'info' | 'skills'>('info');

  const handleSave = () => {
    localStorage.setItem('user', JSON.stringify({ name, email }));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleAnalyzeCV = async () => {
    if (!file) return;
    setAnalyzing(true);
    try {
      const formData = new FormData();
      formData.append('cv', file);
      formData.append('jobs', JSON.stringify([{
        id: '1', title: 'General Analysis', company: 'N/A',
        skills: 'Python JavaScript React Node.js TypeScript SQL Machine Learning Docker AWS',
        experience: '5 years software development',
        education: 'Computer Science degree',
        description: 'General skill analysis'
      }]));
      const res = await axios.post('http://localhost:5000/api/match', formData);
      const match = res.data.matches[0];
      setSkills({
        breakdown: match.breakdown,
        overallScore: match.match_score,
        topSkills: ['React', 'TypeScript', 'Node.js', 'Python', 'SQL'],
        level: match.match_score > 70 ? 'Senior' : match.match_score > 50 ? 'Mid-level' : 'Junior',
      });
    } catch {
      setSkills({ error: true });
    }
    setAnalyzing(false);
  };

  const tabStyle = (tab: 'info' | 'skills') => ({
    padding: '12px 30px',
    border: 'none',
    borderRadius: '25px',
    cursor: 'pointer',
    fontWeight: 'bold' as const,
    fontSize: '15px',
    background: activeTab === tab ? 'linear-gradient(135deg, #667eea, #764ba2)' : 'transparent',
    color: activeTab === tab ? 'white' : '#888',
    transition: 'all 0.3s',
  });

  return (
    <div style={{ minHeight: '100vh', background: '#f0f2ff', fontFamily: "'Segoe UI', sans-serif" }}>

      {/* Navbar */}
      <nav style={{ background: 'white', padding: '18px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 20px rgba(0,0,0,0.08)' }}>
        <div style={{ fontSize: '24px', fontWeight: 'bold', background: 'linear-gradient(135deg, #667eea, #764ba2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', cursor: 'pointer' }} onClick={() => navigate('/dashboard')}>
          🅽 Nexora
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={() => navigate('/dashboard')} style={{ padding: '8px 20px', background: '#f0f2ff', color: '#667eea', border: 'none', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold' }}>← Dashboard</button>
          <button onClick={() => { localStorage.removeItem('user'); setIsLoggedIn(false); navigate('/'); }} style={{ padding: '8px 20px', background: '#ff4757', color: 'white', border: 'none', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold' }}>Logout</button>
        </div>
      </nav>

      {/* Header Banner */}
      <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '40px', textAlign: 'center', color: 'white' }}>
        <div style={{ width: '90px', height: '90px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px', margin: '0 auto 15px' }}>👤</div>
        <h2 style={{ margin: '0 0 5px', fontSize: '26px' }}>{name || 'Your Name'}</h2>
        <p style={{ margin: 0, opacity: 0.85 }}>{email}</p>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', padding: '25px', background: 'white', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
        <button style={tabStyle('info')} onClick={() => setActiveTab('info')}>👤 Personal Info</button>
        <button style={tabStyle('skills')} onClick={() => setActiveTab('skills')}>📊 Skill Analysis</button>
      </div>

      <div style={{ maxWidth: '700px', margin: '30px auto', padding: '0 20px' }}>

        {/* Personal Info Tab */}
        {activeTab === 'info' && (
          <div style={{ background: 'white', borderRadius: '20px', padding: '40px', boxShadow: '0 10px 40px rgba(0,0,0,0.08)' }}>
            <h3 style={{ margin: '0 0 25px', color: '#333' }}>Personal Information</h3>
            <label style={{ color: '#555', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Full Name</label>
            <input value={name} onChange={e => setName(e.target.value)}
              style={{ width: '100%', padding: '14px', border: '2px solid #eee', borderRadius: '10px', fontSize: '15px', marginBottom: '20px', boxSizing: 'border-box' }} />
            <label style={{ color: '#555', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Email Address</label>
            <input value={email} onChange={e => setEmail(e.target.value)}
              style={{ width: '100%', padding: '14px', border: '2px solid #eee', borderRadius: '10px', fontSize: '15px', marginBottom: '25px', boxSizing: 'border-box' }} />
            <button onClick={handleSave}
              style={{ width: '100%', padding: '15px', background: saved ? '#4CAF50' : 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', border: 'none', borderRadius: '10px', fontSize: '17px', fontWeight: 'bold', cursor: 'pointer' }}>
              {saved ? '✅ Saved!' : 'Save Changes'}
            </button>
          </div>
        )}

        {/* Skill Analysis Tab */}
        {activeTab === 'skills' && (
          <div>
            {/* Upload CV for Analysis */}
            <div style={{ background: 'white', borderRadius: '20px', padding: '35px', boxShadow: '0 10px 40px rgba(0,0,0,0.08)', marginBottom: '25px' }}>
              <h3 style={{ margin: '0 0 20px', color: '#333' }}>📄 Upload CV for Skill Analysis</h3>
              <input type="file" accept=".pdf,.docx,.txt" onChange={e => setFile(e.target.files?.[0] || null)}
                style={{ width: '100%', padding: '15px', border: '2px dashed #667eea', borderRadius: '10px', marginBottom: '15px', cursor: 'pointer', boxSizing: 'border-box' }} />
              {file && <p style={{ color: 'green', margin: '0 0 15px' }}>✅ {file.name}</p>}
              <button onClick={handleAnalyzeCV} disabled={!file || analyzing}
                style={{ width: '100%', padding: '14px', background: analyzing ? '#ccc' : 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', border: 'none', borderRadius: '10px', fontSize: '16px', fontWeight: 'bold', cursor: analyzing ? 'not-allowed' : 'pointer' }}>
                {analyzing ? '🔄 Analyzing...' : '🔍 Analyze My Skills'}
              </button>
            </div>

            {/* Results */}
            {skills && !skills.error && (
              <>
                {/* Overall Score */}
                <div style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)', borderRadius: '20px', padding: '30px', color: 'white', textAlign: 'center', marginBottom: '20px' }}>
                  <p style={{ margin: '0 0 10px', opacity: 0.85 }}>Overall Profile Score</p>
                  <div style={{ fontSize: '64px', fontWeight: 'bold' }}>{skills.overallScore.toFixed(0)}%</div>
                  <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: '20px', padding: '8px 20px', display: 'inline-block', marginTop: '10px', fontWeight: 'bold' }}>
                    {skills.level} Level
                  </div>
                </div>

                {/* Skill Bars */}
                <div style={{ background: 'white', borderRadius: '20px', padding: '35px', boxShadow: '0 10px 40px rgba(0,0,0,0.08)', marginBottom: '20px' }}>
                  <h3 style={{ margin: '0 0 25px', color: '#333' }}>📊 Skill Breakdown</h3>
                  {[
                    { label: '💡 Skills Match', value: skills.breakdown.skills, max: 40, color: '#667eea' },
                    { label: '💼 Experience', value: skills.breakdown.experience, max: 25, color: '#764ba2' },
                    { label: '🎓 Education', value: skills.breakdown.education, max: 15, color: '#f093fb' },
                    { label: '💰 Salary Fit', value: skills.breakdown.salary, max: 20, color: '#4CAF50' },
                  ].map(item => (
                    <div key={item.label} style={{ marginBottom: '20px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <span style={{ fontWeight: '600', color: '#333' }}>{item.label}</span>
                        <span style={{ fontWeight: 'bold', color: item.color }}>{item.value.toFixed(1)} / {item.max}</span>
                      </div>
                      <div style={{ background: '#f0f0f0', borderRadius: '10px', height: '12px', overflow: 'hidden' }}>
                        <div style={{ width: `${(item.value / item.max) * 100}%`, height: '100%', background: `linear-gradient(135deg, ${item.color}, #764ba2)`, borderRadius: '10px', transition: 'width 1s ease' }} />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Top Skills Tags */}
                <div style={{ background: 'white', borderRadius: '20px', padding: '35px', boxShadow: '0 10px 40px rgba(0,0,0,0.08)' }}>
                  <h3 style={{ margin: '0 0 20px', color: '#333' }}>🏷️ Detected Skills</h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                    {['React', 'TypeScript', 'Node.js', 'Python', 'SQL', 'Git', 'REST API', 'Problem Solving', 'Communication'].map(skill => (
                      <span key={skill} style={{ padding: '8px 18px', background: 'linear-gradient(135deg, #667eea20, #764ba220)', color: '#667eea', borderRadius: '20px', fontWeight: '600', border: '1px solid #667eea40', fontSize: '14px' }}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </>
            )}
            {skills?.error && <p style={{ color: 'red', textAlign: 'center' }}>❌ Analysis failed. Make sure servers are running.</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;