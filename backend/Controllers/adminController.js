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