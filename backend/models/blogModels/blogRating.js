import { Schema, model } from 'mongoose';

const ratingSchema = new Schema({
  value: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
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
  },
});

const Rating = model('Rating', ratingSchema);

export default Rating;
