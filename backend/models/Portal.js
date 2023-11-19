import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const PortalSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  categories: [{
    type: Schema.Types.ObjectId,
    ref: 'Category' 
  }],
  tags: [{
    type: Schema.Types.ObjectId,
    ref: 'Tag' 
  }],
  subscribers: [{
    type: Schema.Types.ObjectId,
    ref: 'User' 
  }],
  moderators: [{
    type: Schema.Types.ObjectId,
    ref: 'User' 
  }],
  Images: [{
    type: Schema.Types.ObjectId,
    ref: 'Gallery' 
  }],
  analytics: {
    views: { type: Number, default: 0 },
    interactions: { type: Number, default: 0 },
    subscribers: { type: Number, default: 0 },
    posts: { type: Number, default: 0 },
    
  }
}, { timestamps: true });

export default model('Portal', PortalSchema);
