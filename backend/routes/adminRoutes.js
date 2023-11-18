
import express from 'express';
import {
    disableUser,
    enableUser,
    getAllUsers,
    getAllPortals
} from '../Controllers/adminController.js';

const router = express.Router();

import { adminMiddleware, authenticateUser } from '../middleware/AuthMiddleware.js';

router.put('/disable/:_id', authenticateUser,adminMiddleware, disableUser);
router.put('/enable/:_id', authenticateUser, adminMiddleware, enableUser);
router.get('/users', authenticateUser, adminMiddleware, getAllUsers);
router.get('/portals', authenticateUser, adminMiddleware, getAllPortals);

export default router;

