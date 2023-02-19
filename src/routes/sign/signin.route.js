import express from 'express';
import signinAuth from '../../auth/signinAuth.js';
import { verifyUserExists, signin } from '../../controllers/signin.controller.js';
import validateSignin from '../../middlewares/signin.middleware.js';

const signinRouter = express.Router();

signinRouter.post('/signin', validateSignin, signinAuth, verifyUserExists, signin);

export default signinRouter;
