/**
 * Created by Angad on 24 January 2023
 */

'use strict';

const logging                         = require('../../../logging/logging');
const onboardService                  = require('../services/onboardService');

const responses                       = require('../../../responses/responses');

exports.register = async (req, res) => {
  const apiReference  = req.apiReference;
  const requestBody   = { ... req.body };

  try {
    const response = await onboardService.register(apiReference, requestBody);
    logging.log(apiReference, { serviceResponse: response });

    if (response.success) {
      return responses.success(res, response.data);
    }

    if (response.is_duplicate) {
      return responses.alreadyExists(res)
    }

    return responses.failure(res, {}, response.error);
  } catch (error) {
    logging.logError(apiReference, { EVENT: "Register New User ERROR", ERROR: error, STACK: error.stack });
    return responses.internalServerError(res);
  }
};

exports.login = async (req, res) => {
  const apiReference  = req.apiReference;
  const requestBody   = { ... req.body };

  try {
    const response = await onboardService.login(apiReference, requestBody);
    logging.log(apiReference, { serviceResponse: response });

    if (response.success) {
      return responses.success(res, response.data);
    }
    return responses.failure(res, {}, response.error);
  } catch (error) {
    logging.logError(apiReference, { EVENT: "Login User ERROR", ERROR: error, STACK: error.stack });
    return responses.internalServerError(res);
  }
};