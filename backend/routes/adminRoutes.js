
import express from 'express';
import {
    getAllPortals,
    createPortal,
    editPortal,
    deletePortal,
    getOnePortal,
    getOneUser,
    getOneTag,
    getOneCategory,
    getAllTags,
    editTag,
    deleteTag,
    createTag,
    createCategory,
    editCategory,
    deleteCategory,
    getAllCategories,
    disableUser,
    enableUser,
    getAllUsers,

    } 
from '../Controllers/adminController.js';

const router = express.Router();
//app.use('/api/admin', adminRoutes);
// users related apis
router.put('/disable/:userId', disableUser);
router.put('/enable/:userId', enableUser);
router.get('/users', getAllUsers);
router.get('/users/:userId', getOneUser);

// portal apis
router.get('/portals/', getAllPortals);
router.post('/portals/', createPortal);
router.patch('/portals/:_id', editPortal);
router.delete('/portals/:_id', deletePortal);
router.get('/portals/:_id', getOnePortal);

// tag related apis
router.get('/tags/:id/', getOneTag);
router.get('/tags/', getAllTags);
router.post('/tags/', createTag);
router.patch('/tags/:id/', editTag);
router.delete('/tags/:id/', deleteTag);
router.get('/tags:_id/', createTag);

// category related apis
router.get('/category/:id/', getOneCategory);
router.get('/category/', getAllCategories);
router.post('/category/', createCategory);
router.put('/category/:id/', editCategory);
router.delete('/category/:id/', deleteCategory);
router.get('/category/', getOneCategory);







export default router;
