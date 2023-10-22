import { Schema, model } from 'mongoose';

const imageGallerySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
  imageName: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  
  points: {
    type: Number,
    default: 0,
  },
  
  cloudinaryId: {
    type: String,
    required: true,
}
 
},

{
    timestamps: true,
  }

);

const ImageGallery = model('ImageGallery', imageGallerySchema);

export default ImageGallery;
