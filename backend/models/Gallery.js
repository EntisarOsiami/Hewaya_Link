import { Schema, model } from 'mongoose';



const imageGallerySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  imageName: {
    type: String,
    required: [true, 'Image name is required'],
  },
  imageUrl: {
    type: String,
    required: [true, 'Image URL is required'],
  },
  metadata: {
    resolution: {
      width: Number,
      height: Number,
    },
    fileType: String,
    fileSize: Number,
  },
  description: {
    type: String,
  },
  points: {
    type: Number,
    default: 0,
  },
  visibility: {
    type: String,
    enum: ['public', 'private'],
    default: 'private',
  },
  category: String,
  album: String,
  cloudinaryId: {
    type: String,
    required: true,
  },
  published: {
    type: Boolean,
    default: false,
  },
  comments: [
    { type: Schema.Types.ObjectId, ref: 'Comment' },
  ],
  ratings: [
    { type: Schema.Types.ObjectId, ref: 'Rating' },
  ],
  favorites: [
    { type: Schema.Types.ObjectId, ref: 'User' },
  ]
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
  },
  toObject: {
    virtuals: true,
  }
});

imageGallerySchema.virtual('averageRating').get(function () {
  if (this.ratings && this.ratings.length > 0) {
    const sum = this.ratings.reduce((total, rating) => total + rating.value, 0);
    return sum / this.ratings.length;
  }
  return 0;
});

imageGallerySchema.index({ user: 1 });  

const Gallery = model('Gallery', imageGallerySchema);

export default Gallery;