// Server-side API routes or custom server logic
// This can be used for additional backend functionality if needed

const express = require('express');
const app = express();

// Example API endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

module.exports = app;
