import { db } from "../config/database.connection.js";
import { INTERNAL_SERVER_ERROR, UNAUTHORIZED } from "../utils/statusCode.utils.js";

async function requestAuth(request, response, next) {
  const { authorization } = request.headers;
  const token = authorization?.replace('Bearer ', '');

  try {
    const tokenResults = await db.query(`
    SELECT user_id
    FROM sessions
    WHERE token = $1
    `, [token]);
    const tokens = tokenResults.rows;

    if (tokens.length > 0) {
      response.locals.user_id = tokens[0].user_id;

      return next();
    }

    return response.sendStatus(UNAUTHORIZED);

  } catch (error) {
    console.log('Error on server: ', error);

    return response.sendStatus(INTERNAL_SERVER_ERROR);
  }
};

export {
  requestAuth
};
