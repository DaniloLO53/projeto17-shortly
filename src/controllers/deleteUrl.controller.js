import { db } from "../config/database.connection.js";
import { INTERNAL_SERVER_ERROR, NOT_FOUND, NO_CONTENT, OK, UNAUTHORIZED } from "../utils/statusCode.utils.js";

async function deleteUrl(request, response, next) {
  const { id } = request.params;
  const { authorization } = request.headers;
  const token = authorization?.replace('Bearer ', '');

  try {
    const userFromToken = await db.query(`
    SELECT user_id
    FROM sessions
    WHERE token = $1
    `, [token]);
    const user_id = userFromToken.rows[0]?.user_id;

    const idFromShortens = await db.query(`
      SELECT id, user_id
      FROM shortens
      WHERE id = $1
    `, [id]);
    const responseObj = idFromShortens.rows[0];

    console.log(responseObj.user_id, user_id);

    if (responseObj) {
      if (responseObj.user_id === user_id) {
        await db.query(`
        DELETE
        FROM shortens
        WHERE id = $1
        `, [id]);
        return response.sendStatus(NO_CONTENT);
      }
      return response.sendStatus(UNAUTHORIZED);
    }
    return response.sendStatus(NOT_FOUND);

  } catch (error) {
    console.log('Error on server: ', error);

    return response.sendStatus(INTERNAL_SERVER_ERROR);
  }
};

export {
  deleteUrl,
}