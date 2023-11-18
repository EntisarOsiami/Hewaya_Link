import mongoose from 'mongoose';
import {Portal} from './backend/models/index.js';
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
  }
];

const seedPortals = async () => {
  try {
    await Portal.deleteMany({});

    await Portal.insertMany(portalsData);
    console.log('Portals seeded successfully.');
  } catch (error) {
    console.error('Error seeding portals:', error);
  } finally {
    mongoose.connection.close();
  }
};

seedPortals();
