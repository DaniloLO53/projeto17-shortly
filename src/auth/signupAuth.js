import jwt from 'jsonwebtoken';
import { INTERNAL_SERVER_ERROR } from '../utils/statusCode.utils.js';

async function signupAuth(request, response, next) {
  const { password } = request.body;
  const payload = {
    password,
  };

  try {
    const token = jwt.sign(payload, 'secretkey');

    response.locals.token = token;

    next();
  } catch (error) {
    console.log('Error on server: ', error);

    return response.sendStatus(INTERNAL_SERVER_ERROR);
  }
};

export default signupAuth;
