/**
 * Created by Angad on 25 January 2023
 */

'use strict';

const logging                         = require('../../../logging/logging');
const dbHandler                       = require('../../../database/mysqllib');

exports.insertDetails = async(apiReference, opts) => {
  let response = { success: false };
  logging.log(apiReference, { EVENT: "Insert Details Dao", OPTS: opts });

  let query = "INSERT INTO tb_properties SET ?";
  let values = [opts];

  let queryResponse = await dbHandler.executeQuery(apiReference, "Insert Property Details", query, values);
  if (queryResponse.ERROR) {
    response.error  = queryResponse.ERROR;
    return response;
  }

  response.success  = true;
  response.data     = queryResponse;
  return response;
};

exports.fetchDetails = async(apiReference, opts, getCount = false) => {
  let response = { success: false };
  logging.log(apiReference, { EVENT: "Fetch Details Dao", OPTS: opts });

  let columns = opts.columns ? opts.columns : "property_id, user_id, name, address";

  if (getCount) {
    columns = "COUNT (property_id) as count";
  }

  let query = `SELECT ${columns} FROM tb_properties WHERE is_deleted = 0`;
  let values = [];

  if (opts.user_id) {
    query += " AND user_id = ?";
    values.push(opts.user_id);
  }

  if (opts.property_id) {
    query += " AND property_id = ?";
    values.push(opts.property_id);
  }

  if (opts.limit && !getCount) {
    query += ` LIMIT ${opts.limit || 10} OFFSET ${opts.skip || 0}`;
  }

  let queryResponse = await dbHandler.executeQuery(apiReference, "Fetch Property Details", query, values);
  if (queryResponse.ERROR) {
    response.error  = queryResponse.ERROR;
    return response;
  }

  response.success  = true;
  response.data     = queryResponse;
  return response;
};

exports.updateDetails = async(apiReference, opts, whereOpts) => {
  let response = { success: false };
  logging.log(apiReference, { EVENT: "Update Details Dao", OPTS: opts });

  let query = "UPDATE tb_properties SET ? WHERE property_id = ?";
  let values = [opts, whereOpts.property_id];

  if (whereOpts.user_id) {
    query += " AND user_id = ?";
    values.push(whereOpts.user_id);
  }

  let queryResponse =  await dbHandler.executeQuery(apiReference, "Update Property Details", query, values);
  if (queryResponse.ERROR) {
    response.error  = queryResponse.ERROR;
    return response;
  }

  if (!queryResponse.affectedRows) {
    response.error = "Criteria Not Matched!";
    return response;
  }

  response.success  = true;
  response.data     = queryResponse;
  return response;
};