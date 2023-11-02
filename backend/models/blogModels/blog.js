import { Schema, model } from 'mongoose';

const blogPostSchema = new Schema({
  title: String,
  content: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  tags: [String],
});

const Blog = model('Blog', blogPostSchema);

export default Blog;
