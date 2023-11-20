import Category from '../models/Category.js';
import sendResponse from '../Utils/sendResponse.js';

const CategoryController = {

  async createCategory(req, res) {
    try {
      const category = new Category(req.body);
      await category.save();
      sendResponse(res, category, 'Category created successfully');
    } catch (error) {
      console.error('Error creating category:', error);
      sendResponse(res, null, 'Failed to create category', false);
    }
  },

  async getAllCategories(req, res) {
    try {
      const categories = await Category.find({});
      sendResponse(res, categories, 'Categories retrieved successfully');
    } catch (error) {
      console.error('Error fetching categories:', error);
      sendResponse(res, null, 'Failed to fetch categories', false);
    }
  },

  async getCategoryById(req, res) {
    try {
      const category = await Category.findById(req.params.id);
      if (!category) {
        return sendResponse(res, null, 'Category not found', false);
      }
      sendResponse(res, category, 'Category retrieved successfully');
    } catch (error) {
      console.error('Error fetching category:', error);
      sendResponse(res, null, 'Failed to fetch category', false);
    }
  },

  async updateCategory(req, res) {
    try {
      const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!category) {
        return sendResponse(res, null, 'Category not found', false);
      }
      sendResponse(res, category, 'Category updated successfully');
    } catch (error) {
      console.error('Error updating category:', error);
      sendResponse(res, null, 'Failed to update category', false);
    }
  },

  async deleteCategory(req, res) {
    try {
      const category = await Category.findByIdAndDelete(req.params.id);
      if (!category) {
        return sendResponse(res, null, 'Category not found', false);
      }
      sendResponse(res, null, 'Category deleted successfully');
    } catch (error) {
      console.error('Error deleting category:', error);
      sendResponse(res, null, 'Failed to delete category', false);
    }
  }
};

export default CategoryController;
