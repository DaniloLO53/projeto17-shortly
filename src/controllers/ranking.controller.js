import { db } from "../config/database.connection.js";
import { INTERNAL_SERVER_ERROR, OK } from "../utils/statusCode.utils.js";

async function ranking(request, response, next) {
  try {
    const results = await db.query(`
      SELECT shortens.user_id AS id, users.name, shortens.visitcount, count(shortens.url)
      FROM users
      JOIN shortens
        ON shortens.user_id = users.id
        GROUP BY shortens.user_id, users.name, shortens.visitcount
      ORDER BY shortens.visitcount
      LIMIT 10
    `);
    console.log(results);

    return response.status(OK).send(results.rows);
  } catch (error) {
    console.log('Error on server: ', error);

    return response.sendStatus(INTERNAL_SERVER_ERROR);
  }
};

export {
  ranking
};
