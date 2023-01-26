/**
 * Created by Angad on 25 January 2023
 */

'use strict';

const logging                           = require('../../../logging/logging');
const propertyDao                       = require('../dao/propertyDao');
const propertyConstants                 = require('../properties/propertyConstants');

const authProperty = async (apiReference, opts) => {
  let response = { success: false };
  logging.log(apiReference, { EVENT: "Authorise Property", OPTS: opts });

  let fetchDetails = await propertyDao.fetchDetails(apiReference, opts);
  logging.log(apiReference, { EVENT: "Fetch Property Details", RESPONSE: fetchDetails });

  if (!fetchDetails.success) {
    return fetchDetails;
  }

  if (_.isEmpty(fetchDetails.data)) {
    response.error  = propertyConstants.RESPONSES.INVALID_PROPERTY_ID;
    return response;
  }

  response.success  = true;
  response.data     = fetchDetails.data;
  return response;
};

exports.create = async (apiReference, opts) => {
  let response = { success: false };
  logging.log(apiReference, { EVENT: "Create Property Service", OPTS: opts });

  if (opts.images) {
    opts.images = JSON.stringify(opts.images);
  }

  let daoResponse = await propertyDao.insertDetails(apiReference, opts);
  logging.log(apiReference, { EVENT: "Create Property", RESPONSE: daoResponse });
  if (!daoResponse.success) {
    return daoResponse;
  }

  response.success  = true;
  response.data     = {
    ...opts,
    property_id : daoResponse.data.insertId
  };
  response.message  = propertyConstants.RESPONSES.CREATE_SUCCESS;
  return response;
};

exports.fetchDetails = async (apiReference, opts) => {
  let response = { success: false };
  logging.log(apiReference, { EVENT: "Fetch Properties Service", OPTS: opts });

  if (opts.property_id) {
    let authPropertyResp = await authProperty(apiReference, opts);
    logging.log(apiReference, { EVENT: "Authorise Open House", RESPONSE: authPropertyResp });
    if (!authPropertyResp.success) {
      return authPropertyResp;
    }
  }

  const daoResponse = await propertyDao.fetchDetails(apiReference, opts);
  logging.log(apiReference, { EVENT: "Fetch Property Details", RESPONSE: daoResponse });

  if (!daoResponse.success) {
    return daoResponse;
  }

  let daoCountResponse = await propertyDao.fetchDetails(apiReference, opts, true);
  logging.log(apiReference, { EVENT: "Fetch Property Count", RESPONSE: daoCountResponse });

  if (!daoCountResponse.success) {
    return daoCountResponse;
  }

  daoCountResponse = daoCountResponse.data[0];

  response.success  = true;
  if (opts.property_id) {
    response.data     = {
      data      : daoResponse.data,
      count     : daoCountResponse.count
    };
  } else {
    response.data = daoResponse.data;
  }
  return response;
};

exports.update = async (apiReference, opts) => {
  let response = { success: false };
  logging.log(apiReference, { EVENT: "Update Property Service", OPTS: opts });

  let validateProperty = await authProperty(apiReference, opts);
  logging.log(apiReference, { EVENT: "Validate Property", validateProperty });

  if (!validateProperty.success) {
    return validateProperty;
  }

  validateProperty = validateProperty.data[0];

  let updateObj = { ...opts }, whereOpts = {
    property_id   : opts.property_id,
    user_id       : opts.user_id
  };

  if (updateObj.images) {
    updateObj.images = JSON.stringify(updateObj.images);
  }

  delete updateObj.property_id;
  delete updateObj.user_id;

  let updateResponse = await propertyDao.updateDetails(apiReference, updateObj, whereOpts);
  logging.log(apiReference, { EVENT: "Update Property Details", RESPONSE: updateResponse });

  if (!updateResponse.success) {
    return updateResponse;
  }

  response.success  = true;
  response.data     = { ...validateProperty, ...opts };
  response.message  = propertyConstants.RESPONSES.UPDATE_SUCCESS;
  return response;
};

exports.remove = async (apiReference, opts) => {
  let response = { success: false };
  logging.log(apiReference, { EVENT: "Remove Property Service", OPTS: opts });

  let validateProperty = await authProperty(apiReference, opts);
  logging.log(apiReference, { EVENT: "Validate Property", validateProperty });

  if (!validateProperty.success) {
    return validateProperty;
  }

  let updateObj = { is_deleted: 1 }, whereOpts = {
    property_id   : opts.property_id,
    user_id       : opts.user_id
  };

  let updateResponse = await propertyDao.updateDetails(apiReference, updateObj, whereOpts);
  logging.log(apiReference, { EVENT: "Update Property Details", RESPONSE: updateResponse });

  if (!updateResponse.success) {
    return updateResponse;
  }

  response.success  = true;
  response.data     = {};
  response.message  = propertyConstants.RESPONSES.REMOVE_SUCCESS;
  return response;
};

exports.authProperty = authProperty;