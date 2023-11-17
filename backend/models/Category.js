import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    maxLength: [32, 'Category name is too long'] 
  },
}, { timestamps: true });

export default model('Category', CategorySchema);
