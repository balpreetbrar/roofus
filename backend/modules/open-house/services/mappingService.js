/**
 * Created by Angad on 25 January 2023
 */

'use strict';

const mappingDao                      = require('../dao/mappingDao');
const logging                         = require('../../../logging/logging');

exports.insertTenantMapping = async (apiReference, opts) => {
  let response = { success: false };
  logging.log(apiReference, { EVENT: "Insert Tenant Mapping Service", OPTS: opts });

  let columns = "user_id, open_house_id, tenant_id";
  let values = [];

  opts.tenant_id.forEach(tenant => {
    values.push([
      opts.user_id,
      opts.open_house_id,
      tenant
    ]);
  });

  let daoResponse = await mappingDao.insertTenantMapping(apiReference, {
    columns,
    values
  });
  logging.log(apiReference, { EVENT: "Insert Tenant Open House Mapping", RESPONSE: daoResponse });
  if (!daoResponse.success) {
    return daoResponse;
  }

  response.success  = true;
  return response;
};

exports.removeTenantMapping = async (apiReference, opts) => {
  let response = { success: false };
  logging.log(apiReference, { EVENT: "Remove Tenant Mapping Service", OPTS: opts });

  let daoResponse = await mappingDao.removeTenantMapping(apiReference, opts);
  logging.log(apiReference, { EVENT: "Remove Tenant Mapping", RESPONSE: daoResponse });

  if (!daoResponse.success) {
    return daoResponse;
  }

  response.success  = true;
  return response;
};