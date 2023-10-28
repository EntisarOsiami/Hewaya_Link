import { Blog, Rating } from '../models/blogModels/index.js';
import Joi from 'joi';

const createRatingSchema = Joi.object({
  value: Joi.number().min(1).max(5).required(), 
  author: Joi.string().required(),
  blogId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required() 
});

function sendResponse(res, data, message, success = true) {
  res.status(success ? 200 : 400).json({
    success,
    data,
    message,
  });
}

const createRating = async (req, res) => {
  try {
    const { error } = createRatingSchema.validate(req.body);

    if (error) {
      return sendResponse(res, null, error.details[0].message, false);
    }

    const { value, author, blogId } = req.body;
    const rating = new Rating({ value, author, blog: blogId });
    await rating.save();

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return sendResponse(res, null, "Blog not found.", false);
    }
    blog.ratings.push(rating);
    await blog.save();

    sendResponse(res, rating, "Rating added successfully.");
  } catch (error) {
    console.error(error);
    sendResponse(res, null, "Server error.", false);
  }
};

const getRatingsByBlogId = async (req, res) => {
  try {
    const blogId = req.params.blogId;
    const ratings = await Rating.find({ blog: blogId }).sort({ createdAt: -1 });
    sendResponse(res, ratings, "Ratings retrieved successfully.");
  } catch (error) {
    console.error(error);
    sendResponse(res, null, "Server error.", false);
  }
};

const deleteRating = async (req, res) => {
  try {
    const ratingId = req.params.id;
    const rating = await Rating.findByIdAndDelete(ratingId);

    const blog = await Blog.findById(rating.blog);
    if (!blog) {
      return sendResponse(res, null, "Blog not found.", false);
    }
    blog.ratings = blog.ratings.filter((r) => r.toString() !== ratingId);
    await blog.save();

    sendResponse(res, null, "Rating deleted successfully.");
  } catch (error) {
    console.error(error);
    sendResponse(res, null, "Server error.", false);
  }
};

export {
  createRating,
  getRatingsByBlogId,
  deleteRating,
};
