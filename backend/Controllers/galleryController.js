import ImageGallery from '../models/Gallery.js';
import {cloudinary} from '../config/cloudinaryConfig.js';
import sendResponse from '../Utils/responseHandler.js';
import multer from 'multer';
import { sanitize } from '../Utils/sanitizer.js';

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Not an image! Please upload only images.'), false);
    }
};

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 1024 * 1024 * 5 
    },
    fileFilter: fileFilter
}).single('image');

export const uploadToCloudinary = async (req, res) => {
    upload(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
            return sendResponse(res, null, err.message, 400);
        } else if (err) {
            return sendResponse(res, null, err.message, 500);
        }

        try {
            const { imageName, description } = req.body; // Removed userId from here since we're getting it from req.user

            if (!req.file) {
                return sendResponse(res, null, 'No image provided', 400);
            }

            if (!imageName) {
                return sendResponse(res, null, 'Image name is required', 400);
            }

            const sanitizedImageName = sanitize(imageName);
            const sanitizedDescription = sanitize(description);

            // Verify req.user and req.user._id are present
            if (!req.user || !req.user._id) {
                return sendResponse(res, null, 'User not found', 400);
            }
            const userFolder = `gallery/${req.user._id}/`; 
            const publicId = `${userFolder}${sanitizedImageName}`;

            const uploader = cloudinary.uploader.upload_stream(
                { resource_type: 'image', public_id: publicId },
                (error, result) => {
                    if (error) {
                        console.error(error);
                        sendResponse(res, null, 'Error uploading image', 500);
                        return;
                    }
                    const newImage = new ImageGallery({
                        user: req.user._id,
                        imageName: sanitizedImageName,
                        imageUrl: result.secure_url,
                        cloudinaryId: result.public_id,
                        description: sanitizedDescription,
                    });

                    newImage.save()
                        .then(savedImage => sendResponse(res, savedImage, 'Image uploaded successfully'))
                        .catch(saveError => {
                            console.error(saveError);
                            sendResponse(res, null, 'Error saving image', 500);
                        });
                }
            );

            uploader.end(req.file.buffer);
        } catch (error) {
            console.error(error);
            sendResponse(res, null, 'Internal server error', 500);
        }
    });
};


export const getAllImages = async (req, res) => {
    const userId = req.user._id; 

    const DEFAULT_PAGE = 1;
    const DEFAULT_PAGE_SIZE = 10;

    const page = parseInt(req.query.page, 10) || DEFAULT_PAGE;
    const pageSize = parseInt(req.query.pageSize, 10) || DEFAULT_PAGE_SIZE;

    const skip = (page - 1) * pageSize;

    try {
        const images = await ImageGallery.find({ user: userId }) 
            .skip(skip)
            .limit(pageSize)
            .exec();

        const total = await ImageGallery.countDocuments({ user: userId });

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
    const image = await ImageGallery.findById(id);
    
    if (!image) {
        return sendResponse(res, null, 'Image not found', 404);
    }

    try {
        await cloudinary.uploader.destroy(image.cloudinaryId); 
        await ImageGallery.findByIdAndRemove(id);
        
        sendResponse(res, null, 'Image deleted successfully');
    } catch (error) {
        console.error(error);
        sendResponse(res, null, 'Internal server error', 500);
    }
}
