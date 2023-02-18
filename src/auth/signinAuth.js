import jwt from 'jsonwebtoken';
import { db } from '../config/database.connection.js';
import { INTERNAL_SERVER_ERROR } from '../utils/statusCode.utils.js';

async function signinAuth(request, response, next) {
  const { password, email } = request.body;
  const payload = {
    password,
  };

  try {
    const token = jwt.sign(payload, 'secretkey');

    const userIdResults = await db.query('SELECT id from users WHERE email = $1',
      [email]);
    const userId = userIdResults.rows[0].id;

    console.log(userId)

    await db.query(`INSERT INTO tokens(user_id, value) VALUES ($1, $2)`,
      [userId, token]);

    next();
  } catch (error) {
    console.log('Error on server: ', error);

    return response.sendStatus(INTERNAL_SERVER_ERROR);
  }
};

export default signinAuth;
