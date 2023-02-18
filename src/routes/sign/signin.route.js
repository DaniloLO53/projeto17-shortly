import express from 'express';
import signinAuth from '../../auth/signinAuth.js';
import { signin } from '../../controllers/signin.controller.js';
import validateSignin from '../../middlewares/signin.middleware.js';

const signinRouter = express.Router();

signinRouter.post('/signin', validateSignin, signinAuth, signin);

export default signinRouter;
