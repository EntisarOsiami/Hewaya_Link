import Comment from '../models/blogModels/comment.js';

const createComment = async (req, res) => {
  try {
    const { text, author, blogId } = req.body;
    const comment = new Comment({ text, author, blog: blogId });
    await comment.save();

    const blog = await blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    blog.comments.push(comment);
    await blog.save();

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

const getCommentsByBlogId = async (req, res) => {
  try {
    const blogId = req.params.blogId;
    const comments = await find({ blog: blogId }).sort({ createdAt: -1 });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

const deleteComment = async (req, res) => {
  try {
    const commentId = req.params.id;
    const comment = await findByIdAndDelete(commentId);

    const blog = await blog.findById(comment.blog);
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    blog.comments = blog.comments.filter((c) => c.toString() !== commentId);
    await blog.save();

    res.json({ message: 'Comment deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export  {
  createComment,
  getCommentsByBlogId,
  deleteComment,
};
