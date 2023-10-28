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
  image: {
    type: Schema.Types.ObjectId,
    ref: 'ImageGallery',
  },
}, {
  timestamps: true,
});

const Comment = model('Comment', commentSchema);

export default Comment;
