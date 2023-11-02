import { Blog } from '../models/blogModels/index.js';
import Joi from 'joi';

function sendResponse(res, data, message, success = true) {
  res.status(success ? 200 : 400).json({
    success,
    data,
    message,
  });
}

const createBlogSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  author: Joi.string().required(),
  tags: Joi.string().required()
});

const createBlog = async (req, res) => {
  try {
    const { error } = createBlogSchema.validate(req.body);
    if (error) {
      return sendResponse(res, null, error.details[0].message, false);
    }

    const { title, content, author, tags } = req.body;
    const parsedTags = tags.split(',').map((tag) => tag.trim());
    const blog = new Blog({ title, content, author, tags: parsedTags });

    await blog.save();

    sendResponse(res, blog, "Blog created successfully.");
  } catch (error) {
    console.error(error); 
    sendResponse(res, null, "Server error.", false);
  }
};

const getAllBlogs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const blogs = await Blog.find().sort({ createdAt: -1 }).skip(startIndex).limit(limit);
    const total = await Blog.countDocuments();

    const pagination = {
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalItems: total
    };

    sendResponse(res, { blogs, pagination }, "Blogs retrieved successfully.");
  } catch (error) {
    console.error(error);
    sendResponse(res, null, "Server error.", false);
  }
};

const updateBlog = async (req, res) => {
  try {
    const { title, content, tags } = req.body;
  
    const parsedTags = tags ? tags.split(',').map(tag => tag.trim()) : undefined;
    
    const updateObject = Object.fromEntries(
      Object.entries({ title, content, tags: parsedTags }).filter(([key, val]) => val !== undefined)
    );

    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      updateObject,
      { new: true }
    );

    if (!updatedBlog) {
      return sendResponse(res, null, "Blog not found.", false);
    }
    
    sendResponse(res, updatedBlog, "Blog updated successfully.");
  } catch (error) {
    console.error(error);
    sendResponse(res, null, "Server error.", false);
  }
};


const getBlogById = async (req, res) => {
  try {
    const blogId = req.params.id;
    const blog = await Blog.findById(blogId).populate('author', 'name email');

    if (!blog) {
      return sendResponse(res, null, "Blog not found.", false);
    }

    sendResponse(res, blog, "Blog retrieved successfully.");
  } catch (error) {
    console.error(error);
    sendResponse(res, null, "Server error.", false);
  }
};

const deleteBlog = async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);

    if (!deletedBlog) {
      return sendResponse(res, null, "Blog not found.", false);
    }

    sendResponse(res, null, "Blog deleted successfully.");
  } catch (error) {
    console.error(error);
    sendResponse(res, null, "Server error.", false);
  }
};

export {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
};
