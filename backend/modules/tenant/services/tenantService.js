/**
 * Created by Angad on 25 January 2023
 */

'use strict';

const tenantConstants                   = require('../properties/tenantConstants');
const tenantDao                         = require('../dao/tenantDao');

const logging                           = require('../../../logging/logging');

const authTenant = async (apiReference, opts) => {
  let response = { success: false };
  logging.log(apiReference, { EVENT: "Authorise Tenant", OPTS: opts });

  let fetchResp = await tenantDao.fetchDetails(apiReference, opts);
  logging.log(apiReference, { EVENT: "Fetch Tenant Details", RESPONSE: fetchResp });

  if (!fetchResp.success) {
    return fetchResp;
  }

  if (_.isEmpty(fetchResp.data)) {
    response.error  = tenantConstants.RESPONSES.INVALID_TENANT_ID;
    return response;
  }

  if (_.isArray(opts.tenant_id) && opts.tenant_id.length !== fetchResp.data.length) {
    response.error  = tenantConstants.RESPONSES.INVALID_TENANT_ID;
    return response;
  }

  response.success  = true;
  response.data     = fetchResp.data;
  return response;
};

exports.insertDetails = async (apiReference, opts) => {
  let response = { success: false };
  logging.log(apiReference, { EVENT: "Insert Tenant Details Service", OPTS: opts });

  let createTenantResp = await tenantDao.insertDetails(apiReference, opts);
  logging.log(apiReference, { EVENT: "Create Tenant", RESPONSE: createTenantResp });

  if (!createTenantResp.success) {
    return createTenantResp;
  }

  response.success  = true;
  response.data     = { ...opts, tenant_id: createTenantResp.data.insertId };
  response.message  = tenantConstants.RESPONSES.CREATE_SUCCESS;
  return response;
};

exports.fetchDetails = async (apiReference, opts) => {
  let response = { success: false };
  logging.log(apiReference, { EVENT: "Insert Tenant Details Service", OPTS: opts });

  if (opts.tenant_id) {
    let authTenantResp = await authTenant(apiReference, opts);
    logging.log(apiReference, { EVENT: "Authorise Open House", RESPONSE: authTenantResp })
    if (!authTenantResp.success) {
      return authTenantResp;
    }
  }

  let fetchDetails = await tenantDao.fetchDetails(apiReference, opts);
  logging.log(apiReference, { EVENT: "Fetch Tenant Details", RESPONSE: fetchDetails });

  if (!fetchDetails.success) {
    return fetchDetails;
  }

  let fetchCount = await tenantDao.fetchDetails(apiReference, opts, true);
  logging.log(apiReference, { EVENT: "Fetch Tenant Count", fetchCount });

  if (!fetchCount.success) {
    return fetchCount;
  }

  response.success  = true;
  if (opts.property_id) {
    response.data     = {
      data      : fetchDetails.data,
      count     : fetchDetails.count
    };
  } else {
    response.data = fetchDetails.data;
  }
  return response;
};

exports.updateDetails = async (apiReference, opts) => {
  let response = { success: false };
  logging.log(apiReference, { EVENT: "Insert Tenant Details Service", OPTS: opts });

  let authoriseTenant = await authTenant(apiReference, opts);
  logging.log(apiReference, { EVENT: "Authorise Tenant", RESPONSE: authoriseTenant });

  if (!authoriseTenant.success) {
    return authoriseTenant;
  }

  authoriseTenant = authoriseTenant.data[0];

  let updateObj = { ...opts }, whereOpts = {
    tenant_id   : opts.tenant_id,
    user_id     : opts.user_id
  };

  delete updateObj.tenant_id;
  delete updateObj.user_id;

  let removeResponse = await tenantDao.updateDetails(apiReference, updateObj, whereOpts);
  logging.log(apiReference, { EVENT: "Remove Tenant", RESPONSE: removeResponse });

  if (!removeResponse.success) {
    return removeResponse;
  }

  response.success  = true;
  response.data     = { ...authoriseTenant, ...opts };
  response.message  = tenantConstants.RESPONSES.UPDATE_SUCCESS;
  return response;
};

exports.removeDetails = async (apiReference, opts) => {
  let response = { success: false };
  logging.log(apiReference, { EVENT: "Insert Tenant Details Service", OPTS: opts });

  let authoriseTenant = await authTenant(apiReference, opts);
  logging.log(apiReference, { EVENT: "Authorise Tenant", RESPONSE: authoriseTenant });

  if (!authoriseTenant.success) {
    return authoriseTenant;
  }

  let updateObj = { is_deleted: 1 }, whereOpts = {
    tenant_id   : opts.tenant_id,
    user_id     : opts.user_id
  };

  let removeResponse = await tenantDao.updateDetails(apiReference, updateObj, whereOpts);
  logging.log(apiReference, { EVENT: "Remove Tenant", RESPONSE: removeResponse });

  if (!removeResponse.success) {
    return removeResponse;
  }

  response.success  = true;
  response.message  = tenantConstants.RESPONSES.REMOVE_SUCCESS;
  return response;
};

exports.authTenant  = authTenant;