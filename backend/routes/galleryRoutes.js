import { Router } from 'express';
import { uploadToCloudinary, getAllImages, deleteFromCloudinary } from '../Controllers/galleryController.js';
import { authenticateUser } from '../middleware/AuthMiddleware.js';

const router = Router();

router.post('/upload', authenticateUser, uploadToCloudinary);
router.get('/images', authenticateUser, getAllImages);
router.delete('/images/:id', deleteFromCloudinary);

export default router;
