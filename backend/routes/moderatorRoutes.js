import express from 'express';
import { authenticateUser } from '../middleware/AuthMiddleware.js';

import {
    disableUser,
    enableUser,
    getAllUsers,
    getAllPortals
    } 
from '../Controllers/adminController.js';

const router = express.Router();

router.put('/disable/:_id', disableUser);
router.put('/enable/:_id', enableUser);
router.get('/users', getAllUsers);
router.get('/portals', getAllPortals);
export default router;