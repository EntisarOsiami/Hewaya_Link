import asyncHandler from 'express-async-handler';
import Portal from '../models/Portal.js';
import ImageGallery from '../models/Gallery.js';

export const createPortal = asyncHandler(async (req, res) => {
    const { name, description, category } = req.body;

    const existingPortal = await Portal.findOne({ name });
    if (existingPortal) {
        return res.status(400).json({ message: "Portal with this name already exists" });
    }

    const portal = new Portal({
        name,
        description,
        category,
    });

    await portal.save();
    res.status(201).json(portal);
});

export const getPortalDetails = asyncHandler(async (req, res) => {
    const portalId = req.params.portalId;

    const portal = await Portal.findById(portalId).populate('images subscribers');
    if (!portal) {
        return res.status(404).json({ message: 'Portal not found' });
    }

    res.json({ data: portal });
});

export const getPortalFeed = asyncHandler(async (req, res) => {
    const portalId = req.params.portalId;

    const portal = await Portal.findById(portalId).populate('images');
    if (!portal) {
        return res.status(404).json({ message: 'Portal not found' });
    }

    res.json({ data: portal.images });
});

export const getUserSubscribedFeed = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const sortBy = req.query.sortBy || 'createdAt';
    const order = req.query.order === 'desc' ? -1 : 1;  
    const category = req.query.category || null;
    const limit = Number(req.query.limit) || 10;
    const skip = (Number(req.query.page) - 1) * limit || 0;

    const filterCriteria = category ? { subscribers: userId, category } : { subscribers: userId };
    
    const userSubscribedPortals = await Portal.find(filterCriteria).populate({
        path: 'images',
        options: {
            sort: { [sortBy]: order },
            limit,
            skip
        }
    });

    let feedImages = [];

    userSubscribedPortals.forEach(portal => {
        feedImages.push(...portal.images);
    });

    feedImages.sort((a, b) => {
        if(order === 1) return new Date(a[sortBy]) - new Date(b[sortBy]);
        else return new Date(b[sortBy]) - new Date(a[sortBy]);
    });

    res.json({ data: feedImages });
});

export const updatePortalDetails = asyncHandler(async (req, res) => {
    const portalId = req.params.portalId;
    const updates = req.body;

    const portal = await Portal.findById(portalId);
    if (!portal) {
        return res.status(404).json({ message: 'Portal not found' });
    }

    Object.keys(updates).forEach(update => portal[update] = updates[update]);
    await portal.save();

    res.json({ message: 'Portal updated successfully', data: portal });
});

export const subscribeToPortal = asyncHandler(async (req, res) => {
    const portalId = req.params.portalId;
    const userId = req.user._id;

    const portal = await Portal.findById(portalId);
    if (!portal) {
        return res.status(404).json({ message: 'Portal not found' });
    }

    if (!portal.subscribers.includes(userId)) {
        portal.subscribers.push(userId);
        await portal.save();
    }

    res.json({ message: 'Subscribed successfully' });
});

export const unsubscribeFromPortal = asyncHandler(async (req, res) => {
    const portalId = req.params.portalId;
    const userId = req.user._id;

    const portal = await Portal.findById(portalId);
    if (!portal) {
        return res.status(404).json({ message: 'Portal not found' });
    }

    portal.subscribers = portal.subscribers.filter(subscriber => subscriber.toString() !== userId.toString());
    await portal.save();

    res.json({ message: 'Unsubscribed successfully' });
});

export const addImageToPortal = asyncHandler(async (req, res) => {
    const portalId = req.params.portalId;
    const imageId = req.body.imageId;

    const image = await ImageGallery.findById(imageId);
    if (!image || image.user.toString() !== req.user._id.toString()) {
        return res.status(400).json({ message: "Image not found or you don't have permission" });
    }

    const portal = await Portal.findById(portalId);
    if (!portal) {
        return res.status(404).json({ message: 'Portal not found' });
    }

    if (!portal.images.includes(imageId)) {
        portal.images.push(imageId);
        await portal.save();
    }

    res.json({ message: 'Image added to portal successfully' });
});

export const deletePortal = asyncHandler(async (req, res) => {
    const portalId = req.params.portalId;

    const portal = await Portal.findById(portalId);
    if (!portal) {
        return res.status(404).json({ message: 'Portal not found' });
    }

    await portal.remove();

    res.json({ message: 'Portal deleted successfully' });
});
