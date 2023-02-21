import { db } from "../config/database.connection.js";
import { INTERNAL_SERVER_ERROR } from "../utils/statusCode.utils.js";

async function myShortens(request, response, next) {
  const { authorization } = request.headers;
  const token = authorization?.replace('Bearer ', '');

  console.log('Auth: ', token)

  try {
    const resultsFromShortenedUrls = await db.query(`
      SELECT
      shortens.id, shortens.url, shortens.shorturl, shortens.visitcount
      FROM shortens
      JOIN sessions
        ON sessions.user_id = shortens.user_id
      WHERE sessions.token = $1
    `, [token]);

    console.log(resultsFromShortenedUrls.rows)

    const resultsFromTotalVisits = await db.query(`
      SELECT users.id, users.name, SUM(visitcount) AS visitcount
      FROM (
        SELECT
        visitcount, sessions.user_id
        FROM shortens
        JOIN sessions
          ON sessions.token = $1
      ) AS total
      JOIN sessions
        ON sessions.token = $1
      JOIN users
        ON users.id = sessions.user_id
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