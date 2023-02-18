import express from 'express';
import signinRouter from './sign/signin.route.js';
import signupRouter from './sign/signup.route.js';

const router = express.Router();

router.use(signupRouter);
router.use(signinRouter);

export default router;
