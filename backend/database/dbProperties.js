/**
 * Created by Angad on 24 January 2023
 */

'use strict';

const config                                      = require('config');

exports.mysql  = {
  master: {
    host              : process.env.MYSQL_HOST_DB  || config.get('databaseSettings.mysql.master.host'),
    user              : process.env.MYSQL_USER_DB  || config.get('databaseSettings.mysql.master.user'),
    password          : process.env.MYSQL_PASS_DB  || config.get('databaseSettings.mysql.master.password'),
    database          : process.env.MYSQL_DATABASE || config.get('databaseSettings.mysql.master.database'),
    multipleStatements: true
  },
  slave : {
    host              : process.env.MYSQL_HOST_DB  || config.get('databaseSettings.mysql.slave.host'),
    user              : process.env.MYSQL_USER_DB  || config.get('databaseSettings.mysql.slave.user'),
    password          : process.env.MYSQL_PASS_DB  || config.get('databaseSettings.mysql.slave.password'),
    database          : process.env.MYSQL_DATABASE || config.get('databaseSettings.mysql.slave.database'),
    multipleStatements: true
  }
};

