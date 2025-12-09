const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const User = require('../models/User');
const config = require('../config');
const multer = require('multer');
const path = require('path');

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/profile-images/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png|gif|pdf/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Only image and PDF files are allowed!'));
  }
});

// Register User
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, dateOfBirth, gender, phone } = req.body;
    
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    user = new User({
      name,
      email,
      password,
      dateOfBirth,
      gender,
      phone
    });

    await user.save();

    // Create JWT token
    const token = jwt.sign(
      { userId: user._id },
      config.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        gender: user.gender,
        dateOfBirth: user.dateOfBirth,
        phone: user.phone
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Login User
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create JWT token
    const token = jwt.sign(
      { userId: user._id },
      config.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        gender: user.gender,
        dateOfBirth: user.dateOfBirth,
        phone: user.phone
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get User Profile
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update User Profile
router.put('/profile', auth, async (req, res) => {
  try {
    const { name, dateOfBirth, gender, phone } = req.body;
    const user = await User.findById(req.user.userId);
    
    if (name) user.name = name;
    if (dateOfBirth) user.dateOfBirth = dateOfBirth;
    if (gender) user.gender = gender;
    if (phone) user.phone = phone;
    
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Upload Profile Image
router.post('/upload-profile-image', auth, upload.single('profileImage'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const user = await User.findById(req.user.userId);
    const imageUrl = `http://localhost:5002/uploads/profile-images/${req.file.filename}`;
    user.profileImage = imageUrl;
    await user.save();

    res.json({ imageUrl });
  } catch (error) {
    console.error('Profile image upload error:', error);
    res.status(500).json({ message: 'Error uploading profile image' });
  }
});

// Upload Prescription
router.post('/upload-prescription', auth, upload.single('prescription'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const user = await User.findById(req.user.userId);
    const fileUrl = `http://localhost:5002/uploads/profile-images/${req.file.filename}`;
    
    const newPrescription = {
      name: req.file.originalname,
      fileUrl: fileUrl
    };

    user.prescriptions.push(newPrescription);
    await user.save();

    res.json(newPrescription);
  } catch (error) {
    console.error('Prescription upload error:', error);
    res.status(500).json({ message: 'Error uploading prescription' });
  }
});

// Delete Prescription
router.delete('/prescription/:prescriptionId', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    
    // Find prescription to get filename
    const prescription = user.prescriptions.id(req.params.prescriptionId);
    if (!prescription) {
      return res.status(404).json({ message: 'Prescription not found' });
    }

    // Remove from array
    user.prescriptions.pull(req.params.prescriptionId);
    await user.save();

    res.json({ message: 'Prescription deleted successfully' });
  } catch (error) {
    console.error('Prescription delete error:', error);
    res.status(500).json({ message: 'Error deleting prescription' });
  }
});

module.exports = router; 