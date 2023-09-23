import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModels.js';

const authenticateUser = asyncHandler(async (req, res, next) => {
  let token;

  // Get the token from the cookie
  token = req.cookies.jwt;

  if (token) {
    try {
      // Verify the token and decode it
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Fetch the user data (excluding the password)
      req.user = await User.findById(decoded.userId).select('-password');

      // Continue to the next middleware
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

const adminMiddleware = (req, res, next) => {
  // Check if the user is an administrator (you should have a role field in your user model)
  if (req.user && req.user.role === 'admin') {
    // User is an admin, allow access to the route
    next();
  } else {
    // User is not an admin, deny access
    res.status(403).json({ message: 'Access denied. You must be an administrator.' });
  }
};



export { authenticateUser,adminMiddleware };
