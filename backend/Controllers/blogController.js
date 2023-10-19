import Blog from '../models/blogModels/blog.js';
import Joi from 'joi';


// Create a new blog post.

const createBlogSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  author: Joi.string().required(),
  tags: Joi.array().items(Joi.string())
});

const createBlog = async (req, res) => {
  try {
    const { error } = createBlogSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { title, content, author, tags } = req.body;
    
    const blog = new Blog({ title, content, author, tags });
    
    await blog.save();
    
    res.status(201).json(blog);
  } catch (error) {
    console.error(error); 
    res.status(500).json({ error: 'Server error' });
  }
};

// Retrieve a list of all blog posts, sorted by creation date.
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

    res.json({ blogs, pagination });
  } catch (error) {
    console.error(error); 
    res.status(500).json({ error: 'Server error' });
  }
};

// Update an existing blog post.
const updateBlog = async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      { title, content, tags },
      { new: true }
    );
    
    if (!updatedBlog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    
    res.json(updatedBlog);
  } catch (error) {
    console.error(error); 
    res.status(500).json({ error: 'Server error' });
  }
};

// Retrieve a specific blog post by its ID.
const getBlogById = async (req, res) => {
  try {
    const blogId = req.params.id; 
    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    res.json(blog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete a blog post by its ID.
const deleteBlog = async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    
    if (!deletedBlog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    
    res.json({ message: 'Blog deleted' });
  } catch (error) {
    console.error(error); 
    res.status(500).json({ error: 'Server error' });
  }
};

export {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
};