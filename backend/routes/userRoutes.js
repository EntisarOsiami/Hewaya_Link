import express from 'express';
import {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  verifyEmail,
  resetPassword,
  confirmPasswordReset,
  resendVerificationEmail,
  calculateUserRankPoints,
} from '../Controllers/UserController.js';
import { authenticateUser } from '../middleware/AuthMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', authenticateUser, logoutUser);
router.get('/profile', authenticateUser, getUserProfile);
router.put('/profile', authenticateUser, updateUserProfile);
router.post('/verify-email', verifyEmail);
router.post('/reset-password', resetPassword);
router.post('/confirm-reset', confirmPasswordReset);
router.post('/resend-verification', resendVerificationEmail);
router.get('/rank-points', authenticateUser, calculateUserRankPoints);

export default router;
