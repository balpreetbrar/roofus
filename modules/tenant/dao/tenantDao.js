/**
 * Created by Angad on 25 January 2023
 */

'use strict';

const logging                             = require('../../../logging/logging');
const dbHandler                           = require('../../../database/mysqllib');

exports.insertDetails = async (apiReference, opts) => {
  let response = { success: false };
  logging.log(apiReference, { EVENT: "Insert Tenant Details Dao", OPTS: opts });

  let query = "INSERT INTO tb_tenants SET ?";
  let values = [opts];

  let queryResponse = await dbHandler.executeQuery(apiReference, "Insert Tenant Details", query, values);

  if (queryResponse.ERROR) {
    response.error  = queryResponse.ERROR;
    return response;
  }

  response.success  = true;
  response.data     = queryResponse;
  return response;
};

exports.fetchDetails = async (apiReference, opts, getCount = false) => {
  let response = { success: false };
  logging.log(apiReference, { EVENT: "Fetch Tenant Details Dao", OPTS: opts });

  let columns = opts.columns ? opts.columns : "tenant_id, name";

  if (getCount) {
    columns = "COUNT(tenant_id) as count";
  }

  let query = `SELECT ${columns} FROM tb_tenants WHERE is_deleted = 0`;
  let values = [];

  if (opts.user_id) {
    query += " AND user_id = ?";
    values.push(opts.user_id);
  }

  if (opts.tenant_id) {
    query += " AND tenant_id = ?";
    values.push(opts.tenant_id);
  }

  if (opts.limit && !getCount) {
    query += ` LIMIT ${opts.limit || 10} OFFSET ${opts.skip || 0}`;
  }

  let queryResponse = await dbHandler.executeQuery(apiReference, "Fetch Tenant Details", query, values);

  if (queryResponse.ERROR) {
    response.error  = queryResponse.ERROR;
    return response;
  }

  response.success  = true;
  response.data     = queryResponse;
  return response;
};

exports.updateDetails = async (apiReference, opts, whereOpts) => {
  let response = { success: false };
  logging.log(apiReference, { EVENT: "Insert Tenant Details Dao", OPTS: opts, WHERE_OPTS: whereOpts });

  let query = "UPDATE tb_tenants SET ? WHERE tenant_id = ?";
  let values = [opts, whereOpts.tenant_id];

  if (whereOpts.user_id) {
    query += " AND user_id = ?";
    values.push(whereOpts.user_id);
  }

  let queryResponse = await dbHandler.executeQuery(apiReference, "Update Tenant Details", query, values);

  if (queryResponse.ERROR) {
    response.error  = queryResponse.ERROR;
    return response;
  }

  if (!queryResponse.affectedRows) {
    response.error  = "Criteria Not Matched!";
    return response;
  }

  response.success  = true;
  response.data     = queryResponse;
  return response;
};