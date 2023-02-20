import { db } from "../config/database.connection.js";
import { CREATED, INTERNAL_SERVER_ERROR } from "../utils/statusCode.utils.js";
import { customAlphabet } from 'nanoid';

async function shorten(request, response) {
  const { url } = request.body;
  const user_id = response.locals.user_id;

  const nanoid = customAlphabet('1234567890abcdef', 8);
  const shortUrl = nanoid();

  try {
    await db.query(`
      INSERT INTO shortens (url, shortUrl, user_id)
      VALUES ($1, $2, $3)
    `, [url, shortUrl, user_id]);

    const resultsFromShortens = await db.query(`
      SELECT shorturl, id
      FROM shortens
      WHERE shorturl = $1 AND user_id = $2
    `, [shortUrl, user_id]);
    const responseObj = resultsFromShortens.rows[0];

    const responseObjLowerCase = {
      shortUrl: responseObj.shorturl,
      id: responseObj.id
    };

    return response.status(CREATED).send(responseObjLowerCase);
  } catch (error) {
    console.log('Error on server: ', error);

    return response.sendStatus(INTERNAL_SERVER_ERROR);
  }
};

export {
  shorten
}
