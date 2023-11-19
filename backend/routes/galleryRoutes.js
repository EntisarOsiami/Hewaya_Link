import { Router } from 'express';
import { uploadToCloudinary, getAllImages, deleteFromCloudinary, toggleFavorite,togglePublished } from '../Controllers/galleryController.js';
import { authenticateUser } from '../middleware/AuthMiddleware.js';
import upload from '../config/multerConfig.js';

const router = Router();

router.post('/upload', authenticateUser, upload.single('image'), uploadToCloudinary);
router.get('/images', authenticateUser, getAllImages);
router.delete('/images/:id',authenticateUser, deleteFromCloudinary);
router.patch('/images/:id/favorite', authenticateUser, toggleFavorite);
router.patch('/images/:id/published', authenticateUser, togglePublished);


export default router;
