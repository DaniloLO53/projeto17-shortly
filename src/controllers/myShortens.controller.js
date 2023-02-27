import { db } from "../config/database.connection.js";
import { INTERNAL_SERVER_ERROR } from "../utils/statusCode.utils.js";

async function myShortens(request, response, next) {
  const { authorization } = request.headers;
  const token = authorization?.replace('Bearer ', '');

  try {
    const resultsFromShortenedUrls = await db.query(`
      SELECT
      shortens.id, shortens.url, shortens.shorturl, shortens.visitCount
      FROM shortens
      JOIN sessions
        ON sessions.user_id = shortens.user_id
      WHERE sessions.token = $1
    `, [token]);

    const resultsFromTotalVisits = await db.query(`
      SELECT users.id, users.name, SUM(visitCount) AS visitCount
      FROM (
        SELECT
        visitCount, shortens.user_id AS user_id
        FROM shortens
        JOIN users
          ON users.id = shortens.user_id
      ) AS total
      JOIN users
        ON users.id = total.user_id
      JOIN sessions
        ON sessions.user_id = total.user_id
      WHERE sessions.token = $1
      GROUP BY users.id, users.name
    `, [token]);

    const finalObject = {
      ...resultsFromTotalVisits.rows[0],
      shortenedUrls: resultsFromShortenedUrls.rows
    };

    return response.status(200).send(finalObject);
  } catch (error) {
    console.log('Error on server: ', error);

    return response.sendStatus(INTERNAL_SERVER_ERROR);
  }
};

export {
  myShortens,
}