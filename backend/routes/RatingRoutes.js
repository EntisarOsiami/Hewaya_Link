import express from 'express';
import { createRating, getAverageRatingByItemId, deleteRating } from '../Controllers/ratingController.js';

const router = express.Router();

// Route to create a new rating
router.post('/', createRating);

// Route to get average rating for a specific item
router.get('/average/:onModel/:itemId', getAverageRatingByItemId);

// Route to delete a rating
router.delete('/:onModel/:ratingId', deleteRating);

export default router;
