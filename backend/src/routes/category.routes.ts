import express from "express";
import { authToken } from "../middlewares/authToken";
import { createCategory, getCategories } from '../controllers/categories.controllers'

const router = express.Router();

router.post('/postcategories', authToken, createCategory);
router.get('/getcategories', authToken, getCategories);

export default router;