import mongoose from 'mongoose';
import {Blog,User,Comment,Rating} from './backend/models/index.js';
import connectDB from './backend/config/db.js';
import dotenv from 'dotenv';

dotenv.config({ path: './backend/.env' });

const seedData = async () => {
    await connectDB();

    try {
        // Clear existing data
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
        console.log('Users seeded.');

        // Seed blogs
        const dummyBlogs = createdUsers.map((user, index) => ({
            title: `Blog Post ${index + 1}`,
            content: `This is blog post content number ${index + 1}`,
            author: user._id,
            tags: [`Tag${index + 1}`, `Blog${index + 1}`],
        }));
        const createdBlogs = await Blog.insertMany(dummyBlogs);
        console.log('Blogs seeded.');

        // Seed comments for blogs
        const dummyComments = createdBlogs.flatMap(blog =>
            createdUsers.map(user => ({
                text: `This is a comment by ${user.username} on blog post ${blog.title}`,
                author: user._id,
                item: blog._id,
                onModel: 'Blog',
            }))
        );
        await Comment.insertMany(dummyComments);
        console.log('Comments seeded.');

        // Seed ratings for blogs
        const dummyRatings = createdBlogs.flatMap(blog =>
            createdUsers.map(user => ({
                value: Math.floor(Math.random() * 5) + 1,
                author: user._id,
                item: blog._id,
                onModel: 'Blog',
            }))
        );
        await Rating.insertMany(dummyRatings);
        console.log('Ratings seeded.');

        console.log('Data seeded successfully!');
    } catch (error) {
        console.error('Error seeding data:', error);
    } finally {
        mongoose.connection.close();
        console.log('Database connection closed.');
    }
};

// Initiate seeding
seedData();
