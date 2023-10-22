import { Router } from 'express';
import { uploadImageToCloudinary, getAllImages, deleteImageFromCloudinary } from '../Controllers/imageGalleryController.js';
import { multerUploads } from '../config/multerConfig.js';

const router = Router();

router.post('/upload', multerUploads, uploadImageToCloudinary);
router.get('/images', getAllImages);
router.delete('/images/:id', deleteImageFromCloudinary);

export default router;
