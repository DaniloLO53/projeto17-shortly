import { db } from '../config/database.connection.js';
import bcrypt from 'bcrypt';
import {
  OK,
  CREATED,
  UNPROCESSABLE_ENTITY,
  INTERNAL_SERVER_ERROR,
  BAD_REQUEST,
  CONFLICT,
} from '../utils/statusCode.utils.js';


async function signup(request, response) {
  const { email, password, name } = request.body;
  const passwordHashed = bcrypt.hashSync(password, 10);

  try {
    const findUser = await db.query(`SELECT * FROM users WHERE "email" = $1`,
      [email]);

    if (
      !email
    ) return response.sendStatus(BAD_REQUEST);
    if (findUser.rowCount !== 0) return response.sendStatus(CONFLICT);

    await db.query(`INSERT INTO users ("name", "email", "password")
    VALUES ($1, $2, $3)`,
      [name, email, passwordHashed]);

    return response.sendStatus(CREATED);
  } catch (error) {
    console.log('Error on server: ', error);

    return response.sendStatus(INTERNAL_SERVER_ERROR);
  }
};

export {
  signup,
}