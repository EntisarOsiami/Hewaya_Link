
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

// users related apis
router.put('/disable/:_id', disableUser);
router.put('/enable/:_id', enableUser);
router.get('/users', getAllUsers);
router.get('/users/:_id', getOneUser);

// portal apis
router.get('/portals/', getAllPortals);
router.post('/portals/', createPortal);
router.put('/portals/:_id', editPortal);
router.delete('/portals/:_id', deletePortal);
router.get('/portals/:_id', getOnePortal);

// tag related apis
router.get('/tags/:_id/', getOneTag);
router.get('/tags/', getAllTags);
router.post('/tags/', createTag);
router.put('/tags/:_id/', editTag);
router.delete('/tags/:_id/', deleteTag);
router.get('/tags:_id/', createTag);

// category related apis
router.get('/category/:_id/', getOneCategory);
router.get('/category/', getAllCategories);
router.post('/category/', createCategory);
router.put('/category/:_id/', editCategory);
router.delete('/category/:_id/', deleteCategory);
router.get('/category/', getOneCategory);







export default router;
