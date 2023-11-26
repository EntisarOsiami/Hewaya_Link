import { Comment } from '../models/index.js';
import sendResponse from "../Utils/sendResponse.js";
import { Blog, Gallery, Portal } from '../models/index.js';


const validModels = {
  Blog,
  Gallery,
  Portal,
};

//@ desc Create a comment
//@route POST /api/comments
//@access Private
const createComment = async (req, res) => {
  try {
    const { text, author, itemId, onModel } = req.body;

    if (!validModels[onModel]) {
      return sendResponse(res, null, "Invalid item type.", false);
    }


    const item = await validModels[onModel].findById(itemId);
    if (!item) {
      return sendResponse(res, null, "Item not found.", false);
    }

    // Create a new comment
    const comment = new Comment({
      text,
      author,
      item: itemId,
      onModel
    });

    // Save the comment
    await comment.save();

    await comment.populate('author', 'username');

    sendResponse(res, comment, "Comment created successfully.");
  } catch (error) {
    console.error(error);
    sendResponse(res, null, error.message || "Server error.", false);
  }
  
};

//@ desc Get comments by item id
//@route GET /api/comments/:itemId/:onModel
//@access Public
const getCommentsByItemId = async (req, res) => {
  const { itemId, onModel } = req.params;

  // Validate the model type
  if (!validModels[onModel]) {
    return sendResponse(res, null, "Invalid item type.", false);
  }

  // Retrieve the comments for the item
  try {
    const comments = await Comment.find({
      item: itemId,
      onModel
    }).populate('author', 'username');

    sendResponse(res, comments, "Comments retrieved successfully.");
  } catch (error) {
    console.error(error);
    sendResponse(res, null, "Server error.", false);
  }
};

//@ desc Delete a comment
//@route DELETE /api/comments/:commentId
//@access Private
const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;

    // Delete the comment
    const comment = await Comment.findByIdAndDelete(commentId);
    if (!comment) {
      return sendResponse(res, null, "Comment not found.", false);
    }

    sendResponse(res, null, "Comment deleted successfully.");
  } catch (error) {
    console.error(error);
    sendResponse(res, null, "Server error.", false);
  }
};

export {
  createComment,
  getCommentsByItemId,
  deleteComment,
};
