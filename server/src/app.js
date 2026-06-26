const express = require('express');
const cors = require('cors');
const multer = require('multer');

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.post('/api/match', upload.single('cv'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No CV uploaded" });
    }

    // Read jobs sent from the frontend
    let jobs = [];

    try {
      jobs = JSON.parse(req.body.jobs || "[]");
    } catch (e) {
      jobs = [];
    }

    // Build a fake AI response that matches the frontend interface
    const matches = jobs.map((job, index) => ({
      job_id: job.id,
      title: job.title,
      company: job.company,

      // Give different scores so the cards look realistic
      match_score: Math.max(95 - index * 5, 60),

      breakdown: {
        skills: 35,
        experience: 22,
        education: 13,
        location: 8,
        salary: 18
      }
    }));

    return res.status(200).json({
      matches
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Server error"
    });
  }
});

app.get('/api/health', (req, res) => {
  res.json({
    status: "ok"
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});