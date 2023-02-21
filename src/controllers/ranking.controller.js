import { db } from "../config/database.connection.js";
import { INTERNAL_SERVER_ERROR, OK } from "../utils/statusCode.utils.js";

async function ranking(request, response, next) {
  try {
    const results = await db.query(`
    SELECT users.id, users.name, SUM(visitcount) AS visitcount
    FROM (
      SELECT
      visitcount, shortens.user_id AS user_id
      FROM shortens
      JOIN users
        ON users.id = shortens.user_id
    ) AS total
    INNER JOIN users
      ON users.id = user_id
      GROUP BY users.id, users.name
    ORDER BY visitcount DESC
    LIMIT 10
    `);

    return response.status(OK).send(results.rows);
  } catch (error) {
    console.log('Error on server: ', error);

    return response.sendStatus(INTERNAL_SERVER_ERROR);
  }
};

export {
  ranking
};
