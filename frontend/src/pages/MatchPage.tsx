import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Job {
  job_id: string;
  job_title: string;
  employer_name: string;
  job_city: string;
  job_country: string;
  job_description: string;
  job_apply_link: string;
  job_min_salary: number;
  job_max_salary: number;
  employer_logo: string;
}

interface Match {
  job_id: string;
  title: string;
  company: string;
  match_score: number;
  apply_link: string;
  logo: string;
  location: string;
  salary: string;
  breakdown: {
    skills: number;
    experience: number;
    education: number;
    location: number;
    salary: number;
  };
}

const JSEARCH_KEY = '39f81dbc69msh2f574885b9e3859p1de66ejsne64dcf7d59ef';

const MatchPage: React.FC = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [query, setQuery] = useState('');
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState('');
  const [error, setError] = useState('');

  const handleMatch = async () => {
    if (!file) return setError('Please upload your CV first');
    if (!query) return setError('Please enter a job title to search');
    setLoading(true);
    setError('');
    setMatches([]);
    try {
      setStep('🔍 Searching real jobs from Indeed and LinkedIn...');
      const jobsRes = await axios.get('https://jsearch.p.rapidapi.com/search', {
        params: { query: query, page: '1', num_pages: '2', date_posted: 'month' },
        headers: { 'X-RapidAPI-Key': JSEARCH_KEY, 'X-RapidAPI-Host': 'jsearch.p.rapidapi.com' }
      });
      const realJobs: Job[] = jobsRes.data.data;
      if (!realJobs || realJobs.length === 0) {
        setError('No jobs found. Try a different search term.');
        setLoading(false);
        return;
      }
      setStep('🤖 AI is analyzing your CV against real jobs...');
      const formattedJobs = realJobs.slice(0, 8).map((job: Job) => ({
        id: job.job_id,
        title: job.job_title,
        company: job.employer_name,
        location: `${job.job_city || ''} ${job.job_country || ''}`,
        salary: job.job_min_salary ? `$${job.job_min_salary} - $${job.job_max_salary}` : 'Competitive salary',
        skills: job.job_description?.slice(0, 400) || '',
        experience: job.job_description?.slice(400, 650) || '',
        education: job.job_description?.slice(650, 800) || '',
        description: job.job_description?.slice(0, 500) || ''
      }));
      const formData = new FormData();
      formData.append('cv', file);
      formData.append('jobs', JSON.stringify(formattedJobs));
      setStep('📊 Calculating match scores...');
      const matchRes = await axios.post('http://localhost:5000/api/match', formData);
      setStep('✅ Done!');
      const finalMatches = matchRes.data.matches.map((match: any) => {
        const originalJob = realJobs.find((j: Job) => j.job_id === match.job_id);
        return {
          ...match,
          apply_link: originalJob?.job_apply_link || '',
          logo: originalJob?.employer_logo || '',
          location: `${originalJob?.job_city || ''} ${originalJob?.job_country || ''}`,
          salary: originalJob?.job_min_salary ? `$${originalJob.job_min_salary} - $${originalJob.job_max_salary}` : 'Competitive',
        };
      });
      setMatches(finalMatches);
    } catch (err: any) {
      console.error(err);
      setError('Something failed. Make sure all 3 servers are running.');
    }
    setLoading(false);
    setStep('');
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f0f2ff', fontFamily: "'Segoe UI', sans-serif" }}>
      <nav style={{ background: 'white', padding: '18px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 20px rgba(0,0,0,0.08)' }}>
        <div onClick={() => navigate('/dashboard')} style={{ fontSize: '22px', fontWeight: 'bold', background: 'linear-gradient(135deg, #667eea, #764ba2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', cursor: 'pointer' }}>
          🅽 Nexora
        </div>
        <button onClick={() => navigate('/dashboard')} style={{ padding: '8px 20px', background: '#667eea', color: 'white', border: 'none', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold' }}>
          ← Dashboard
        </button>
      </nav>

      <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px' }}>
        <div style={{ background: 'white', borderRadius: '20px', padding: '40px', boxShadow: '0 10px 40px rgba(0,0,0,0.08)', marginBottom: '30px' }}>
          <h2 style={{ margin: '0 0 8px', color: '#1a1a2e' }}>🎯 AI Job Matcher</h2>
          <p style={{ color: '#888', marginBottom: '25px' }}>Upload your CV and search real jobs from LinkedIn and Indeed</p>
          <label style={{ color: '#555', fontWeight: '600', display: 'block', marginBottom: '8px' }}>📄 Upload Your CV</label>
          <input type="file" accept=".pdf,.docx,.txt" onChange={e => setFile(e.target.files?.[0] || null)}
            style={{ width: '100%', padding: '15px', border: '2px dashed #667eea', borderRadius: '10px', marginBottom: '10px', cursor: 'pointer', boxSizing: 'border-box' }} />
          {file && <p style={{ color: 'green', margin: '0 0 15px', fontSize: '14px' }}>✅ {file.name}</p>}
          <label style={{ color: '#555', fontWeight: '600', display: 'block', marginBottom: '8px' }}>🔍 Job Title to Search</label>
          <input value={query} onChange={e => setQuery(e.target.value)}
            placeholder="e.g. React Developer, Data Scientist, Product Manager..."
            style={{ width: '100%', padding: '14px', border: '2px solid #eee', borderRadius: '10px', fontSize: '15px', marginBottom: '20px', boxSizing: 'border-box', outline: 'none' }} />
          {error && <p style={{ color: 'red', marginBottom: '15px' }}>❌ {error}</p>}
          {step && (
            <div style={{ background: '#f0f2ff', borderRadius: '10px', padding: '12px 18px', marginBottom: '15px', color: '#667eea', fontWeight: '600' }}>
              {step}
            </div>
          )}
          <button onClick={handleMatch} disabled={loading}
            style={{ width: '100%', padding: '16px', background: loading ? '#ccc' : 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', border: 'none', borderRadius: '10px', fontSize: '17px', fontWeight: 'bold', cursor: loading ? 'not-allowed' : 'pointer' }}>
            {loading ? '🔄 Analyzing...' : '🚀 Find My Matches'}
          </button>
        </div>

        {matches.length > 0 && (
          <div>
            <h2 style={{ color: '#1a1a2e', marginBottom: '20px' }}>🏆 Your Top Matches — Real Jobs</h2>
            {matches.map((match, i) => (
              <div key={match.job_id} style={{ background: 'white', borderRadius: '16px', padding: '25px', marginBottom: '20px', boxShadow: '0 8px 30px rgba(0,0,0,0.08)', borderLeft: `4px solid ${match.match_score > 60 ? '#4CAF50' : match.match_score > 40 ? '#FF9800' : '#f44336'}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    {match.logo
                      ? <img src={match.logo} alt="logo" style={{ width: '50px', height: '50px', borderRadius: '10px', objectFit: 'contain', border: '1px solid #eee' }} />
                      : <div style={{ width: '50px', height: '50px', borderRadius: '10px', background: 'linear-gradient(135deg, #667eea, #764ba2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: '20px' }}>
                          {match.company?.[0] || '?'}
                        </div>
                    }
                    <div>
                      <h3 style={{ margin: 0, color: '#1a1a2e', fontSize: '18px' }}>#{i + 1} {match.title}</h3>
                      <p style={{ margin: '4px 0 0', color: '#888', fontSize: '14px' }}>🏢 {match.company}</p>
                      <p style={{ margin: '3px 0 0', color: '#aaa', fontSize: '13px' }}>📍 {match.location} | 💰 {match.salary}</p>
                    </div>
                  </div>
                  <div style={{ background: match.match_score > 60 ? '#4CAF50' : match.match_score > 40 ? '#FF9800' : '#f44336', color: 'white', borderRadius: '50px', padding: '8px 18px', fontWeight: 'bold', fontSize: '20px' }}>
                    {match.match_score.toFixed(0)}%
                  </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  {[
                    { label: '💡 Skills', value: match.breakdown.skills, max: 40, color: '#667eea' },
                    { label: '💼 Experience', value: match.breakdown.experience, max: 25, color: '#764ba2' },
                    { label: '🎓 Education', value: match.breakdown.education, max: 15, color: '#f093fb' },
                    { label: '💰 Salary', value: match.breakdown.salary, max: 20, color: '#4CAF50' },
                  ].map(item => (
                    <div key={item.label} style={{ marginBottom: '10px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '4px' }}>
                        <span style={{ color: '#555', fontWeight: '600' }}>{item.label}</span>
                        <span style={{ color: item.color, fontWeight: 'bold' }}>{item.value.toFixed(1)}/{item.max}</span>
                      </div>
                      <div style={{ background: '#f0f0f0', borderRadius: '10px', height: '8px' }}>
                        <div style={{ width: `${Math.min((item.value / item.max) * 100, 100)}%`, height: '100%', background: item.color, borderRadius: '10px' }} />
                      </div>
                    </div>
                  ))}
                </div>

                {match.apply_link
                  ? <a href={match.apply_link} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', padding: '12px 28px', background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', borderRadius: '25px', textDecoration: 'none', fontWeight: 'bold', fontSize: '15px' }}>🚀 Apply Now →</a>
                  : <span style={{ color: '#ccc', fontSize: '14px' }}>No apply link available</span>
                }
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchPage;