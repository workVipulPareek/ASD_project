// AuthContext.js

import jwt from 'jsonwebtoken';
const SECRET_KEY = 'secretkey'; // Make sure this matches your JWT secret key

const AuthContext = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const tokenParts = authHeader.split(' ');
    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
      return res.status(401).json({ error: 'Malformed token' });
    }

    const token = tokenParts[1];
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; 
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(401).json({ error: 'Unauthorized' });
  }
};

export default AuthContext;
