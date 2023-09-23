import express from 'express';
import { getUserRole,updateUserRole,getUsersByRole } from '../Controllers/roleController.js';
import { adminMiddleware } from '../middleware/AuthMiddleware.js';

const router = express.Router();

router.get('/:userId', getUserRole); 
router.put('/:userId', adminMiddleware, updateUserRole); 
router.get('/byRole/:role', adminMiddleware, getUsersByRole); 

export default router;
