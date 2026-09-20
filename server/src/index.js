const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const authRoutes = require('./routes/auth.routes');
const problemRoutes = require('./routes/problem.routes');
const submissionRoutes = require('./routes/submission.routes');
const judgeRoutes = require('./routes/judge.routes');
const stageRoutes = require('./routes/stage.routes');
const analysisRoutes = require('./routes/analysis.routes');
const mentorRoutes = require('./routes/mentor.routes');
const analyticsRoutes = require('./routes/analytics.routes');
const StageController = require('./controllers/stage.controller');
const { optionalAuth } = require('./middleware/auth.middleware');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '2mb' }));

// Health Check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Phase 2 Problem Stages endpoint (with optional auth)
app.get('/api/v1/problems/:problem_id/stages', optionalAuth, StageController.getProblemStages);

// API Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/problems', problemRoutes);
app.use('/api/v1/submissions', submissionRoutes);
app.use('/api/v1/judge', judgeRoutes);
app.use('/api/v1/stages', stageRoutes);
app.use('/api/v1/analysis', analysisRoutes);
app.use('/api/v1/mentor', mentorRoutes);
app.use('/api/v1/analytics', analyticsRoutes);

// Serve Frontend Static Build (Production & Fallback)
const clientDist = path.join(__dirname, '../../client/dist');
if (fs.existsSync(clientDist)) {
  app.use(express.static(clientDist));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api') || req.path === '/health') return next();
    res.sendFile(path.join(clientDist, 'index.html'));
  });
}

// Global 404 for API routes
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[Online Code Judge] Backend running on port ${PORT} (0.0.0.0)`);
});

module.exports = app;