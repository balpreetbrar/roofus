/**
 * Created by Angad on 24 January 2023
 */

"use strict";

const mysql                         = require('mysql2');

const logging                       = require('./../logging/logging');
const dateUtility                   = require('./../utility/dateUtility');

const initialize = (apiReference, config) => {
  let numConnectionsInPool = 0;
  logging.log(apiReference, "STARTING MYSQL CONNECTION @ " + dateUtility.getFormattedDate(new Date(), dateUtility.formats.timeWithMilliSeconds));
  let conn = mysql.createPool(config).promise();
  conn.on('connection', function (connection) {
    numConnectionsInPool++;
    console.log('CONNECTION IN POOL : ', numConnectionsInPool);
  });
  conn.on('error', function (error) {
    logging.logError(apiReference, {EVENT : "MYSQL_CONN_ERROR",  ERROR : error});
    return initialize(apiReference, config);
  });
  logging.log(apiReference, "MYSQL CONNECTED @ " + dateUtility.getFormattedDate(new Date(), dateUtility.formats.timeWithMilliSeconds));
  return conn;
};

const executeQuery = async (apiReference, event, queryString, params) => {
  let sqlQuery            = await mysqlCon.format(queryString, params);
  try {
    let [sqlResult, buff] = await mysqlCon.query(queryString, params);
    logging.log(apiReference, { EVENT     : "Executing query " + event, QUERY: sqlQuery,
      SQL_RESULT: sqlResult, SQL_RESULT_LENGTH: sqlResult && sqlResult.length });

    // Returning Result.
    return sqlResult;

  } catch (sqlError) {
    logging.logError(apiReference, {EVENT: " Error in executing while " + event, SQL_ERROR: sqlError, QUERY: sqlQuery});
    if (sqlError.code === 'ER_LOCK_DEADLOCK' || sqlError.code === 'ER_QUERY_INTERRUPTED') {
      setTimeout(executeQuery.bind(null, apiReference, event, queryString, params), 50);
    } else if (sqlError.code == "ER_DUP_ENTRY") {
      if(sqlError.message.includes('barcode_unique')){
        return { success: false, ERROR: "Duplicate entry for barcode." }
      }
      return { success: false, ERROR: "ER_DUP_ENTRY" }
    } else {
      return {success: false, ERROR: sqlError.message, QUERY: queryString, PARAMS: params, EVENT: event};
    }
  }
};



exports.initialize                  = initialize;
exports.executeQuery                = executeQuery;
