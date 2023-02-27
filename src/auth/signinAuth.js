import jwt from 'jsonwebtoken';
import { db } from '../config/database.connection.js';
import { DAY_TO_MILLISECONDS } from '../utils/constants.utils.js';
import { INTERNAL_SERVER_ERROR, UNAUTHORIZED } from '../utils/statusCode.utils.js';
import dotenv from 'dotenv';

dotenv.config();

function createToken(id) {
  const days = 3;
  const key = process.env.SECRET_KEY;
  try {
    const token = jwt.sign({ id }, 'key', {
      expiresIn: DAY_TO_MILLISECONDS * days / 1000
    });

    return token;
  } catch (error) {
    console.log(error);

    throw new Error(error);
  }
}

async function createSession(id, token) {
  try {
    await db
      .query(`INSERT INTO sessions (user_id, token) VALUES ($1, $2)`, [id, token]);
  } catch (error) {
    console.log('Error on server: ', error);

    throw new Error(error);
  }
};

async function signinAuth(request, response, next) {
  const { email } = request.body;
  const days = 3;

  try {
    const resultsFromUsers = await db
      .query(`SELECT id FROM users WHERE email = $1 `, [email]);

    if (resultsFromUsers.rows.length === 0) return response.sendStatus(UNAUTHORIZED);

    const userId = resultsFromUsers.rows[0]?.id;

    const token = createToken(userId);

    response.locals.token = token;

    createSession(userId, token);

    response.cookie('jwt',
      token,
      {
        httpOnly: true,
        maxAge: DAY_TO_MILLISECONDS * days,
      });

    next();
  } catch (error) {
    console.log('Error on server: ', error);

    return response.sendStatus(INTERNAL_SERVER_ERROR);
  }
};

export default signinAuth;
