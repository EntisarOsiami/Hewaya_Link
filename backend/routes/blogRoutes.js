import { Router } from 'express';
const router = Router();
import { createBlog, getAllBlogs, updateBlog, getBlogById, deleteBlog } from '../Controllers/blogController.js';
import commentRoutes from './commentRoutes.js';
import ratingRoutes from './ratingRoutes.js';

router.post('/', createBlog);
router.get('/blogs', getAllBlogs);
router.use('/:blogId/comments', commentRoutes); 
router.use('/:blogId/ratings', ratingRoutes);  
router.get('/blogId', getBlogById); 
router.put('/blogId', updateBlog); 
router.delete('/blogId', deleteBlog); 

export default router;
