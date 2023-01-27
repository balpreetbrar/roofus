/**
 * Created by Angad on 24 January 2023
 */

'use strict';

const logging                                 = require('../../../logging/logging');
const dbHandler                               = require('../../../database/mysqllib');
const {pairs} = require("underscore");

exports.insertDetails = async (apiReference, opts) => {
  let response = { success: false };
  logging.log(apiReference, { EVENT: "Register New User Dao", OPTS: opts });

  let query = "INSERT INTO tb_users SET ?";
  let values = [opts];

  let queryResponse = await dbHandler.executeQuery(apiReference, "Create New User", query, values);

  if (queryResponse.ERROR) {
    response.error  = queryResponse.ERROR;
    return response;
  }

  response.success  = true;
  response.data     = queryResponse;
  return response;
};

exports.fetchDetails = async (apiReference, opts) => {
  let response = { success: false };
  logging.log(apiReference, { EVENT: "Fetch Details For User Dao", OPTS: opts });

  let query = "SELECT user_id, user_image, email, country_code, phone_number, name, password" +
    " FROM tb_users WHERE is_deleted = 0";
  let values = [];

  if (opts.email) {
    query += ' AND email = ?';
    values.push(opts.email);
  }
  if (opts.phone_number) {
    query += ' AND phone_number = ?';
    values.push(opts.phone_number);
  }
  if (opts.country_code) {
    query += " AND country_code = ?";
    values.push(opts.country_code);
  }

  let queryResponse = await dbHandler.executeQuery(apiReference, "Fetch User Details", query, values);

  if (queryResponse.ERROR) {
    response.error  = queryResponse.ERROR;
    return response;
  }

  response.success  = true;
  response.data     = queryResponse;
  return response;
};