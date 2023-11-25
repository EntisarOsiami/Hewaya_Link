import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        firstName: String,
        lastName: String
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
      },
    password: {
        type: String,
        min : 8,
        max : 15,
    },
    birthDate: Date,
    role: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    disabled: {
        type: Boolean,
        default: false
    }
});

const Schema = mongoose.Schema;

const TagSchema = new Schema({
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      maxLength: [30, 'Tag name is too long'] 
    },
  }, { timestamps: true });

  const CategorySchema = new Schema({
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      maxLength: [32, 'Category name is too long'] 
    },
  }, { timestamps: true });

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

export const User = mongoose.models.User || mongoose.model("User", userSchema);
export const Portal = mongoose.models.Portal || mongoose.model("Portal", PortalSchema);
export const Category = mongoose.models.Category || mongoose.model("Category", CategorySchema);
export const Tag = mongoose.models.Tag || mongoose.model("Tag", TagSchema);
