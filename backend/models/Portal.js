import { Schema, model } from 'mongoose';

const portalSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: String,
  category: {
    type: String,
    enum: [
      'digital_art', 
      'painting', 
      'crafts', 
      'cooking', 
      'photography', 
      'gardening'
    ],
    required: true,
  },
  subscribers: [
    { type: Schema.Types.ObjectId, ref: 'User' }
  ],
  images: [
    { type: Schema.Types.ObjectId, ref: 'ImageGallery' }
  ]
}, {
  timestamps: true,
});

const Portal = model('Portal', portalSchema);

export default Portal;
