/**
 * Created by Angad on 25 January 2023
 */

'use strict';

const propertyService                   = require("../services/propertyService");
const logging                           = require('../../../logging/logging');
const responses                         = require('../../../responses/responses');

exports.create = async (req, res) => {
  const apiReference  = req.apiReference;
  const requestBody   = { ...req.body };
  const cache         = { ...res.locals };

  try {
    requestBody.user_id   = cache.auth_details.user_id;

    const response = await propertyService.create(apiReference, requestBody);
    logging.log(apiReference, { serviceResponse: response });

    if (response.success) {
      return responses.success(res, response.data, response.message);
    }
    return responses.failure(res, {}, response.error);
  } catch (error) {
    logging.logError(apiReference, { EVENT: "Create Property ERROR", ERROR: error, STACK: error.stack });
    return responses.internalServerError(res);
  }
};

exports.list = async (req, res) => {
  const apiReference  = req.apiReference;
  const requestBody   = { ...req.query };
  const cache         = { ...res.locals };

  try {
    requestBody.user_id   = cache.auth_details.user_id;

    const response = await propertyService.fetchDetails(apiReference, requestBody);
    logging.log(apiReference, { serviceResponse: response });

    if (response.success) {
      return responses.success(res, response.data, response.message);
    }

    return responses.failure(res, {}, response.error);
  } catch (error) {
    logging.logError(apiReference, { EVENT: "List Property ERROR", ERROR: error, STACK: error.stack });
    return responses.internalServerError(res);
  }
};

exports.details = async (req, res) => {
  const apiReference  = req.apiReference;
  const requestBody   = { ...req.query };
  const cache         = { ...res.locals };

  try {
    requestBody.user_id   = cache.auth_details.user_id;

    const response = await propertyService.fetchDetails(apiReference, requestBody);
    logging.log(apiReference, { serviceResponse: response });

    if (response.success) {
      return responses.success(res, response.data, response.message);
    }

    return responses.failure(res, {}, response.error);
  } catch (error) {
    logging.logError(apiReference, { EVENT: "Fetch Property Details ERROR", ERROR: error, STACK: error.stack });
    return responses.internalServerError(res);
  }
};

exports.update = async (req, res) => {
  const apiReference  = req.apiReference;
  const requestBody   = { ...req.body };
  const cache         = { ...res.locals };

  try {
    requestBody.user_id   = cache.auth_details.user_id;

    const response = await propertyService.update(apiReference, requestBody);
    logging.log(apiReference, { serviceResponse: response });

    if (response.success) {
      return responses.success(res, response.data, response.message);
    }

    return responses.failure(res, {}, response.error);
  } catch (error) {
    logging.logError(apiReference, { EVENT: "Update Property ERROR", ERROR: error, STACK: error.stack });
    return responses.internalServerError(res);
  }
};

exports.remove = async (req, res) => {
  const apiReference  = req.apiReference;
  const requestBody   = { ...req.body };
  const cache         = { ...res.locals };

  try {
    requestBody.user_id   = cache.auth_details.user_id;

    const response = await propertyService.remove(apiReference, requestBody);
    logging.log(apiReference, { serviceResponse: response });

    if (response.success) {
      return responses.success(res, response.data, response.message);
    }

    return responses.failure(res, {}, response.error);
  } catch (error) {
    logging.logError(apiReference, { EVENT: "Delete Property ERROR", ERROR: error, STACK: error.stack });
    return responses.internalServerError(res);
  }
};