const express = require('express');
const path = require('path');
const logger = require('morgan');

const app = express();
const PORT = process.env.PORT || 3000;

// Data store
const desserts = ['Chocolate Cake', 'Cheesecake', 'Ice Cream', 'Apple Pie'];

// ===== Middleware =====
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// ===== Routes =====

// Welcome endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Express Server' });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  console.log('Health check endpoint hit');
  console.log(`Host: ${req.hostname}, Port: ${req.get('host')}`);
  res.json({ status: 'OK', timestamp: new Date() });
});

// Get all desserts
app.get('/api/desserts', (req, res) => {
  res.json(desserts);
});

// Add a new dessert
app.post('/api/desserts', (req, res) => {
  const { dessert } = req.body;
  desserts.push(dessert);
  res.status(201).json({ message: 'Dessert added', desserts });
});

// Delete all desserts
app.delete('/api/desserts', (req, res) => {
  desserts.length = 0;
  res.json({ message: 'All desserts removed', desserts });
});

// ===== Error Handling =====

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: `${req.host}${req.originalUrl} Not Found` });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// ===== Start Server =====
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log('Press Ctrl+C to shut down');
});