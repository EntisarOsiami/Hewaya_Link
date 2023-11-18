import mongoose from 'mongoose';
import { Rating } from '../models/index.js';
import { Blog, Gallery, Portal } from '../models/index.js';
import sendResponse from "../Utils/sendResponse.js";


// ----------------------------------------//

const validModels = {
  Blog,
  Gallery,
  Portal,
};
//@ desc Create or update a rating
//@route POST /api/ratings
//@access Private
const createRating = async (req, res) => {
  try {
    const { value, author, itemId, onModel } = req.body;

    if (!validModels[onModel]) {
      return sendResponse(res, null, "Invalid item type.", false);
    }

    const item = await validModels[onModel].findById(itemId);
    if (!item) {
      return sendResponse(res, null, "Item not found.", false);
    }

    // Check if the user has already rated the item
    let rating = await Rating.findOne({
      author,
      item: itemId,
      onModel
    });

    // If the user has already rated the item, update the existing rating
    if (rating) {
      rating.value = value;
      await rating.save();
      return sendResponse(res, rating, "Rating updated successfully.");
    }

    // If not, create a new rating
    const newRating = new Rating({
      value,
      author,
      item: itemId,
      onModel
    });

    await newRating.save();
    sendResponse(res, newRating, "Rating added successfully.");
  } catch (error) {
    // If there's a unique index error, handle it appropriately
    if (error.code === 11000) {
      return sendResponse(res, null, "You have already rated this item.", false);
    }
    console.error(error);
    sendResponse(res, null, "Server error.", false);
  }
};


//@ desc Get average rating by item id
//@route GET /api/ratings/:itemId/:onModel
//@access Public

const getAverageRatingByItemId = async (req, res) => {
  const { itemId, onModel } = req.params;

  // Check if the onModel item type is valid
  if (!validModels[onModel]) {
    return sendResponse(res, null, "Invalid item type :L.", false);

  }

  // Aggregate the ratings collection to get the average rating and the number of ratings for the item
  try {
    const average = await Rating.aggregate([
      {
        $match: {
          item: new mongoose.Types.ObjectId(itemId),
          onModel
        }
      },
      {
        $group: {
          _id: '$item',
          averageRating: { $avg: '$value' },
          ratingCount: { $sum: 1 }
        }
      }
    ]);
    // If there is no rating for the item, return 0 as the average rating and 0 as the number of ratings
    const result = average.length > 0 ? average[0] : { averageRating: 0, ratingCount: 0 };

    sendResponse(res, result, "Average rating retrieved successfully.");
  } catch (error) {
    console.error(error);
    sendResponse(res, null, "Server error.", false);
  }
};

//@ desc Delete a rating
//@route DELETE /api/ratings/:ratingId/:onModel
//@access Private

const deleteRating = async (req, res) => {
  try {
    const { ratingId, onModel } = req.params;

    if (!validModels[onModel]) {
      return sendResponse(res, null, "Invalid item type.", false);
    }

    const rating = await Rating.findByIdAndDelete(ratingId);
    if (!rating) {
      return sendResponse(res, null, "Rating not found.", false);
    }

    sendResponse(res, null, "Rating deleted successfully.");
  } catch (error) {
    console.error(error);
    sendResponse(res, null, "Server error.", false);
  }
};

export {
  createRating,
  getAverageRatingByItemId,
  deleteRating,
};
