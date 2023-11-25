import mongoose from 'mongoose';
import { Category, Tag } from './backend/models/index.js';
import connectDB from './backend/config/db.js';
import dotenv from 'dotenv';

dotenv.config({ path: './backend/.env' });
const categories = [
  { name: "Photography" },
  { name: "Painting" },
  { name: "Sculpture" },
  { name: "Digital Art" },
  { name: "Drawing" },
  { name: "Music" },
  { name: "Literature" },
  { name: "Calligraphy" },
  { name: "Graphic Design" },
  { name: "Ceramics" }
];

const tags = [
  { name: "Nature" },
  { name: "Abstract" },
  { name: "Portrait" },
  { name: "Modern" },
  { name: "Landscape" },
  { name: "Cityscape" },
  { name: "Wildlife" },
  { name: "Street Art" },
  { name: "Vintage" },
  { name: "Minimalism" }
];
const insertIfNotExist = async (Model, items) => {
  const newItems = [];
  for (const item of items) {
    const exists = await Model.findOne(item);
    if (!exists) {
      newItems.push(item);
    }
  }
  if (newItems.length > 0) {
    await Model.insertMany(newItems);
  }
  return newItems.length;
};

const seedDatabase = async () => {
  connectDB();

  try {
    const newCategoriesCount = await insertIfNotExist(Category, categories);
    console.log(`${newCategoriesCount} new categories seeded successfully.`);

    const newTagsCount = await insertIfNotExist(Tag, tags);
    console.log(`${newTagsCount} new tags seeded successfully.`);
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    mongoose.connection.close();
  }
};

seedDatabase();
