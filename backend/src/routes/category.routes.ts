import express from "express";
import { authToken } from "../middlewares/authToken";
import { createCategory, getCategories, updateCategory, deleteCategory } from '../controllers/categories.controller'

const router = express.Router();

router.post('/postcategories/', authToken, createCategory);
router.get('/getcategories', authToken, getCategories);
router.patch('/updatecategory/:id', authToken, updateCategory);
router.delete('/deletecategory/:id', authToken, deleteCategory);

export default router;