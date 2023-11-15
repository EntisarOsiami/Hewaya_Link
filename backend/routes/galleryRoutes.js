import { Router } from 'express';
import { uploadToCloudinary, getAllImages, deleteFromCloudinary } from '../Controllers/galleryController.js';
import { authenticateUser } from '../middleware/AuthMiddleware.js';
import { uploadSingleImage } from '../config/uploadConfig.js';

const router = Router();

router.post('/upload', authenticateUser, uploadSingleImage, uploadToCloudinary);
router.get('/images', authenticateUser, getAllImages);
router.delete('/images/:id', authenticateUser, deleteFromCloudinary);

export default router;
