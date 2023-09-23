import { Router } from 'express';
const router = Router();
import { createBlog, getAllBlogs, getBlogById, updateBlog, deleteBlog } from '../Controllers/blogController.js';
import commentRoutes from './commentRoutes.js';
import ratingRoutes from './ratingRoutes.js';


router.post('/', createBlog);
router.get('/', getAllBlogs);
router.get('/:id', getBlogById);
router.put('/:id', updateBlog);
router.delete('/:id', deleteBlog);
router.use('/:blogId/comments', commentRoutes);
router.use('/:blogId/ratings', ratingRoutes);

export default router;

