import mongoose from 'mongoose';
import Blog from './backend/models/blogModels/blog.js';
import User from './backend/models/userModels.js';
import Comment from './backend/models/blogModels/blogComment.js';
import Rating from './backend/models/blogModels/blogRating.js';
import connectDB from './backend/config/db.js';
import dotenv from 'dotenv';
dotenv.config({ path: './backend/.env' });

const seedData = async () => {
    await connectDB();

    try {
        await Blog.deleteMany({});
await User.deleteMany({});
await Comment.deleteMany({});
await Rating.deleteMany({});
        console.log('Database cleared.');
        // Seed users
        const dummyUsers = [
            {
                name: { firstName: 'John', lastName: 'Doe' },
                username: 'johnDoe',
                email: { address: 'john.doe@example.com' },
                password: { value: 'JohnDoe123!' },
                birthDate: new Date(1990, 5, 15),
            },
            {
                name: { firstName: 'Jane', lastName: 'Smith' },
                username: 'janeSmith',
                email: { address: 'jane.smith@example.com' },
                password: { value: 'JaneSmith123!' },
                birthDate: new Date(1991, 3, 10),
            },
            {
                name: { firstName: 'Alice', lastName: 'Brown' },
                username: 'aliceBrown',
                email: { address: 'alice.brown@example.com' },
                password: { value: 'AliceBrown123!' },
                birthDate: new Date(1992, 7, 5),
            },
        ];

        const createdUsers = await User.insertMany(dummyUsers);

        // Seed blogs
        const dummyBlogs = [];
        createdUsers.forEach(user => {
            for (let i = 1; i <= 3; i++) {
                dummyBlogs.push({
                    title: `Blog ${i} by ${user.name.firstName}`,
                    content: `This is a sample blog content ${i} by ${user.username}.`,
                    author: user._id,
                    tags: ['Sample', 'Test'],
                });
            }
        });

        const createdBlogs = await Blog.insertMany(dummyBlogs);

        // Seed comments and ratings for blogs
        for (let blog of createdBlogs) {
            const dummyComments = createdUsers.map(user => ({
                text: `Comment by ${user.username} on ${blog.title}`,
                author: user._id,
                blog: blog._id,
            }));

            const dummyRatings = createdUsers.map(user => ({
                value: Math.floor(Math.random() * 5) + 1,
                author: user._id,
                blog: blog._id,
            }));

            await Comment.insertMany(dummyComments);
            await Rating.insertMany(dummyRatings);
        }

        console.log('Data seeded successfully!');

    } catch (error) {
        console.error('Error seeding data:', error);
    } finally {
        await mongoose.connection.close();
        console.log('Database connection closed.');
    }
};

// Initiate seeding
seedData();
