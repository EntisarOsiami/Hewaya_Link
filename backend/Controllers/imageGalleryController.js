import ImageGallery from '../models/imageGalleryModel/imageGallerySchema.js';
import cloudinary from '../config/cloudinaryConfig.js';

function sendResponse(res, data, message, statusCode = 200) {
    res.status(statusCode).json({
        success: statusCode < 400,
        data,
        message,
    });
}

export const uploadImageToCloudinary = async (req, res) => {
    try {
        const { user, imageName, description } = req.body;

        if (!req.file) {
            return sendResponse(res, null, 'No image provided', 400);
        }

        
        if (!imageName) {
            return sendResponse(res, null, 'Image name is required', 400);
        }

        const result = await cloudinary.uploader.upload(req.file.buffer.toString('base64'), {
            resource_type: 'image',
            public_id: `gallery/${imageName}`,
        });

        const newImage = new ImageGallery({
            user,
            imageName,
            imageUrl: result.secure_url,
            cloudinaryId: result.public_id, 
            description,
        });

        await newImage.save();

        sendResponse(res, newImage, 'Image uploaded successfully');
    } catch (error) {
        console.error(error);
        sendResponse(res, null, 'Internal server error', 500);
    }
};

export const getAllImages = async (req, res) => {
  const DEFAULT_PAGE = 1;
  const DEFAULT_PAGE_SIZE = 10;

  const page = parseInt(req.query.page, 10) || DEFAULT_PAGE;
  const pageSize = parseInt(req.query.pageSize, 10) || DEFAULT_PAGE_SIZE;

  const skip = (page - 1) * pageSize;

  try {
      const images = await ImageGallery.find()
          .skip(skip)
          .limit(pageSize)
          .exec();

      const total = await ImageGallery.countDocuments();

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

export const deleteImageFromCloudinary = async (req, res) => {
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
