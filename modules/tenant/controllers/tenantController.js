/**
 * Created by Angad on 25 January 2023
 */

const logging                         = require('../../../logging/logging');
const tenantService                   = require('../services/tenantService');

const responses                       = require('../../../responses/responses');

exports.create = async (req, res) => {
  const apiReference  = req.apiReference;
  const requestBody   = { ... req.body };
  const cache         = { ... res.locals };

  try {
    requestBody.user_id = cache.auth_details.user_id;

    const response = await tenantService.insertDetails(apiReference, requestBody);
    logging.log(apiReference, { serviceResponse: response });

    if (response.success) {
      return responses.success(res, response.data, response.message);
    }

    return responses.failure(res, {}, response.error);
  } catch (error) {
    logging.logError(apiReference, { EVENT: "Create Tenant ERROR", ERROR: error, STACK: error.stack });
    return responses.internalServerError(res);
  }
};

exports.list = async (req, res) => {
  const apiReference  = req.apiReference;
  const requestBody   = { ... req.body };
  const cache         = { ... res.locals };

  try {
    requestBody.user_id = cache.auth_details.user_id;

    const response = await tenantService.fetchDetails(apiReference, requestBody);
    logging.log(apiReference, { serviceResponse: response });

    if (response.success) {
      return responses.success(res, response.data, response.message);
    }

    return responses.failure(res, {}, response.error);
  } catch (error) {
    logging.logError(apiReference, { EVENT: "List Tenant ERROR", ERROR: error, STACK: error.stack });
    return responses.internalServerError(res);
  }
};

exports.fetch = async (req, res) => {
  const apiReference  = req.apiReference;
  const requestBody   = { ... req.body };
  const cache         = { ... res.locals };

  try {
    requestBody.user_id = cache.auth_details.user_id;

    const response = await tenantService.fetchDetails(apiReference, requestBody);
    logging.log(apiReference, { serviceResponse: response });

    if (response.success) {
      return responses.success(res, response.data, response.message);
    }

    return responses.failure(res, {}, response.error);
  } catch (error) {
    logging.logError(apiReference, { EVENT: "Fetch Tenant Details ERROR", ERROR: error, STACK: error.stack });
    return responses.internalServerError(res);
  }
};

exports.update = async (req, res) => {
  const apiReference  = req.apiReference;
  const requestBody   = { ... req.body };
  const cache         = { ... res.locals };

  try {
    requestBody.user_id = cache.auth_details.user_id;

    const response = await tenantService.updateDetails(apiReference, requestBody);
    logging.log(apiReference, { serviceResponse: response });

    if (response.success) {
      return responses.success(res, response.data, response.message);
    }

    return responses.failure(res, {}, response.error);
  } catch (error) {
    logging.logError(apiReference, { EVENT: "Update Tenant ERROR", ERROR: error, STACK: error.stack });
    return responses.internalServerError(res);
  }
};

exports.remove = async (req, res) => {
  const apiReference  = req.apiReference;
  const requestBody   = { ... req.body };
  const cache         = { ... res.locals };

  try {
    requestBody.user_id = cache.auth_details.user_id;

    const response = await tenantService.removeDetails(apiReference, requestBody);
    logging.log(apiReference, { serviceResponse: response });

    if (response.success) {
      return responses.success(res, response.data, response.message);
    }

    return responses.failure(res, {}, response.error);
  } catch (error) {
    logging.logError(apiReference, { EVENT: "Remove Tenant ERROR", ERROR: error, STACK: error.stack });
    return responses.internalServerError(res);
  }
};