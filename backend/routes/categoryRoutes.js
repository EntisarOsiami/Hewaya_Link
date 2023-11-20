import express from 'express';
import CategoryController from '../Controllers/CategoryController.js';

const router = express.Router();

router.post('/categories', CategoryController.createCategory);

router.get('/categories', CategoryController.getAllCategories);

router.get('/categories/:id', CategoryController.getCategoryById);

router.put('/categories/:id', CategoryController.updateCategory);

router.delete('/categories/:id', CategoryController.deleteCategory);

export default router;
