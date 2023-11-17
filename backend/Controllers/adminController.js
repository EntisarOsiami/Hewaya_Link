import {User,Portal} from "../models/index.js";
import sendResponse from "../Utils/responseHandler.js";

export const disableUser = async (req, res) => {
    try {
        const user = await User.findById(req.params._id);
        if (!user) {
            return sendResponse(res, 404, "User not found");
        }
        user.disabled = true;
        await user.save();
        return sendResponse(res, 200, "User disabled successfully");
    } catch (error) {
        return sendResponse(res, 500, "Internal server error");
    }
};

// enable users
export const enableUser = async (req, res) => {
    try {
        const user = await User.findById(req.params._id);
        if (!user) {
            return sendResponse(res, 404, "User not found");
        }
        user.disabled = false;
        await user.save();
        return sendResponse(res, 200, "User enabled successfully");
    } catch (error) {
        return sendResponse(res, 500, "Internal server error");
    }
};

// write a function to get all users
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        return sendResponse(res, 200, "Users fetched successfully", users);
    } catch (error) {
        return sendResponse(res, 500, "Internal server error");
    }
};

// write a function to get all portals

export const getAllPortals = async (req, res) => {
    try {
        const portals = await Portal.find();
        if(portals.length === 0){
            return sendResponse(res, 404, "No portals found");
        }
        return sendResponse(res, 200, "Portals fetched successfully", portals);
    } catch (error) {
        return sendResponse(res, 500, "Internal server error");
    }
};

// write a function to edit portal
export const editPortal = async (req, res) => {
    try {
        const portal = await Portal.findById(req.params._id);
        if (!portal) {
            return sendResponse(res, 404, "Portal not found");
        }
        portal.name = req.body.name;
        portal.description = req.body.description;
        portal.category = req.body.category;
        await portal.save();
        return sendResponse(res, 200, "Portal updated successfully", portal);
    } catch (error) {
        return sendResponse(res, 500, "Internal server error");
    }
};

// write a function to delete portal
export const deletePortal = async (req, res) => {
    try {
        const portal = await Portal.findById(req.params._id);
        if (!portal) {
            return sendResponse(res, 404, "Portal not found");
        }
        await portal.remove();
        return sendResponse(res, 200, "Portal deleted successfully");
    } catch (error) {
        return sendResponse(res, 500, "Internal server error");
    }
};

// write a function to create portal
export const createPortal = async (req, res) => {
    try {
        const portal = await Portal.create(req.body);
        return sendResponse(res, 200, "Portal created successfully", portal);
    } catch (error) {
        return sendResponse(res, 500, "Internal server error");
    }
};


// write a function to get all categories
export const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        return sendResponse(res, 200, "Categories fetched successfully", categories);
    } catch (error) {
        return sendResponse(res, 500, "Internal server error");
    }
};

// write a function to edit category
export const editCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params._id);
        if (!category) {
            return sendResponse(res, 404, "Category not found");
        }
        category.name = req.body.name;
        await category.save();
        return sendResponse(res, 200, "Category updated successfully", category);
    } catch (error) {
        return sendResponse(res, 500, "Internal server error");
    }
};

// write a function to delete category
export const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params._id);
        if (!category) {
            return sendResponse(res, 404, "Category not found");
        }
        await category.remove();
        return sendResponse(res, 200, "Category deleted successfully");
    } catch (error) {
        return sendResponse(res, 500, "Internal server error");
    }
};

// write a function to create category
export const createCategory = async (req, res) => {
    try {
        const category = await Category.create(req.body);
        return sendResponse(res, 200, "Category created successfully", category);
    } catch (error) {
        return sendResponse(res, 500, "Internal server error");
    }
};

// write a function to get all tags
export const getAllTags = async (req, res) => {
    try {
        const tags = await Tag.find();
        return sendResponse(res, 200, "Tags fetched successfully", tags);
    } catch (error) {
        return sendResponse(res, 500, "Internal server error");
    }
};

// write a function to edit tag
export const editTag = async (req, res) => {
    try {
        const tag = await Tag.findById(req.params._id);
        if (!tag) {
            return sendResponse(res, 404, "Tag not found");
        }
        tag.name = req.body.name;
        await tag.save();
        return sendResponse(res, 200, "Tag updated successfully", tag);
    } catch (error) {
        return sendResponse(res, 500, "Internal server error");
    }
};

// write a function to delete tag
export const deleteTag = async (req, res) => {
    try {
        const tag = await Tag.findById(req.params._id);
        if (!tag) {
            return sendResponse(res, 404, "Tag not found");
        }
        await tag.remove();
        return sendResponse(res, 200, "Tag deleted successfully");
    } catch (error) {
        return sendResponse(res, 500, "Internal server error");
    }
};

// write a function to create tag
export const createTag = async (req, res) => {
    try {
        const tag = await Tag.create(req.body);
        return sendResponse(res, 200, "Tag created successfully", tag);
    } catch (error) {
        return sendResponse(res, 500, "Internal server error");
    }
};

// write a function to get one category
export const getOneCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params._id);
        if (!category) {
            return sendResponse(res, 404, "Category not found");
        }
        return sendResponse(res, 200, "Category fetched successfully", category);
    } catch (error) {
        return sendResponse(res, 500, "Internal server error");
    }
};
// write a function to get one tag
export const getOneTag = async (req, res) => {
    try {
        const tag = await Tag.findById(req.params._id);
        if (!tag) {
            return sendResponse(res, 404, "Tag not found");
        }
        return sendResponse(res, 200, "Tag fetched successfully", tag);
    } catch (error) {
        return sendResponse(res, 500, "Internal server error");
    }
};
// write a function to get one portal

export const getOnePortal = async (req, res) => {
    try {
        const portal = await Portal.findById(req.params._id);
        if (!portal) {
            return sendResponse(res, 404, "Portal not found");
        }
        return sendResponse(res, 200, "Portal fetched successfully", portal);
    } catch (error) {
        return sendResponse(res, 500, "Internal server error");
    }
};
// write a function to get one user
export const getOneUser = async (req, res) => {
    try {
        const user = await User.findById(req.params._id);
        if (!user) {
            return sendResponse(res, 404, "User not found");
        }
        return sendResponse(res, 200, "User fetched successfully", user);
    } catch (error) {
        return sendResponse(res, 500, "Internal server error");
    }
};