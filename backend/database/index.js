/**
 * Created by Angad on 24 January 2023
 */

'use strict';

const mysqlLib                      = require('./mysqllib');
const dbProperties                  = require('./dbProperties');

exports.initialize                  = initialize;

async function initialize(apiReference) {
  global.mysqlCon        = await mysqlLib.initialize(apiReference, dbProperties.mysql.master);
}