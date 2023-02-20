import express from 'express';
import shortenRouter from './shorten/shorten.route.js';
import signinRouter from './sign/signin.route.js';
import signupRouter from './sign/signup.route.js';

const router = express.Router();

router.use(signupRouter);
router.use(signinRouter);
router.use(shortenRouter);

export default router;
