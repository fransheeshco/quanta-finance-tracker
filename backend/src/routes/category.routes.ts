import express from "express";
import { authToken } from "../middlewares/authToken";
import { createCategory, getCategories, updateCategory, deleteCategory } from '../controllers/categories.controllers'

const router = express.Router();

router.post('/postcategories', authToken, createCategory);
router.get('/getcategories', authToken, getCategories);
router.patch('/updatecategory', authToken, updateCategory);
router.delete('/deletecategory', authToken, deleteCategory);

export default router;