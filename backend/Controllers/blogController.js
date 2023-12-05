import { Blog , Portal } from '../models/index.js';
import Joi from 'joi';
import { JSDOM } from 'jsdom';


import sendResponse from "../Utils/sendResponse.js";


// A schema to validate blog data

const createBlogSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  author: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required(),
  category: Joi.string().required()
});


const stripHtml = (html) => {
  const dom = new JSDOM("");
  const div = dom.window.document.createElement('div');
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
};

const EXCERPT_LENGTH = 200; 


const generateExcerpt = (htmlContent) => {
  const strippedText = stripHtml(htmlContent);
  if (strippedText.length <= EXCERPT_LENGTH) {
    return strippedText;
  }
  const lastSpaceIndex = strippedText.lastIndexOf(' ', EXCERPT_LENGTH);
  return `${strippedText.substring(0, lastSpaceIndex)}...`;
};
const extractFirstImage = (htmlContent) => {
  const dom = new JSDOM(htmlContent);
  const firstImage = dom.window.document.querySelector('img');
  return firstImage?.src || null;
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

    const { title, content, author, tags, category } = req.body;

    let parsedTags = [];
    if (tags && tags.trim().length > 0) {
      parsedTags = tags.split(',').map(tag => tag.trim());
    }

    const blog = new Blog({ 
      title, 
      content, 
      author, 
      tags: parsedTags,  
      category 
    }); 

    await blog.save();
      // Find matching portals and update them
      const matchingPortals = await Portal.find({ categories: { $in: [category] } });
      for (const portal of matchingPortals) {
        portal.blog.push(blog._id);
        await portal.save();
      }
  

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

    const blogs = await findBlogs(startIndex, limit);

    const blogsWithExcerptsAndImages = blogs.map(blog => ({
      ...blog.toObject(),
      excerpt: generateExcerpt(blog.content),
      image: extractFirstImage(blog.content)
    }));

    const total = await getBlogCount();

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

const findBlogs = async (startIndex, limit) => {
  return await Blog.find()
    .populate('author', 'username')
    .sort({ createdAt: -1 })
    .skip(startIndex)
    .limit(limit);
};

const getBlogCount = async () => {
  return await Blog.countDocuments();
};


//@dec     Update a blog
//@route   PUT /api/blogs/:id
//@access  Private


const updateBlog = async (req, res) => {
  try {
    const { title, content, tags, category } = req.body;

    const parsedTags = tags ? tags.split(',').map(tag => tag.trim()) : undefined;

    const updateObject = {
      ...(title && { title }),
      ...(content && { content }),
      ...(parsedTags && { tags: parsedTags }),
      ...(category && { category })
    };

    const updatedBlog = await Blog.findByIdAndUpdate(req.params.blogId, updateObject, { new: true });

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
      .populate('author', 'username',)
      .populate('category', 'name')
      .populate('tags', 'name');

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
