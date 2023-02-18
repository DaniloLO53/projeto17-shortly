import express from 'express';
import validateShorten from '../../middlewares/shorten.middleware.js';

const shortenRouter = express.Router();

shortenRouter.post('/urls/shorten', validateShorten);

export default shortenRouter;
