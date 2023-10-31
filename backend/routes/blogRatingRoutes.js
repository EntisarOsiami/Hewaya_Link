import { Router } from 'express';
import { createRating, getRatingsByBlogId, deleteRating } from '../Controllers/ratingController.js';

const router = Router();


router.post('/blogs/:blogId/ratings', createRating);
router.get('/blogs/:blogId/ratings', getRatingsByBlogId); 
router.delete('/blogs/:blogId/ratings/:ratingId', deleteRating);

export default router;
