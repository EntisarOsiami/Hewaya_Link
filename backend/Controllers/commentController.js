import Comment from '../models/blogModels/comment.js';
import Blog from '../models/blogModels/blog.js'; 
import Joi from 'joi';


const createCommentSchema = Joi.object({
  text: Joi.string().required(),
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

const createComment = async (req, res) => {
  try {
    const { error } = createCommentSchema.validate(req.body);

    if (error) {
      return sendResponse(res, null, error.details[0].message, false);
    }

    const { text, author, blogId } = req.body;
    const comment = new Comment({ text, author, blog: blogId });
    await comment.save();

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return sendResponse(res, null, "Blog not found.", false);
    }
    blog.comments.push(comment);
    await blog.save();

    sendResponse(res, comment, "Comment created successfully.");
  } catch (error) {
    console.error(error);
    sendResponse(res, null, "Server error.", false);
  }
};

const getCommentsByBlogId = async (req, res) => {
  try {
    const blogId = req.params.blogId;
    const comments = await Comment.find({ blog: blogId }).sort({ createdAt: -1 });
    sendResponse(res, comments, "Comments retrieved successfully.");
  } catch (error) {
    console.error(error);
    sendResponse(res, null, "Server error.", false);
  }
};

const deleteComment = async (req, res) => {
  try {
    const commentId = req.params.id;
    const comment = await Comment.findByIdAndDelete(commentId);

    const blog = await Blog.findById(comment.blog);
    if (!blog) {
      return sendResponse(res, null, "Blog not found.", false);
    }
    blog.comments = blog.comments.filter((c) => c.toString() !== commentId);
    await blog.save();

    sendResponse(res, null, "Comment deleted successfully.");
  } catch (error) {
    console.error(error);
    sendResponse(res, null, "Server error.", false);
  }
};

export {
  createComment,
  getCommentsByBlogId,
  deleteComment,
};
