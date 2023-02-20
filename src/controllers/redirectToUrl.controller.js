import { db } from "../config/database.connection.js";
import { INTERNAL_SERVER_ERROR, NOT_FOUND } from "../utils/statusCode.utils.js";

async function redirectToUrl(request, response, next) {
  const { shortUrl } = request.params;

  try {
    const resultsFromShortens = await db.query(`
      SELECT url
      FROM shortens
      WHERE shorturl = $1
    `, [shortUrl]);
    const responseObj = resultsFromShortens.rows[0];

    if (responseObj) return response.redirect(responseObj.url);

    return response.sendStatus(NOT_FOUND);

  } catch (error) {
    console.log('Error on server: ', error);

    return response.sendStatus(INTERNAL_SERVER_ERROR);
  }
}

export {
  redirectToUrl,
}