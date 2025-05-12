import express from 'express';
// import { login, signUp } from '../controllers/auth.controller'; // Comment this out

const router = express.Router();

router.post('/signup', (req, res) => {
  res.send('Signup route hit');
});

router.post('/login', (req, res) => {
  res.send('Login route hit');
});

export default router;