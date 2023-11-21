import Portal from '../models/Portal.js';
import sendResponse from '../Utils/sendResponse.js';

const PortalController = {

  async getAllPortals(req, res) {
    try {
      const portals = await Portal.find({}).populate('Images');
      sendResponse(res, portals, 'Portals retrieved successfully');
      
    } catch (error) {
      console.error('Error fetching portals:', error);
      sendResponse(res, null, 'Failed to fetch portals', false);
    }
  },

  async addPortal(req, res) {
    try {
      const { name, description, categories, tags } = req.body;
      const newPortal = new Portal({ name, description, categories, tags });
      await newPortal.save();
      sendResponse(res, newPortal, 'New portal added successfully');
    } catch (error) {
      console.error('Error adding new portal:', error);
      sendResponse(res, null, 'Failed to add new portal', false);
    }
  },

 async updatePortal(req, res) {
    const { id } = req.params;
    const updateData = req.body;
    try {
      const updatedPortal = await Portal.findByIdAndUpdate(id, updateData, { new: true });
      if (!updatedPortal) {
        return sendResponse(res, null, 'Portal not found', false);
      }
      sendResponse(res, updatedPortal, 'Portal updated successfully');
    } catch (error) {
      console.error('Error updating portal:', error);
      sendResponse(res, null, 'Failed to update portal', false);
    }
  },

  async deletePortal(req, res) {
    const { id } = req.params;
    try {
      const deletedPortal = await Portal.findByIdAndDelete(id);
      if (!deletedPortal) {
        return sendResponse(res, null, 'Portal not found', false);
      }
      sendResponse(res, deletedPortal, 'Portal deleted successfully');
    } catch (error) {
      console.error('Error deleting portal:', error);
      sendResponse(res, null, 'Failed to delete portal', false);
    }
  },
  async getPortalById(req, res) {
    const { id } = req.params;

    try {
      const portal = await Portal.findById(id).populate('Images');
      if (!portal) {
        return sendResponse(res, null, 'Portal not found', false);
      }
      sendResponse(res, portal, 'Portal retrieved successfully');
    } catch (error) {
      console.error('Error fetching portal by ID:', error);
      sendResponse(res, null, 'Failed to fetch portal', false);
    }
  },

  async toggleSubscription(req, res) {
    const { id } = req.params; 
    const userId = req.user._id; 

    try {
      const portal = await Portal.findById(id);
      if (!portal) {
        return sendResponse(res, null, 'Portal not found', false);
      }

      const index = portal.subscribers.indexOf(userId);
      if (index > -1) {
        portal.subscribers.splice(index, 1); 
      } else {
        portal.subscribers.push(userId); 
      }

      await portal.save();
      sendResponse(res, portal.subscribers, 'Subscription updated successfully');
    } catch (error) {
      console.error('Error toggling subscription:', error);
      sendResponse(res, null, 'Failed to toggle subscription', false);
    }
  }

  // Other controller methods can be added here

};

export default PortalController;


