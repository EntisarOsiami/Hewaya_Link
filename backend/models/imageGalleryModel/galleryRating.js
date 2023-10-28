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
  image: {
    type: Schema.Types.ObjectId,
    ref: 'ImageGallery',
  },
}, {
  timestamps: true,
});

const Rating = model('Rating', ratingSchema);

export default Rating;