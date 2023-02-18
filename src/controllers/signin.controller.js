import { INTERNAL_SERVER_ERROR, OK, UNAUTHORIZED } from "../utils/statusCode.utils.js";
import bcrypt from 'bcrypt';
import { db } from "../config/database.connection.js";

async function signin(request, response, next) {
  const { password, email } = request.body;
  const token = response.locals.token;

  try {
    const results = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = results.rows[0];
    if (!user) {
      return response.sendStatus(UNAUTHORIZED);
    }

    const passwordHash = bcrypt.compareSync(password, user.password);
    if (!passwordHash | !user) {
      return response.sendStatus(UNAUTHORIZED);
    }

    return response.status(OK).send(token);
  } catch (error) {
    console.log('Error on server: ', error);

    return response.sendStatus(INTERNAL_SERVER_ERROR);
  }
};

export {
  signin
};
