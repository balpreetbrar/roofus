/**
 * Created by Angad on 25 January 2023
 */

'use strict';

const logging                         = require('../../../logging/logging');
const responses                       = require('../../../responses/responses');

const openHouseService                = require('../services/openHouseService');

exports.create = async (req, res) => {
  const apiReference  = req.apiReference;
  const requestBody   = { ... req.body };
  const cache         = { ... res.locals };

  try {
    requestBody.user_id = cache.auth_details.user_id;

    const response = await openHouseService.insertDetails(apiReference, requestBody);
    logging.log(apiReference, { serviceResponse: response });

    if (response.success) {
      return responses.success(res, response.data, response.message);
    }

    return responses.failure(res, {}, response.error);
  } catch (error) {
    logging.logError(apiReference, { EVENT: "Create Open House ERROR", ERROR: error, STACK: error.stack });
    return responses.internalServerError(res);
  }
};

exports.list = async (req, res) => {
  const apiReference  = req.apiReference;
  const requestBody   = { ... req.query };
  const cache         = { ... res.locals };

  try {
    requestBody.user_id = cache.auth_details.user_id;

    const response = await openHouseService.fetchDetails(apiReference, requestBody);
    logging.log(apiReference, { serviceResponse: response });

    if (response.success) {
      return responses.success(res, response.data, response.message);
    }

    return responses.failure(res, {}, response.error);
  } catch (error) {
    logging.logError(apiReference, { EVENT: "List Open House ERROR", ERROR: error, STACK: error.stack });
    return responses.internalServerError(res);
  }
};

exports.details = async (req, res) => {
  const apiReference  = req.apiReference;
  const requestBody   = { ... req.query };
  const cache         = { ... res.locals };

  try {
    requestBody.user_id = cache.auth_details.user_id;

    const response = await openHouseService.fetchDetails(apiReference, requestBody);
    logging.log(apiReference, { serviceResponse: response });

    if (response.success) {
      return responses.success(res, response.data, response.message);
    }

    return responses.failure(res, {}, response.error);
  } catch (error) {
    logging.logError(apiReference, { EVENT: "Fetch Open House Details ERROR", ERROR: error, STACK: error.stack });
    return responses.internalServerError(res);
  }
};

exports.update = async (req, res) => {
  const apiReference  = req.apiReference;
  const requestBody   = { ... req.body };
  const cache         = { ... res.locals };

  try {
    requestBody.user_id = cache.auth_details.user_id;

    const response = await openHouseService.updateDetails(apiReference, requestBody);
    logging.log(apiReference, { serviceResponse: response });

    if (response.success) {
      return responses.success(res, response.data, response.message);
    }

    return responses.failure(res, {}, response.error);
  } catch (error) {
    logging.logError(apiReference, { EVENT: "Update Open House ERROR", ERROR: error, STACK: error.stack });
    return responses.internalServerError(res);
  }
};

exports.remove = async (req, res) => {
  const apiReference  = req.apiReference;
  const requestBody   = { ... req.body };
  const cache         = { ... res.locals };

  try {
    requestBody.user_id = cache.auth_details.user_id;

    const response = await openHouseService.removeDetails(apiReference, requestBody);
    logging.log(apiReference, { serviceResponse: response });

    if (response.success) {
      return responses.success(res, response.data, response.message);
    }

    return responses.failure(res, {}, response.error);
  } catch (error) {
    logging.logError(apiReference, { EVENT: "Remove Open House ERROR", ERROR: error, STACK: error.stack });
    return responses.internalServerError(res);
  }
};

exports.enroll = async (req, res) => {
  const apiReference  = req.apiReference;
  const requestBody   = { ... req.body };
  const cache         = { ... res.locals };

  try {
    requestBody.user_id = cache.auth_details.user_id;

    const response = await openHouseService.enroll(apiReference, requestBody);
    logging.log(apiReference, { serviceResponse: response });

    if (response.success) {
      return responses.success(res, response.data, response.message);
    }

    return responses.failure(res, {}, response.error);
  } catch (error) {
    logging.logError(apiReference, { EVENT: "Enroll Open House ERROR", ERROR: error, STACK: error.stack });
    return responses.internalServerError(res);
  }
};
