import Joi from 'joi';

const urlPattern = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/

const shortenSchema = Joi.object({
  url: Joi
    .string()
    .trim()
    .regex(new RegExp(urlPattern))
    .error((error) => new Error(error))
    .required()
});

export default shortenSchema;
