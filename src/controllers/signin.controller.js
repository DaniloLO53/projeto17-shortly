import { INTERNAL_SERVER_ERROR, OK, UNAUTHORIZED } from "../utils/statusCode.utils.js";
import bcrypt from 'bcrypt';
import { db } from "../config/database.connection.js";

async function verifyUserExists(request, response, next) {
  const { email } = request.body;

  try {
    const usersResults = await db.query(`
      SELECT users.password
      FROM users
      WHERE email = $1`,
      [email]);
    const results = usersResults.rows;
    const password = results[0].password;

    if (results.length === 0) {
      return response.sendStatus(UNAUTHORIZED);
    }

    response.locals.password = password;

    next();
  } catch (error) {
    console.log('Error on server: ', error);

    return response.sendStatus(INTERNAL_SERVER_ERROR);
  }
};

async function signin(request, response, next) {
  const { password } = request.body;

  try {
    const queryData = response.locals;

    console.log(response.locals)

    const passwordHash = bcrypt.compareSync(password, queryData.password);
    if (!passwordHash) {
      return response.sendStatus(UNAUTHORIZED);
    }

    return response.status(OK).send({ token: queryData.token });
  } catch (error) {
    console.log('Error on server: ', error);

    return response.sendStatus(INTERNAL_SERVER_ERROR);
  }
};

export {
  signin,
  verifyUserExists
};
