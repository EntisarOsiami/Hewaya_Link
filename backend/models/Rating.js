import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const ratingSchema = new Schema({
  value: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User', 
    required: true
  },
  item: {
    type: Schema.Types.ObjectId,
    required: true,
    refPath: 'onModel' 
  },
  onModel: {
    type: String,
    required: true,
    enum: ['Blog', 'Gallery', 'Portal']
  }
}, {
  timestamps: true 
});

ratingSchema.index({ author: 1, item: 1, onModel: 1 }, { unique: true });


const Rating = model('Rating', ratingSchema);

export default Rating;
