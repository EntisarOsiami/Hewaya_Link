import mongoose from 'mongoose';
import {Tag, Category} from './backend/models/index.js';

import connectDB from './backend/config/db.js';
import dotenv from 'dotenv';

dotenv.config({ path: './backend/.env' });


const categories = [
  { name: "Photography" },
  { name: "Painting" },
  { name: "Sculpture" },
  { name: "Digital Art" },
  { name: "Drawing" }
];

const tags = [
  { name: "Nature" },
  { name: "Abstract" },
  { name: "Portrait" },
  { name: "Modern" },
  { name: "Landscape" }
];


const seedDatabase = async () => {
    connectDB();

  try {
    await Category.deleteMany({});
    await Tag.deleteMany({});

    await Category.insertMany(categories);
    console.log('Categories seeded successfully.');

    await Tag.insertMany(tags);
    console.log('Tags seeded successfully.');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    mongoose.connection.close();
  }
};

seedDatabase();
