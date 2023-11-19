import { Router } from 'express';
import { uploadToCloudinary, getAllImages, deleteFromCloudinary, toggleFavorite,togglePublished,toggleVisibility } from '../Controllers/galleryController.js';
import { authenticateUser } from '../middleware/AuthMiddleware.js';
import upload from '../config/multerConfig.js';

const router = Router();

router.post('/upload', authenticateUser, upload.single('image'), uploadToCloudinary);
router.get('/images', authenticateUser, getAllImages);
router.delete('/images/:id',authenticateUser, deleteFromCloudinary);
router.patch('/images/:id/favorite', authenticateUser, toggleFavorite);
router.patch('/images/:id/publish', authenticateUser, togglePublished);
router.patch('/images/:id/visibility', authenticateUser, toggleVisibility);


export default router;
