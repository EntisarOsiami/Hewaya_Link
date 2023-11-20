// tagRoutes.js

import express from 'express';
import TagController from '../Controllers/TagController.js';

const router = express.Router();

router.post('/tags', TagController.createTag);

router.get('/tags', TagController.getAllTags);

router.get('/tags/:id', TagController.getTagById);

router.put('/tags/:id', TagController.updateTag);
router.delete('/tags/:id', TagController.deleteTag);

export default router;
