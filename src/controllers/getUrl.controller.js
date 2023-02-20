import { db } from "../config/database.connection.js";
import { INTERNAL_SERVER_ERROR, NOT_FOUND, OK } from "../utils/statusCode.utils.js";

async function getUrl(request, response, next) {
  const { id } = request.params;

  try {
    const resultsFromShortens = await db.query(`
      SELECT shorturl, id, url
      FROM shortens
      WHERE id = $1
    `, [id]);
    const responseObj = resultsFromShortens.rows[0];

    if (responseObj) {
      const responseObjLowerCase = {
        shortUrl: responseObj.shorturl,
        id: responseObj.id,
        url: responseObj.url
      };

      return response.status(OK).send(responseObjLowerCase);
    }

    return response.sendStatus(NOT_FOUND);

  } catch (error) {
    console.log('Error on server: ', error);

    return response.sendStatus(INTERNAL_SERVER_ERROR);
  }
};

export {
  getUrl,
}