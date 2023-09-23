import express from 'express';
import { getUserRole,updateUserRole,getUsersByRole } from '../Controllers/roleController.js';
import { adminMiddleware } from '../middleware/AuthMiddleware.js';

const router = express.Router();

router.get('/:userId', getUserRole); // Check user role
router.put('/:userId', adminMiddleware, updateUserRole); // Update user role (admin only)
router.get('/byRole/:role', adminMiddleware, getUsersByRole); // List users by role (admin only)

export default router;
