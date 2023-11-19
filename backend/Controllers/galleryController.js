import Gallery from "../models/Gallery.js";
import { cloudinary } from "../config/cloudinaryConfig.js";
import sendResponse from "../Utils/sendResponse.js";
import { sanitize } from "../Utils/sanitizer.js";
import Portal from "../models/Portal.js";

export const uploadToCloudinary = async (req, res) => {
    try {
        const { imageName, description, visibility } = req.body; 

        if (!req.file) {
            return sendResponse(res, null, "No image provided", 400);
        }

        if (!imageName) {
            return sendResponse(res, null, "Image name is required", 400);
        }

        const sanitizedImageName = sanitize(imageName);
        const sanitizedDescription = sanitize(description);
        const sanitizedVisibility = visibility === "public" ? "public" : "private"; 

        if (!req.user || !req.user._id) {
            return sendResponse(res, null, "User not found", 400);
        }
        const userFolder = `gallery/${req.user._id}/`;
        const publicId = `${userFolder}${sanitizedImageName}`;

        const uploader = cloudinary.uploader.upload_stream(
            { resource_type: "image", public_id: publicId },
            (error, result) => {
                if (error) {
                    console.error(error);
                    return sendResponse(res, null, "Error uploading image to Cloudinary", 500);
                }

                const newImage = new Gallery({
                    user: req.user._id,
                    imageName: sanitizedImageName,
                    imageUrl: result.secure_url,
                    cloudinaryId: result.public_id,
                    description: sanitizedDescription,
                    visibility: sanitizedVisibility, 
                });

                newImage.save()
                    .then(savedImage => sendResponse(res, savedImage, "Image uploaded successfully"))
                    .catch(saveError => {
                        console.error(saveError);
                        sendResponse(res, null, "Error saving image data", 500);
                    });
            }
        );

        uploader.end(req.file.buffer);
    } catch (error) {
        console.error(error);
        sendResponse(res, null, "Internal server error", 500);
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

    sendResponse(
      res,
      {
        images,
        currentPage: page,
        totalPages: Math.ceil(total / pageSize),
        totalImages: total,
        pageSize: pageSize,
      },
      "Fetched images successfully"
    );
  } catch (error) {
    console.error(error);
    sendResponse(res, null, "Internal server error", 500);
  }
};

export const deleteFromCloudinary = async (req, res) => {
  const id = req.params.id;

  try {
    const image = await Gallery.findById(id);
    if (!image) {
      return sendResponse(res, null, "Image not found", 404);
    }

    await cloudinary.uploader.destroy(image.cloudinaryId);

    await Gallery.findByIdAndDelete(id);

    sendResponse(res, null, "Image deleted successfully");
  } catch (error) {
    console.error(error);
    sendResponse(res, null, "Internal server error", 500);
  }
};


export const toggleFavorite = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  try {
    const image = await Gallery.findOne({ _id: id, user: userId });
    if (!image) {
      return sendResponse(res, null, "Image not found", 404);
    }

    image.isFavorite = !image.isFavorite;

    const updatedImage = await image.save();
    sendResponse(res, updatedImage, "Favorite state updated successfully");
  } catch (error) {
    console.error(error);
    sendResponse(res, null, "Internal server error", 500);
  }
};


export const togglePublished = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  try {
    const image = await Gallery.findOne({ _id: id, user: userId });
    if (!image) {
      return sendResponse(res, null, "Image not found", 404);
    }

    image.published = !image.published;

    const updatedImage = await image.save();

    if (image.published) {
      const portal = await Portal.findOne({ categories: { $in: image.category } });
      if (portal) {
        portal.Images.push(image._id);
        if (!portal.subscribers.includes(userId)) {
          portal.subscribers.push(userId);
        }
        await portal.save();
      }
    }

    sendResponse(res, updatedImage, "Published state updated successfully");
  } catch (error) {
    console.error(error);
    sendResponse(res, null, "Internal server error", 500);
  }
};