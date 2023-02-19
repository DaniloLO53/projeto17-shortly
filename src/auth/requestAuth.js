async function requestAuth(request, response, next) {
  const { Authorization } = request.headers;
  const token = Authorization?.replace('Bearer ', '');

  try {

    next();
  } catch (error) {
    console.log('Error on server: ', error);

    return response.sendStatus(INTERNAL_SERVER_ERROR);
  }
};

export {
  requestAuth
};
