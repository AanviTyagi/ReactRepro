require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config');
const userRoutes = require('./routes/userRoutes');
const moodRoutes = require('./routes/moodRoutes');
const path = require('path');
const fs = require('fs');

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Create uploads directory if it doesn't exist
const uploadDir = path.join(__dirname, 'uploads', 'profile-images');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Serve static files from the uploads directory with proper MIME types
app.use('/uploads', express.static(path.join(__dirname, 'uploads'), {
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.jpg') || filePath.endsWith('.jpeg')) {
      res.setHeader('Content-Type', 'image/jpeg');
    } else if (filePath.endsWith('.png')) {
      res.setHeader('Content-Type', 'image/png');
    } else if (filePath.endsWith('.gif')) {
      res.setHeader('Content-Type', 'image/gif');
    }
  }
}));

// MongoDB Connection
console.log('Attempting to connect to MongoDB...');
console.log('Using connection string:', config.MONGODB_URI.substr(0, 20) + '...');

mongoose.connect(config.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000
})
  .then(() => {
    console.log('Connected to MongoDB Atlas successfully');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  });

// Routes
app.use('/api/users', userRoutes);
app.use('/api/moods', moodRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    message: 'Something went wrong!', 
    error: err.message 
  });
});

const PORT = config.PORT || 5000;
app.listen(PORT, () => {
  console.log('=================================');
  console.log(`Server is running on port ${PORT}`);
  console.log(`Server URL: http://localhost:${PORT}`);
  console.log('API endpoints:');
  console.log(`- POST http://localhost:${PORT}/api/users/register`);
  console.log(`- POST http://localhost:${PORT}/api/users/login`);
  console.log(`- GET http://localhost:${PORT}/api/users/profile`);
  console.log(`- POST http://localhost:${PORT}/api/users/upload-profile-image`);
  console.log(`- GET http://localhost:${PORT}/api/moods`);
  console.log(`- POST http://localhost:${PORT}/api/moods`);
  console.log(`- GET http://localhost:${PORT}/api/moods/stats`);
  console.log('=================================');
}); 