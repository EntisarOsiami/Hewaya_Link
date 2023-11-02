import { Schema, model } from 'mongoose';

const commentSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  blog: {
    type: Schema.Types.ObjectId,
    ref: 'Blog',
  }
});

const Comment = model('Comment', commentSchema);

export default Comment;
