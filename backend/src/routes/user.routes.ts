import express from 'express';
import {getUserInfo} from '../controllers/user.controller';
import { authToken } from '../middlewares/authToken';

const router = express.Router();

router.get('/getuser', authToken , getUserInfo);

export default router;