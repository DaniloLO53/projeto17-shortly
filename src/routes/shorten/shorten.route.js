import express from 'express';
import { requestAuth } from '../../auth/requestAuth.js';
import { deleteUrl } from '../../controllers/deleteUrl.controller.js';
import { getUrl } from '../../controllers/getUrl.controller.js';
import { myShortens } from '../../controllers/myShortens.controller.js';
import { ranking } from '../../controllers/ranking.controller.js';
import { redirectToUrl } from '../../controllers/redirectToUrl.controller.js';
import { shorten } from '../../controllers/shorten.controller.js';
import validateShorten from '../../middlewares/shorten.middleware.js';

const shortenRouter = express.Router();

shortenRouter.post('/urls/shorten', validateShorten, requestAuth, shorten);
shortenRouter.get('/urls/:id', getUrl);
shortenRouter.delete('/urls/:id', requestAuth, deleteUrl);
shortenRouter.get('/urls/open/:shortUrl', redirectToUrl);
shortenRouter.get('/users/me', requestAuth, myShortens);
shortenRouter.get('/ranking', ranking);

export default shortenRouter;
