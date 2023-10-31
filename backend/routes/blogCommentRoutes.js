import { Router } from 'express';
import {createComment, getCommentsByBlogId,deleteComment} from '../Controllers/commentController.js';



const router = Router();
router.post('/blogs/:blogId/comments', createComment);
router.get('/blogs/:blogId/comments', getCommentsByBlogId); 
router.delete('/blogs/:blogId/comments/:commentId', deleteComment);

export default router;

