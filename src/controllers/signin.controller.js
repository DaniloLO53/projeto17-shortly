import { INTERNAL_SERVER_ERROR, OK, UNAUTHORIZED } from "../utils/statusCode.utils.js";
import bcrypt from 'bcrypt';
import { db } from "../config/database.connection.js";

async function getTokenAndPassword(request, response, next) {
  const { email } = request.body;

  try {
    const usersResults = await db.query(`SELECT users.password, tokens.value
      FROM users
      JOIN tokens
        ON tokens.user_id = users.id
      WHERE email = $1`,
      [email]);
    const results = usersResults.rows;
    const queryData = results[0];

    if (results.length === 0) {
      return response.sendStatus(UNAUTHORIZED);
    }

    response.locals.queryData = queryData;

    next();
  } catch (error) {
    console.log('Error on server: ', error);

    return response.sendStatus(INTERNAL_SERVER_ERROR);
  }
};

async function signin(request, response, next) {
  const { password } = request.body;

  try {
    const queryData = response.locals.queryData;

    const passwordHash = bcrypt.compareSync(password, queryData.password);
    if (!passwordHash) {
      return response.sendStatus(UNAUTHORIZED);
    }

    return response.status(OK).send(queryData.value);
  } catch (error) {
    console.log('Error on server: ', error);

    return response.sendStatus(INTERNAL_SERVER_ERROR);
  }
};

export {
  signin,
  getTokenAndPassword
};
