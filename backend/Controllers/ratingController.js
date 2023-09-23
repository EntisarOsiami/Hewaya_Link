import Rating from '../models/blogModels/rating.js';

const createRating = async (req, res) => {
  try {
    const { value, author, blogId } = req.body;
    const rating = new Rating({ value, author, blog: blogId });
    await rating.save();

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    blog.ratings.push(rating);
    await blog.save();

    res.status(201).json(rating);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

const getRatingsByBlogId = async (req, res) => {
  try {
    const blogId = req.params.blogId;
    const ratings = await find({ blog: blogId }).sort({ createdAt: -1 });
    res.json(ratings);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

const deleteRating = async (req, res) => {
  try {
    const ratingId = req.params.id;
    const rating = await findByIdAndDelete(ratingId);

    const blog = await Blog.findById(rating.blog);
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    blog.ratings = blog.ratings.filter((r) => r.toString() !== ratingId);
    await blog.save();

    res.json({ message: 'Rating deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export  {
  createRating,
  getRatingsByBlogId,
  deleteRating,
};
