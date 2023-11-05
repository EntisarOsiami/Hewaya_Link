import { Router } from 'express';
const router = Router();

import { createBlog, getAllBlogs, updateBlog, getBlogById, deleteBlog } from '../Controllers/blogController.js';


router.post('/', createBlog);
router.get('/', getAllBlogs);
router.get('/:blogId', getBlogById);
router.put('/:blogId', updateBlog);
router.delete('/:blogId', deleteBlog);

export default router;
