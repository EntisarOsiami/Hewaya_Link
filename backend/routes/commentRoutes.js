import { Router } from 'express';
const router = Router();
import {createComment, getCommentsByBlogId,deleteComment} from '../Controllers/commentController.js'
router.post('/', createComment);
router.get('/:blogId', getCommentsByBlogId);
router.delete('/:id', deleteComment);

export default router;
