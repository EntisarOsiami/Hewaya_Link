import Gallery from '../models/Gallery.js';
import {cloudinary} from '../config/cloudinaryConfig.js';
import sendResponse from '../Utils/responseHandler.js';
import { sanitize } from '../Utils/sanitizer.js';


export const uploadToCloudinary = async (req, res) => {
    try {
        const { imageName, description, isPublic } = req.body;

        if (!req.file) return sendResponse(res, null, 'No image provided', 400);
        if (!imageName) return sendResponse(res, null, 'Image name is required', 400);
        if (!req.user || !req.user._id) return sendResponse(res, null, 'User not found', 400);

        const sanitizedImageName = sanitize(imageName);
        const sanitizedDescription = sanitize(description);
        const visibility = isPublic === 'true' || isPublic === true ? 'public' : 'private';
        const publicId = `gallery/${req.user._id}/${sanitizedImageName}`;

        const result = await cloudinary.uploader.upload_stream_async(
            { resource_type: 'image', public_id: publicId },
            req.file.buffer
        );

        const newImage = new Gallery({
            user: req.user._id,
            imageName: sanitizedImageName,
            imageUrl: result.secure_url,
            cloudinaryId: result.public_id,
            description: sanitizedDescription,
            visibility: visibility
        });

        const savedImage = await newImage.save();
        sendResponse(res, savedImage, 'Image uploaded successfully');

    } catch (error) {
        console.error(error);
        sendResponse(res, null, 'Internal server error', 500);
    }
};


export const getAllImages = async (req, res) => {
    const userId = req.user._id; 

    const DEFAULT_PAGE = 1;
    const DEFAULT_PAGE_SIZE = 10;

    const page = parseInt(req.query.page, 10) || DEFAULT_PAGE;
    const pageSize = parseInt(req.query.pageSize, 10) || DEFAULT_PAGE_SIZE;

    const skip = (page - 1) * pageSize;

    try {
        const images = await Gallery.find({ user: userId }) 
            .skip(skip)
            .limit(pageSize)
            .exec();

        const total = await Gallery.countDocuments({ user: userId });

        sendResponse(res, {
            images,
            currentPage: page,
            totalPages: Math.ceil(total / pageSize),
            totalImages: total,
            pageSize: pageSize
        }, 'Fetched images successfully');
    } catch (error) {
        console.error(error);
        sendResponse(res, null, 'Internal server error', 500);
    }
};



export const deleteFromCloudinary = async (req, res) => {
    const id = req.params.id;

    try {
        const image = await Gallery.findById(id);
        if (!image) {
            return sendResponse(res, null, 'Image not found', 404);
        }

        await cloudinary.uploader.destroy(image.cloudinaryId);

        await Gallery.findByIdAndDelete(id);

        sendResponse(res, null, 'Image deleted successfully');
    } catch (error) {
        console.error(error);
        sendResponse(res, null, 'Internal server error', 500);
    }
};

