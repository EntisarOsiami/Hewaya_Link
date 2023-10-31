import { Router } from 'express';
const router = Router();

import { createBlog, getAllBlogs, updateBlog, getBlogById, deleteBlog } from '../Controllers/blogController.js';
import commentRoutes from './blogCommentRoutes.js';
import ratingRoutes from './blogRatingRoutes.js';

router.post('/', createBlog);
router.get('/', getAllBlogs);
router.get('/:blogId', getBlogById);
router.put('/:blogId', updateBlog);
router.delete('/:blogId', deleteBlog);
router.use('/:blogId/comments', commentRoutes);
router.use('/:blogId/ratings', ratingRoutes);

export default router;
