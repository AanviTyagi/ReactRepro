const jwt = require('jsonwebtoken');
const config = require('../config');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'No authentication token, authorization denied.' });
    }

    try {
      const decoded = jwt.verify(token, config.JWT_SECRET);
      
      // Set the user ID in the request object
      req.user = { 
        userId: decoded.userId  // This matches the payload structure in userRoutes.js
      };
      
      next();
    } catch (jwtError) {
      console.error('JWT verification error:', jwtError.message);
      return res.status(401).json({ message: 'Token is not valid or has expired' });
    }
  } catch (error) {
    console.error('Auth middleware error:', error.message);
    res.status(500).json({ message: 'Server error in authentication' });
  }
};

module.exports = auth; 