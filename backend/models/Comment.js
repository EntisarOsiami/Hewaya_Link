import mongoose from 'mongoose';
const { Schema, model } = mongoose;

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
  item: { 
    type: Schema.Types.ObjectId,
    required: true,
    refPath: 'onModel',
  },
  onModel: { 
    type: String,
    required: true,
    enum: ['Blog', 'Gallery', 'Portal', /* other model names */],
  },
});



const Comment = model('Comment', commentSchema);

export default Comment;
