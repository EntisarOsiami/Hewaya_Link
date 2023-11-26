import mongoose from 'mongoose';
import {Portal} from './backend/models/index.js';
import {Tag, Category} from './backend/models/index.js';

import connectDB from './backend/config/db.js';
import dotenv from 'dotenv';

dotenv.config({ path: './backend/.env' });
connectDB();

const portalsData = [
  {
    name: "Artistic Minds",
    description: "A portal for creative artists and art enthusiasts.",
    categories: [], 
    tags: [],
  },
  {
    name: "Photography Lovers",
    description: "A hub for photographers to share and discuss their work.",
    categories: [], 
    tags: [], 
  },
  {
    name: "Digital Creations",
    description: "Explore the world of digital art and design.",
    categories: [], 
    tags: [], 
  },
  {
    name: "Gardening Guild",
    description: "Cultivate your garden of knowledge and share your green thumb tips.",
    categories: [], 
    tags: [],
  },
  {
    name: "Knitting Circle",
    description: "Stitch together tales and patterns with fellow knitting enthusiasts.",
    categories: [], 
    tags: [],
  },
  {
    name: "Crafting Corner",
    description: "Your space to share DIY projects and crafting ideas.",
    background:"",
    categories: [], 
    tags: [],
  },
  {
    name: "Literary League",
    description: "A haven for wordsmiths to craft and converse in the art of writing.",
    categories: [], 
    tags: [],
  },
  {
    name: "Culinary Creations",
    description: "Flavorful journeys and cooking conquests for the culinary curious.",
    categories: [], 
    tags: [],
  },
  {
    name: "Outdoor Odyssey",
    description: "Embark on adventures in nature and outdoor activities.",
    categories: [], 
    tags: [],
  },
  {
    name: "Fashion and Beauty Forum",
    description: "A stylish space for fashion aficionados and beauty buffs.",
    categories: [], 
    tags: [],
  },
  {
    name: "Traveler's Trail",
    description: "Discover new horizons and share your travel tales.",
    categories: [], 
    tags: [],
  }
];

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

const seedCategoriesAndTags = async () => {
  const insertedCategories = await Category.insertMany(categories);
  const insertedTags = await Tag.insertMany(tags);

  return {
    categoryIds: insertedCategories.map(cat => cat._id),
    tagIds: insertedTags.map(tag => tag._id),
  };
};

// Modify the seedPortals function to use the category and tag IDs
const seedPortals = async () => {
  try {
    await Portal.deleteMany({});
    await Category.deleteMany({});
    await Tag.deleteMany({});

    const { categoryIds, tagIds } = await seedCategoriesAndTags();

    // Assuming you want to randomly assign categories and tags to each portal
    const updatedPortalsData = portalsData.map(portal => ({
      ...portal,
      categories: [categoryIds[Math.floor(Math.random() * categoryIds.length)]],
      tags: [tagIds[Math.floor(Math.random() * tagIds.length)]],
    }));

    await Portal.insertMany(updatedPortalsData);
    console.log('Portals seeded successfully.');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    mongoose.connection.close();
  }
};

seedPortals();


