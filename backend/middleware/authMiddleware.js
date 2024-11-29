/*const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  try{
      const token = req.headers.authorization?.split(' ')[1];
      if(!token){
        return res.status(401).json({ message: 'Unauthorized' });  
      }

      if (tokenBlacklist.includes(token)) {
        return res.status(401).json({ message: 'Token is invalid (logged out)' });
      }
    
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');

    next();
  }catch(error){
    res.status(401).json({
      message: 'Unauthorized'
    });
  }
};

module.exports = authMiddleware;*/
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  try{
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')){
      return res.status(401).json({
        message: 'Unauthorized'
      });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    
    if(!user){
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user;
    next();
  }catch(error){
    console.error('Auth Middleware Error:', error.message);
    res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = authMiddleware;

