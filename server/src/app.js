const express = require('express');
const cors = require('cors');
const multer = require('multer');

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

app.use(cors());
app.use(express.json());

// IMPORTANT: Render needs this dynamic port, otherwise it may fail to bind.
const PORT = process.env.PORT || 5000;

app.post('/api/match', upload.single('cv'), (req, res) => {
  try {
    // Validation
    if (!req.file) {
      return res.status(400).json({ error: "No CV uploaded" });
    }

    // Mocked AI Response
    // We send this exact structure to match what your frontend expects
    const mockMatch = {
      matches: [
        {
          breakdown: "Your profile matches the requirements based on your experience.",
          match_score: 85.0
        }
      ]
    };

    // Send the response
    return res.status(200).json(mockMatch);

  } catch (error) {
    console.error("DEBUG ERROR:", error);
    // Send a safe 500 error if something crashes
    return res.status(500).json({ error: "Server error" });
  }
});

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));