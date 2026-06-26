const express = require('express');
const cors = require('cors');
const multer = require('multer');
const axios = require('axios');
const FormData = require('form-data');

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

app.use(cors());
app.use(express.json());

// Set this to true to use mock data, false to use the real engine
const USE_MOCK = true; 

app.post('/api/match', upload.single('cv'), async (req, res) => {
  try {
    // 1. Validation
    if (!req.file) {
      return res.status(400).json({ error: "No CV uploaded" });
    }

    // 2. We are bypassing the AI Engine for now to ensure the server stays alive.
    // We return a strictly structured object that matches what your frontend expects.
    const mockMatch = {
      matches: [
        {
          breakdown: "This is a test result.",
          match_score: 85.0 // Use a number, not a string
        }
      ]
    };

    // 3. Send response ONLY ONCE
    return res.json(mockMatch);

  } catch (error) {
    console.error("DEBUG ERROR:", error);
    // Only send an error response if we haven't already sent a response
    if (!res.headersSent) {
      return res.status(500).json({ error: "Server error" });
    }
  }
});

   

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));
app.listen(5000, () => console.log('Server running on port 5000'));