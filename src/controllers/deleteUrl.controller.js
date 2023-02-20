import { db } from "../config/database.connection.js";
import { INTERNAL_SERVER_ERROR, NOT_FOUND, NO_CONTENT, OK, UNAUTHORIZED } from "../utils/statusCode.utils.js";

async function deleteUrl(request, response, next) {
  const { id } = request.params;

  try {
    const resultsFromShortens = await db.query(`
      SELECT *
      FROM shortens
      WHERE id = $1
    `, [id]);
    const responseObj = resultsFromShortens.rows[0];

    if (responseObj) {
      const user_idResults = await db.query(`
      SELECT user_id
      FROM shortens
      JOIN users
        ON shortens.user_id = users.id
      WHERE shortens.id = $1
      `, [id]);
      const user_id = user_idResults.rows[0];

      if (user_id) {
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