import { Router } from 'express';
const router = Router();
import { createRating, getRatingsByBlogId, deleteRating } from '../Controllers/ratingController.js';

router.post('/', createRating);
router.get('/:blogId', getRatingsByBlogId);
router.delete('/:id', deleteRating);

export default router;
