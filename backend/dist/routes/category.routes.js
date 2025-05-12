"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authToken_1 = require("../middlewares/authToken");
const categories_controller_1 = require("../controllers/categories.controller");
const router = express_1.default.Router();
router.post('/postcategories', authToken_1.authToken, categories_controller_1.createCategory);
router.get('/getcategories', authToken_1.authToken, categories_controller_1.getCategories);
router.patch('/updatecategory/:id', authToken_1.authToken, categories_controller_1.updateCategory);
router.delete('/deletecategory/:id', authToken_1.authToken, categories_controller_1.deleteCategory);
exports.default = router;
