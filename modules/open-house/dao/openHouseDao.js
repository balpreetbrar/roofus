/**
 * Created by Angad on 25 January 2023
 */

'use strict';

const logging                         = require('../../../logging/logging');
const dbHandler                       = require('../../../database/mysqllib');

exports.insertDetails = async(apiReference, opts) => {
  let response = { success: false };
  logging.log(apiReference, { EVENT: "Insert Details Dao", OPTS: opts });

  let query = "INSERT INTO tb_open_house SET ?";
  let values = [opts];

  let queryResponse = await dbHandler.executeQuery(apiReference, "Insert Open House Details", query, values);
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

  let columns = opts.columns ? opts.columns : "oh.id, oh.property_id, oh.visitor_amount, oh.start_date ";
  let joinString = "";

  if (opts.fetch_property_details) {
    columns += ", prop.name as property_name, prop.address, prop.details, prop.images, prop.rooms, prop.size";
    joinString += " INNER JOIN tb_properties prop ON prop.property_id = oh.property_id ";
  }

  if (getCount) {
    columns = "COUNT (oh.property_id) as count";
  }

  let query = `SELECT ${columns} FROM tb_open_house oh ${joinString} WHERE is_deleted = 0`;
  let values = [];

  if (opts.user_id) {
    query += " AND user_id = ?";
    values.push(opts.user_id);
  }

  if (opts.id) {
    query += " AND id = ?";
    values.push(opts.id);
  }

  if (opts.limit && !getCount) {
    query += ` LIMIT ${opts.limit || 10} OFFSET ${opts.skip || 0}`;
  }

  let queryResponse = await dbHandler.executeQuery(apiReference, "Fetch Open House Details", query, values);
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

  let query = "UPDATE tb_open_house SET ? WHERE id = ?";
  let values = [opts, whereOpts.id];

  if (whereOpts.user_id) {
    query += " AND user_id = ?";
    values.push(whereOpts.user_id);
  }

  let queryResponse =  await dbHandler.executeQuery(apiReference, "Update Open House Details", query, values);
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