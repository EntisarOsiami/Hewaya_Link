import { Schema, model } from 'mongoose';

const blogPostSchema = new Schema({
  title: { type: String, required: true }, 
  content: { type: String, required: true }, 
  author: {
    type: Schema.Types.ObjectId, 
    ref: 'User',
    required: true 
  }, 
  createdAt: { type: Date, default: Date.now },
  tags: [{
    type: Schema.Types.ObjectId, 
    ref: 'Tag',
  }],
  category: {
    type: Schema.Types.ObjectId, 
    ref: 'Category',
    required: true 
  },
});



const Blog = model('Blog', blogPostSchema);

export default Blog;
