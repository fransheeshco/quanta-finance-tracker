import express from 'express';
import { getUsers, login, signUp } from '../controllers/user.controller';

const router = express.Router();

router.get('/', getUsers);
router.post('/', signUp);
router.post('/login', login);

export default router;
