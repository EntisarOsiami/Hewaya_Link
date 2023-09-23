import { Router } from 'express';
const router = Router();
import { uploadImage, getAllImages,deleteImage } from '../Controllers/imageGalleryController.js';

router.post('/upload', uploadImage);
router.get('/images', getAllImages);
router.delete('/images/:id', deleteImage)

export default router;
