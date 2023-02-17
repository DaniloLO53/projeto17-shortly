import express from 'express';
import signupAuth from '../../auth/signupAuth.js';
import { signup } from '../../controllers/signup.controller.js';
import validateSignup from '../../middlewares/signup.middleware.js';

const signupRouter = express.Router();

signupRouter.post('/signup', validateSignup, signupAuth, signup);

export default signupRouter;
