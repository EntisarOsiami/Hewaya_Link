import { Blog } from '../models/index.js';
import Joi from 'joi';
import { JSDOM } from 'jsdom';

import sendResponse from "../Utils/responseHandler.js";


// A schema to validate blog data

const createBlogSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  author: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required(),
  tags: Joi.string().required()
});

// stripHtml function to generate an excerpt from the blog content
const stripHtml = (html) => {
  const dom = new JSDOM("");
  const temporaryDiv = dom.window.document.createElement('div');
  temporaryDiv.innerHTML = html;
  return temporaryDiv.textContent || temporaryDiv.innerText || "";
};

const EXCERPT_LENGTH = 200; 
const generateExcerpt = (htmlContent) => {
  const text = stripHtml(htmlContent);
  if (text.length <= EXCERPT_LENGTH) {
    return text;
  }
  let end = text.lastIndexOf(' ', EXCERPT_LENGTH);
  return `${text.substring(0, end)}...`;
};
const extractFirstImage = (htmlContent) => {
  const dom = new JSDOM(htmlContent);
  const firstImage = dom.window.document.querySelector('img');
  return firstImage ? firstImage.src : null; 
};


//@dec     Create a blog 
//@route   POST /api/blogs
//@access  Private

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

//@doc    Get all blogs
//@route  GET /api/blogs
//@access Public

const getAllBlogs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;

    const blogs = await Blog.find()
      .populate('author', 'username') 
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(limit);

      const blogsWithExcerptsAndImages = blogs.map(blog => {
        return {
          ...blog.toObject(), 
          excerpt: generateExcerpt(blog.content),
          image: extractFirstImage(blog.content) 
        };
      });

    const total = await Blog.countDocuments();

    const pagination = {
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalItems: total
    }; 
    sendResponse(res, { blogs: blogsWithExcerptsAndImages, pagination }, "Blogs retrieved successfully.");
  } catch (error) {
    console.error("Error fetching blogs:", error);
    sendResponse(res, null, `Server error: ${error.message}`, false);
  }
};

//@dec     Update a blog
//@route   PUT /api/blogs/:id
//@access  Private

const updateBlog = async (req, res) => {
  try {
    const { title, content, tags, } = req.body;

    const parsedTags = tags ? tags.split(',').map(tag => tag.trim()) : undefined;

    const updateObject = Object.fromEntries(
      Object.entries({ title, content, tags: parsedTags }).filter(([, val]) => val !== undefined)
    );

    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.blogId,
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


//@dec     Get a blog by id
//@route   GET /api/blogs/:id
//@access  Public

const getBlogById = async (req, res) => {
  try {
    const blogId = req.params.blogId;
    const blog = await Blog.findById(blogId)
      .populate('author', 'username');

    if (!blog) {
      return sendResponse(res, null, "Blog not found.", false);
    }

    sendResponse(res, blog, "Blog retrieved successfully.");
  } catch (error) {
    console.error(error);
    sendResponse(res, null, "Server error.", false);
  }
};
//@dec     Delete a blog
//@route   DELETE /api/blogs/:id
//@access  Private

const deleteBlog = async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.blogId);

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
