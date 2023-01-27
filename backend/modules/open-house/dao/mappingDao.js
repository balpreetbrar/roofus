/**
 * Created by Angad on 25 January 2023
 */

'use strict';

const logging                         = require('../../../logging/logging');
const dbHandler                       = require('../../../database/mysqllib');

exports.insertTenantMapping = async (apiReference, opts) => {
  let response = { success: false };
  logging.log(apiReference, { EVENT: "Insert Tenant Mapping Dao", OPTS: opts });

  let query = `INSERT INTO tb_tenant_open_house_mapping (${opts.columns}) VALUES ?`;
  let values = [opts.values];

  let queryResponse = await dbHandler.executeQuery(apiReference, "Insert Tenant Mapping", query, values);

  if (queryResponse.ERROR) {
    response.error  = queryResponse.ERROR;
    return response;
  }

  response.success  = true;
  response.data     = queryResponse;
  return response;
};

exports.removeTenantMapping = async (apiReference, opts) => {
  let response = { success: false };
  logging.log(apiReference, { EVENT: "Remove Tenant Mapping Dao", OPTS: opts });

  let query = "DELETE FROM tb_tenant_open_house_mapping WHERE open_house_id = ? AND user_id = ?";
  let values = [opts.open_house_id, opts.user_id];

  let queryResponse = await dbHandler.executeQuery(apiReference, "Remove Tenant Mapping", query, values);

  if (queryResponse.ERROR) {
    response.error  = queryResponse.ERROR;
    return response;
  }

  response.success  = true;
  response.data     = queryResponse;
  return response;
};