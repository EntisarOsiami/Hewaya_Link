import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const TagSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    maxLength: [30, 'Tag name is too long'] 
  },
}, { timestamps: true });

export default model('Tag', TagSchema);
