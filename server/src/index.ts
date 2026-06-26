
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const axios = require('axios');
const FormData = require('form-data');

const app = express();
const upload = multer({ storage: multer.memoryStorage() });
app.use(cors());
app.use(express.json());

const AI_ENGINE_URL = 'http://localhost:8000';

app.post('/api/match', upload.single('cv'), async (req: any, res: any) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No CV file uploaded' });
    
    const jobs = req.body.jobs;
    if (!jobs) return res.status(400).json({ error: 'No jobs provided' });

    const formData = new FormData();
    formData.append('cv', req.file.buffer, {
      filename: req.file.originalname,
      contentType: req.file.mimetype,
    });
    formData.append('jobs', jobs);

    const response = await axios.post(`${AI_ENGINE_URL}/match`, formData, {
      headers: formData.getHeaders(),
    });

    res.json(response.data);
  } catch (error: any) {
    console.error('Match error:', error.message);
    res.status(500).json({ error: 'Matching failed' });
  }
});

app.get('/api/health', (req: any, res: any) => res.json({ status: 'ok' }));

app.listen(5000, () => console.log('Server running on port 5000'));