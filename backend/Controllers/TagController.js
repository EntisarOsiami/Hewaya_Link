import Tag from '../models/Tag.js';
import sendResponse from '../Utils/sendResponse.js';

const TagController = {

  async createTag(req, res) {
    try {
      const tag = new Tag(req.body);
      await tag.save();
      sendResponse(res, tag, 'Tag created successfully');
    } catch (error) {
      console.error('Error creating tag:', error);
      sendResponse(res, null, 'Failed to create tag', false);
    }
  },

  async getAllTags(req, res) {
    try {
      const tags = await Tag.find({});
      sendResponse(res, tags, 'Tags retrieved successfully');
    } catch (error) {
      console.error('Error fetching tags:', error);
      sendResponse(res, null, 'Failed to fetch tags', false);
    }
  },

  async getTagById(req, res) {
    try {
      const tag = await Tag.findById(req.params.id);
      if (!tag) {
        return sendResponse(res, null, 'Tag not found', false);
      }
      sendResponse(res, tag, 'Tag retrieved successfully');
    } catch (error) {
      console.error('Error fetching tag:', error);
      sendResponse(res, null, 'Failed to fetch tag', false);
    }
  },

  async updateTag(req, res) {
    try {
      const tag = await Tag.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!tag) {
        return sendResponse(res, null, 'Tag not found', false);
      }
      sendResponse(res, tag, 'Tag updated successfully');
    } catch (error) {
      console.error('Error updating tag:', error);
      sendResponse(res, null, 'Failed to update tag', false);
    }
  },

  async deleteTag(req, res) {
    try {
      const tag = await Tag.findByIdAndDelete(req.params.id);
      if (!tag) {
        return sendResponse(res, null, 'Tag not found', false);
      }
      sendResponse(res, null, 'Tag deleted successfully');
    } catch (error) {
      console.error('Error deleting tag:', error);
      sendResponse(res, null, 'Failed to delete tag', false);
    }
  }
};

export default TagController;
