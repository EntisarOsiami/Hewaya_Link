import { Router } from 'express';
import { uploadToCloudinary, getAllImages, deleteFromCloudinary } from '../Controllers/galleryController.js';
import { authenticateUser } from '../middleware/AuthMiddleware.js';
import upload from '../config/multerConfig.js';

const router = Router();

router.post('/upload', authenticateUser, upload.single('image'), uploadToCloudinary);
router.get('/images', authenticateUser, getAllImages);
router.delete('/images/:id', deleteFromCloudinary);

export default router;
