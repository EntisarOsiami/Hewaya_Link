import dotenv from 'dotenv';
dotenv.config({ path: './backend/.env' });
import express  from "express";
import userRoutes from './routes/userRoutes.js';
import roleRoutes from './routes/roleRoutes.js';
import blogRoutes from "./routes/blogRoutes.js";
import CommentRoutes from './routes/CommentRoutes.js';
import RatingRoutes from './routes/RatingRoutes.js'
import imageGalleryRoutes from './routes/imageGalleryRoutes.js'
import { notFound,errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import  configureCloudinary  from './config/cloudinaryConfig.js';






const app = express ();
const port = process.env.PORT || 5000;
connectDB();
configureCloudinary(); 
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use('/api/users', userRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/comments', CommentRoutes);
app.use('/api/ratings', RatingRoutes);
app.use('/api/gallery',imageGalleryRoutes);  
app.use(notFound);
app.use(errorHandler);


app.get('/',(req,res)=> res.send('Server is ready'));

app.listen(port,() => console.log(`Server started on port ${port}`));

