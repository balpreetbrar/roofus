/**
 * Created by Angad on 25 January 2023
 */

'use strict';

const logging                         = require('../../../logging/logging');
const openHouseDao                    = require('../dao/openHouseDao');
const openHouseConstants              = require('../properties/openHouseConstants');
const tenantService                   = require('../../tenant/services/tenantService');
const mappingService                  = require('../services/mappingService');

const authOpenHouse = async (apiReference, opts) => {
  let response = { success: false };
  logging.log(apiReference, { EVENT: "Authorise Open House", OPTS: opts });

  let fetchDetails = await openHouseDao.fetchDetails(apiReference, opts);
  logging.log(apiReference, { EVENT: "Fetch Open House Details", RESPONSE: fetchDetails });

  if (!fetchDetails.success) {
    return fetchDetails;
  }

  if (_.isEmpty(fetchDetails.data)) {
    response.error  = openHouseConstants.RESPONSES.INVALID_OPEN_HOUSE_ID;
    return response;
  }

  response.success  = true;
  response.data     = fetchDetails.data;
  return response;
};

exports.insertDetails = async (apiReference, opts) => {
  let response = { success: false };
  logging.log(apiReference, { EVENT: "Create Open House Service", OPTS: opts });

  let daoResponse = await openHouseDao.insertDetails(apiReference, opts);
  logging.log(apiReference, { EVENT: "Create Open House", RESPONSE: daoResponse });
  if (!daoResponse.success) {
    return daoResponse;
  }

  response.success  = true;
  response.data     = {
    ...opts,
    id : daoResponse.data.insertId
  };
  response.message  = openHouseConstants.RESPONSES.CREATE_SUCCESS;
  return response;
};

exports.fetchDetails = async (apiReference, opts) => {
  let response = { success: false };
  logging.log(apiReference, { EVENT: "Fetch Open House Service", OPTS: opts });

  if (opts.id) {
    let authOpenHouseResp = await authOpenHouse(apiReference, opts);
    logging.log(apiReference, { EVENT: "Authorise Open House", RESPONSE: authOpenHouseResp })
    if (!authOpenHouseResp.success) {
      return authOpenHouseResp;
    }
  }

  const daoResponse = await openHouseDao.fetchDetails(apiReference, opts);
  logging.log(apiReference, { EVENT: "Fetch Open House Details", RESPONSE: daoResponse });

  if (!daoResponse.success) {
    return daoResponse;
  }

  let daoCountResponse = await openHouseDao.fetchDetails(apiReference, opts, true);
  logging.log(apiReference, { EVENT: "Fetch Open House Count", RESPONSE: daoCountResponse });

  if (!daoCountResponse.success) {
    return daoCountResponse;
  }

  daoCountResponse = daoCountResponse.data[0];

  response.success  = true;
  if (opts.id) {
    response.data     = {
      data      : daoResponse.data,
      count     : daoCountResponse.count
    };
  } else {
    response.data = daoResponse.data;
  }
  return response;
};

exports.updateDetails = async (apiReference, opts) => {
  let response = { success: false };
  logging.log(apiReference, { EVENT: "Update Open House Service", OPTS: opts });

  let validateOpenHouse = await authOpenHouse(apiReference, opts);
  logging.log(apiReference, { EVENT: "Validate Open House", validateOpenHouse });

  if (!validateOpenHouse.success) {
    return validateOpenHouse;
  }

  validateOpenHouse = validateOpenHouse.data[0];

  let updateObj = { ...opts }, whereOpts = {
    id            : opts.id,
    user_id       : opts.user_id
  };

  delete updateObj.property_id;
  delete updateObj.user_id;

  let updateResponse = await openHouseDao.updateDetails(apiReference, updateObj, whereOpts);
  logging.log(apiReference, { EVENT: "Update Open House Details", RESPONSE: updateResponse });

  if (!updateResponse.success) {
    return updateResponse;
  }

  response.success  = true;
  response.data     = { ...validateOpenHouse, ...opts };
  response.message  = openHouseConstants.RESPONSES.UPDATE_SUCCESS;
  return response;
};

exports.removeDetails = async (apiReference, opts) => {
  let response = { success: false };
  logging.log(apiReference, { EVENT: "Remove Open House Service", OPTS: opts });

  let validateOpenHouse = await authOpenHouse(apiReference, opts);
  logging.log(apiReference, { EVENT: "Validate Open House", validateOpenHouse });

  if (!validateOpenHouse.success) {
    return validateOpenHouse;
  }

  let updateObj = { is_deleted: 1 }, whereOpts = {
    id        : opts.id,
    user_id   : opts.user_id
  };

  let updateResponse = await openHouseDao.updateDetails(apiReference, updateObj, whereOpts);
  logging.log(apiReference, { EVENT: "Update Open House Details", RESPONSE: updateResponse });

  if (!updateResponse.success) {
    return updateResponse;
  }

  response.success  = true;
  response.data     = {};
  response.message  = openHouseConstants.RESPONSES.REMOVE_SUCCESS;
  return response;
};

exports.enroll = async (apiReference, opts) => {
  let response = { success: false };
  logging.log(apiReference, { EVENT: "Enroll Tenant to Open House Service", OPTS: opts });

  let authoriseOpenHouse = await authOpenHouse(apiReference, {
    id      : opts.open_house_id,
    user_id : opts.user_id
  });
  logging.log(apiReference, { EVENT: "Authorise Open House", RESPONSE: authoriseOpenHouse });

  if (!authoriseOpenHouse.success) {
    return authoriseOpenHouse;
  }

  let validateTenants = await tenantService.authTenant(apiReference, {
    tenant_id   : opts.tenant_id,
    user_id     : opts.user_id
  });
  logging.log(apiReference, { EVENT: "Validate Tenants", RESPONSE: validateTenants });
  if (!validateTenants.success) {
    return validateTenants;
  }

  let removeHouseTenantMappingResp = await mappingService.removeTenantMapping(apiReference, {
    user_id       : opts.user_id,
    open_house_id : opts.open_house_id
  });
  logging.log(apiReference, { EVENT: "Remove House Tenant Mapping", removeHouseTenantMappingResp });

  if (!removeHouseTenantMappingResp.success) {
    return removeHouseTenantMappingResp;
  }

  let createMappingsResp = await mappingService.insertTenantMapping(apiReference, opts);
  logging.log(apiReference, { EVENT: "Create Mapping", RESPONSE: createMappingsResp });
  if (!createMappingsResp.success) {
    return createMappingsResp;
  }

  response.success  = true;
  return response;
};

exports.authOpenHouse = authOpenHouse;