import express from 'express';
import { requestAuth } from '../../auth/requestAuth.js';
import { shorten } from '../../controllers/shorten.controller.js';
import validateShorten from '../../middlewares/shorten.middleware.js';

const shortenRouter = express.Router();

shortenRouter.post('/urls/shorten', validateShorten, requestAuth, shorten);

export default shortenRouter;
