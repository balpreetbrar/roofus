/**
 * Created by Angad on 25 January 2023
 */

'use strict';

const logging                           = require('../logging/logging');
const jwtService                        = require('../services/jwtService');
const responses                         = require('../responses/responses');

exports.authenticateUser = async (req, res, next) => {
  let apiReference   = req.apiReference;
  let cache          = { ... res.locals};
  logging.log(apiReference, { EVENT: "Locals Values >>> in Authenticate User", Data: cache });

  let decodedToken  = await jwtService.verifyJWT(apiReference, req.headers.access_token);
  if (!decodedToken) {
    return responses.invalidAuthKey(res);
  }

  // TODO: Create User Validation;

  res.locals.auth_details               = decodedToken;
  res.locals.auth_details.access_token  = req.headers.access_token;

  return next();
};