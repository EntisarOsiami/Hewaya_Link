import { User, Portal } from "../models/index.js";
import sendResponse from "../Utils/sendResponse.js";
import { Tag, Category } from "../models/index.js";

export const disableUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return sendResponse(res, null, "User not found", false);
    }
    user.disabled = true;
    await user.save();
    return sendResponse(res, null, "User disabled successfully");
  } catch (error) {
    return sendResponse(res, null, "Internal server error");
  }
};

export const enableUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return sendResponse(res, null, "User not found", false);
    }
    user.disabled = false;
    await user.save();
    return sendResponse(res, null, "User enabled successfully");
  } catch (error) {
    return sendResponse(res, null, "Internal server error", false);
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    return sendResponse(res, users, "Users fetched successfully");
  } catch (error) {
    return sendResponse(res, null, "Internal server error", false);
  }
};

export const getAllPortals = async (req, res) => {
  try {
    const portals = await Portal.find();
    if (portals.length === 0) {
      return sendResponse(res, null, "Portal not found", false);
    }
    return sendResponse(res, portals, "Portals fetched successfully");
  } catch (error) {
    return sendResponse(res, null, "Internal server error", false);
  }
};

export const editPortal = async (req, res) => {
  try {
    const portal = await Portal.findById(req.params._id);
    if (!portal) {
      return sendResponse(res, null, "Portal not found", false);
    }

    portal.name = req.body.name || portal.name;
    portal.description = req.body.description || portal.description;
    portal.category = req.body.category || portal.category;

    await portal.save();

    return sendResponse(res, portal, "Portal updated successfully", true);
  } catch (error) {
    console.error("Error updating portal:", error);
    return sendResponse(res, null, "Internal server error", false);
  }
};

export const deletePortal = async (req, res) => {
  try {
    const portal = await Portal.findById(req.params.id);
    if (!portal) {
      return sendResponse(res, null, "Portal not found", false);
    }
    await Portal.deleteOne({ _id: req.params._id });
    return sendResponse(res, null, "Portal deleted successfully");
  } catch (error) {
    return sendResponse(res, null, "Internal server error");
  }
};

export const createPortal = async (req, res) => {
  try {
    const portal = await Portal.create(req.body);
    return sendResponse(res, portal, "Portal created successfully");
  } catch (error) {
    return sendResponse(res, null, "Internal server error");
  }
};

export async function getAllCategories(req, res) {
  try {
    const allCategories = await Category.find();
    sendResponse(res, allCategories, "Categories fetched successfully");
  } catch (error) {
    sendResponse(res, null, "Internal server error");
  }
}
export const editCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const updatedName = req.body.name;

    const category = await Category.findById(categoryId);
    if (!category) {
      return sendResponse(res, null, "Category not found", false);
    }

    category.name = updatedName;
    await category.save();

    return sendResponse(res, category, "Category updated successfully");
  } catch (error) {
    return sendResponse(res, null, "Internal server error");
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params._id);
    if (!category) {
      return sendResponse(res, null, "Category not found", false);
    }
    await Category.deleteOne({ _id: req.params._id });
    return sendResponse(res, null, "Category deleted successfully");
  } catch (error) {
    return sendResponse(res, null, "Internal server error");
  }
};

export const createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    return sendResponse(res, category, "Category created successfully");
  } catch (error) {
    return sendResponse(res, null, "Internal server error");
  }
};

export const getAllTags = async (req, res) => {
  try {
    const tags = await Tag.find();
    return sendResponse(res, tags, "Tags fetched successfully");
  } catch (error) {
    return sendResponse(res, null, "Internal server error");
  }
};

export const editTag = async (req, res) => {
  try {
    const tag = await Tag.findById(req.params._id);
    if (!tag) {
      return sendResponse(res, null, "Tag not found");
    }
    tag.name = req.body.name;
    await tag.save();
    return sendResponse(res, tag, "Tag updated successfully");
  } catch (error) {
    return sendResponse(res, null, "Internal server error");
  }
};

export const deleteTag = async (req, res) => {
  try {
    const tag = await Tag.findById(req.params._id);
    if (!tag) {
      return sendResponse(res, null, "Tag not found");
    }
    await Tag.deleteOne({ _id: req.params._id });
    return sendResponse(res, null, "Tag deleted successfully");
  } catch (error) {
    return sendResponse(res, null, "Internal server error");
  }
};

export const createTag = async (req, res) => {
  try {
    if (!req.body.name || req.body.name.trim() === "") {
      return sendResponse(res, null, "Tag name is required", false);
    }

    const tag = await Tag.create(req.body);
    return sendResponse(res, tag, "Tag created successfully", true);
  } catch (error) {
    if (error.code === 11000) {
      return sendResponse(res, null, "Tag name already exists", false);
    }

    console.error("Error creating tag:", error);
    return sendResponse(res, null, "Internal server error", false);
  }
};

export const getOneCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params._id);
    if (!category) {
      return sendResponse(res, null, "Category not found");
    }
    return sendResponse(res, category, "Category fetched successfully");
  } catch (error) {
    return sendResponse(res, null, "Internal server error");
  }
};
export const getOneTag = async (req, res) => {
  try {
    const tag = await Tag.findById(req.params._id);
    if (!tag) {
      return sendResponse(res, null, "Tag not found");
    }
    return sendResponse(res, tag, "Tag fetched successfully");
  } catch (error) {
    return sendResponse(res, null, "Internal server error");
  }
};

export const getOnePortal = async (req, res) => {
  try {
    const portal = await Portal.findById(req.params._id);
    if (!portal) {
      return sendResponse(res, null, "Portal not found");
    }
    return sendResponse(res, portal, "Portal fetched successfully");
  } catch (error) {
    return sendResponse(res, null, "Internal server error");
  }
};
export const getOneUser = async (req, res) => {
  try {
    const user = await User.findById(req.params._id);
    if (!user) {
      return sendResponse(res, null, "User not found");
    }
    return sendResponse(res, user, "User fetched successfully");
  } catch (error) {
    return sendResponse(res, null, "Internal server error");
  }
};
