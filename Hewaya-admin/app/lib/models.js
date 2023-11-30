import mongoose from "mongoose";


const { Schema, model } = mongoose;

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      min: 3,
      max: 20,
    },
    email: {
      address: {
        type: String,
        required: true,
        unique: true,
      },
      verified: { type: Boolean, default: false },
      verificationToken: String,
      verificationTokenExpiresAt: Date,
    },
    password: {
      value: {
        type: String,
        required: true
      },
    },
    disabled: { 
      type: Boolean, default: false 
    },
    role: {
      type: String,
      enum: ["admin", "user", "moderator"],
      default: "user",
    },
  },
  { timestamps: true }
);


const tagSchema = Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    maxLength: [30, 'Tag name is too long'] 
  },
}, { timestamps: true });

const categorySchema = Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    maxLength: [32, 'Category name is too long'] 
  },
}, { timestamps: true });


const portalSchema = Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  background:{
    type: String,
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

  export const Portal =
  mongoose.models.Portal || mongoose.model("Portal", portalSchema);
  export const Category =
  mongoose.models.Category || mongoose.model("Category", categorySchema);
  export const Tag =
  mongoose.models.Tag || mongoose.model("Tag", tagSchema);
