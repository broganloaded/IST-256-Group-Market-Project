const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Billing API
app.post('/api/billing', (req, res) => {
  console.log("Billing received:", req.body);
  res.json({ message: "Billing processed successfully" });
});

// Returns API
app.post('/api/returns', (req, res) => {
  console.log("Return request:", req.body);
  res.json({ message: "Return processed successfully" });
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
