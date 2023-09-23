import express  from "express";
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import roleRoutes from './routes/roleRoutes.js';
import blogRoutes from "./routes/blogRoutes.js";
import commentRoutes from './routes/commentRoutes.js';
import ratingRoutes from './routes/ratingRoutes.js'
import imageGalleryRoutes from './routes/imageGalleryRoutes.js'
import { notFound,errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";


dotenv.config();

const app = express ();
const port = process.env.PORT || 5000;
connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
app.use('/api/user', userRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/ratings', ratingRoutes);
app.use('/api/gallery',imageGalleryRoutes);  
app.use(notFound);
app.use(errorHandler);

app.get('/',(req,res)=> res.send('Server is ready'));

app.listen(port,() => console.log(`Server started on port ${port}`));

