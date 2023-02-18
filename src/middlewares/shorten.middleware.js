import shortenSchema from "../schemas/shorten.schema.js";
import { UNPROCESSABLE_ENTITY } from "../utils/statusCode.utils.js";

async function validateShorten(request, response, next) {
  const urlObj = request.body;

  try {
    const validation = shortenSchema.validate(urlObj);

    if (validation.error) {
      console.log('Error on signin validation: ', validation.error.message);

      return response.sendStatus(UNPROCESSABLE_ENTITY);
    }

    next();
  } catch (error) {
    console.log('Error on server: ', error);

    return response.sendStatus(INTERNAL_SERVER_ERROR);
  }
};

export default validateShorten;
