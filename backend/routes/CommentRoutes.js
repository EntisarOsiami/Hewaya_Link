import { Router } from 'express';
import { createComment, getCommentsByItemId, deleteComment } from '../Controllers/commentController.js';

const router = Router();

router.post('/', createComment);

router.get('/:onModel/:itemId', getCommentsByItemId);

router.delete('/:commentId', deleteComment);

export default router;
